import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import axios from "axios";
import { useRecoilState } from "recoil";
import { json, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { subjectState } from "../atoms/subjectState";
import { filtersState } from "../atoms/filtersState";

const ReportTable = () => {
  const [subject, setSubject] = useRecoilState(subjectState);
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);
  const [rowSelection, setRowSelection] = useState({});
  const [defaulter, setDefaulter] = useState([]);
  // console.log(
  //   filters.year,
  //   filters.division,
  //   filters.startDate,
  //   filters.endDate
  // );
  const fetchData = async (lectureId) => {
    try {
      let fetchMethod = "POST";
      let apiUrl = "http://localhost:9000/getClassAttendance";

      const response = await axios({
        method: fetchMethod,
        url: apiUrl,
        data: JSON.stringify({
          year: filters.year,
          division: filters.division,
          start_date: filters.startDate,
          end_date: filters.endDate,
        }),
      });
      const content = response.data;
      // console.log(content)
      let newData = [];
      let newColumns = [
        { accessorKey: "sapid", header: "sapid", size: 120 },
        { accessorKey: "name", header: "Name", size: 200 },
      ];

      content.subjects.forEach((subject) => {
        newColumns.push({
          accessorKey: subject,
          header: subject,
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

      newData = getDefaulterArray(content,newColumns);
      setData(newData);
      setColumns(newColumns);
      console.log(newData);
      console.log(newColumns)
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
  }, [location, filters]);

  const getDefaulterArray = (data,newColumns) => {
    let initialStudents = [];

    initialStudents = data?.students.map((student) => {
      const jsonObject = {};
      // console.log(student)
      const valuesToUpdate = [];
      valuesToUpdate.push(student.student_id);
      valuesToUpdate.push(student.student_name);
      student.subject_attendance.forEach((subject) => {
        valuesToUpdate.push(subject.attendance);
      });
      valuesToUpdate.push(student.grand_attendance);
      valuesToUpdate.push(student.defaulter);
      newColumns.forEach((key, index) => {
        // console.log(key,index)
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
  // console.log(data);
  return (
    <>
      {data !== null && (
        <MaterialReactTable
          columns={columns}
          data={data} //fallback to state={{ isLoading: true }}
          enableRowSelection={false}
          positionToolbarAlertBanner="bottom"
          muiTableBodyCellProps={{sx:{
            color: "red",
          }}}
          getRowId={(originalRow) => originalRow.sapid}
          onRowSelectionChange={setRowSelection}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Download CSV
              </Button>
            </Box>
          )}
        />
      )}
    </>
  );
};

export default ReportTable;
