import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { subjectState } from "../atoms/subjectState";
import { filtersState } from "../atoms/filtersState";

//defining columns outside of the component is fine, is stable

const Example = ({ attendanceMark, callApi }) => {
  const [subject, setSubject] = useRecoilState(subjectState);
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);
  const getStudents = async () => {
    if (callApi === "getAllStudents") {
      const res = await axios.get(`http://localhost:9000/${callApi}`);
      setData(getStudentArray(res.data));
      setColumns([
        {
          accessorKey: "sapid",
          header: "sapid",
          size: 120,
        },
        {
          accessorKey: "name",
          header: "Name",
          size: 200,
        },
      ]);
    } else {
      const classData = {
        year: 2024,
        division: "B",
      };

      axios
        .post("http://localhost:9000/getClassAttendance", classData)
        .then((response) => {
          const content = response.data;
          console.log(content);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // console.log(res.data);
  };
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location?.state?.lectureId !== null) {
      setLectureId(location?.state?.lectureId);
    } else {
      setLectureId("1");
    }
  }, []);

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

  useEffect(() => {
    getStudents();
  }, []);

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

  return (
    <>
      {data.length > 0 && columns.length > 0 && (
        <MaterialReactTable
          columns={columns}
          data={data} //fallback to state={{ isLoading: true }}
          enableRowSelection={attendanceMark}
          positionToolbarAlertBanner="bottom"
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {!attendanceMark ? (
                <Button
                  color="primary"
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >
                  Download CSV
                </Button>
              ) : (
                <>
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
                    variant="contained"
                  >
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
                    variant="contained"
                  >
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
