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
import { getStudentsbyClassInfo } from "../utils/services";
import { classInfoState } from "../atoms/classInfoState";
const AttendanceTable = () => {
  const [subject, setSubject] = useRecoilState(subjectState); //TODO : Fix
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);
  const [rowSelection, setRowSelection] = useState({});
  const classInfo = useRecoilValue(classInfoState);
  const fetchData = async (lectureId) => {
    const content = await getStudentsbyClassInfo(classInfo);
    let newData = [];
    let newColumns = [
      { accessorKey: "sapid", header: "sapid", size: 120 },
      { accessorKey: "name", header: "Name", size: 200 },
    ];
    newData = getStudentArray(content);

    setData(newData);
    setColumns(newColumns);
    await fetchAttendance(lectureId);
  };

  const fetchAttendance = async (lectureId) => {
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
  const markAttendance = async (rows) => {
    let sapIDs = [];
    rows.map((row) => {
      sapIDs.push(row.original.sapid);
    });
    const res = await axios.put("http://localhost:9000/markAttendance", {
      lecture_id: lectureId || "",
      subject_id: subject,
      attendance: sapIDs,
    });
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
      {data !== null && (
        <MaterialReactTable
          columns={columns}
          data={data} //fallback to state={{ isLoading: true }}
          enableRowSelection={true}
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
              }}
            >
              {table.setRowSelection}
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
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
            </Box>
          )}
        />
      )}
    </>
  );
};

export default AttendanceTable;
