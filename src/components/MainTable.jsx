import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { json, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { subjectState } from "../atoms/subjectState";
import { filtersState } from "../atoms/filtersState";

//defining columns outside of the component is fine, is stable

const Example = ({ attendanceMark, callApi }) => {
  const [subject, setSubject] = useRecoilState(subjectState);
  const [data, setData] = React.useState(null);
  const [values, setValues] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);
  const [rowSelection, setRowSelection] = useState({});
  console.log(filters.year, filters.division, filters.startDate, filters.endDate);
  const fetchData = async (lectureId) => {
    try {
      let apiUrl = "";
      let fetchMethod = "GET";

      if (callApi === "getAllStudents") {
        apiUrl = `http://localhost:9000/${callApi}`;
      } else {
        apiUrl = "http://localhost:9000/getClassAttendance";
        fetchMethod = "POST";
      }

      const response = await axios({
        method: fetchMethod,
        url: apiUrl,
        data:
          callApi === "getAllStudents" ? null : { year: filters.year, division: filters.division, start_date: filters.startDate, end_date: filters.endDate},
      });

      const content = response.data;

      let newData = [];
      let newColumns = [
        { accessorKey: "sapid", header: "sapid", size: 120 },
        { accessorKey: "name", header: "Name", size: 200 },
      ];

      if (callApi !== "getAllStudents") {
        content.AttendanceList[0].SubjectAttendance.forEach((subject) => {
          newColumns.push({
            accessorKey: subject.SubjectName,
            header: subject.SubjectName,
            size: 120,
          });
        });

        newColumns.push(
          {
            accessorKey: "grand_attendance",
            header: "grand_attendance",
            size: 120,
          },
          { accessorKey: "status", header: "status", size: 120 }
        );

        newData = getDefaulterArray(content);
      } else {
        newData = getStudentArray(content);
      }

      setData(newData);
      setColumns(newColumns);

      await fetchAttendance(lectureId, content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAttendance = async (lectureId, content) => {
    try {
      const rawResponse = await fetch(
        `http://localhost:9000/getLectureAttendance/${lectureId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const attendanceContent = await rawResponse.json();

      const jsonobj = {};
      attendanceContent.forEach((student) => {
        jsonobj[student] = true;
      });

      setRowSelection(jsonobj);
    } catch (error) {
      console.log(error);
    }
  };
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state?.lectureId !== null) {
      setLectureId(location?.state?.lectureId);
    } else {
      setLectureId("1");
    }
    fetchData(location?.state?.lectureId);
  }, [location]);

  useEffect(() => {
    console.log(rowSelection);
  }, [rowSelection]);
  // console.log(location.state.subjectId);

  const getStudentArray = (data) => {
    let initialStudents = [];
    initialStudents = data?.map((student) => {
      return {
        sapid: student.sap_id,
        name: student.name,
      };
    });
    return initialStudents;
  };

  const getDefaulterArray = (data) => {
    let initialStudents = [];

    initialStudents = data?.AttendanceList.map((student) => {
      const jsonObject = {};

      const valuesToUpdate = [];
      valuesToUpdate.push(student.student_id);
      valuesToUpdate.push(student.student_name);

      student.SubjectAttendance.forEach((subject) => {
        valuesToUpdate.push(subject.Attendance);
      });

      valuesToUpdate.push(student.GrandAttendance);
      valuesToUpdate.push(student.Status);

      columns.forEach((key, index) => {
        jsonObject[key.accessorKey] = valuesToUpdate[index];
      });

      return jsonObject;
    });

    return initialStudents;
  };
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };
  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  const markAttendance = async (rows) => {
    let sapIDs = [];
    rows.map((row) => {
      sapIDs.push(row.original.sapid);
    });
    console.log(subject);
    const res = await axios.put("http://localhost:9000/markAttendance", {
      lecture_id: lectureId || "",
      subject_id: subject,
      attendance: sapIDs,
    });
    console.log(res);
    if (res) {
      Swal.fire({
        title: "Success!",
        text: "Marked Attendance",
        icon: "success",
        confirmButtonText: "Done",
      });
      navigate("/home");
    } else {
      Swal.fire({
        title: "Failure!",
        text: "Some error",
        icon: "error",
        confirmButtonText: "retry",
      });
    }
  };
  console.log(data);

  return (
    <>
      {data !== null && (
        <MaterialReactTable
          columns={columns}
          data={data} //fallback to state={{ isLoading: true }}
          enableRowSelection={attendanceMark}
          positionToolbarAlertBanner="bottom"
          getRowId={(originalRow) => originalRow.sapid}
          onRowSelectionChange={setRowSelection}
          state={{ rowSelection }}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}>
              {!attendanceMark ? (
                <Button
                  color="primary"
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained">
                  Download CSV
                </Button>
              ) : (
                <>
                  {table.setRowSelection}
                  <Button
                    disabled={
                      table.getPrePaginationRowModel().rows.length === 0
                    }
                    //export all rows, including from the next page, (still respects filtering and sorting)
                    onClick={() => {
                      markAttendance(table.getPrePaginationRowModel().rows);
                      // handleExportRows(table.getPrePaginationRowModel().rows);
                    }}
                    startIcon={<FileUploadIcon />}
                    variant="contained">
                    Mark All Present
                  </Button>
                  <Button
                    disabled={
                      !table.getIsSomeRowsSelected() &&
                      !table.getIsAllRowsSelected()
                    }
                    //only export selected rows
                    onClick={
                      () => markAttendance(table.getSelectedRowModel().rows)
                      // handleExportRows(table.getSelectedRowModel().rows)
                    }
                    startIcon={<FileDownloadIcon />}
                    variant="contained">
                    Mark Selected Rows
                  </Button>
                </>
              )}
            </Box>
          )}
        />
      )}
    </>
  );
};

export default Example;
