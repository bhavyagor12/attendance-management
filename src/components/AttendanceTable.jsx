import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getLectureAttendance,
  getStudentsbySubject,
  markLectureAttendance,
} from "../utils/services";
import { classInfoState } from "../atoms/classInfoState";
import { getStudentArray } from "../utils/helpers";

const AttendanceTable = ({ subjectCode }) => {
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const classInfo = useRecoilValue(classInfoState);
  let location = useLocation();
  const navigate = useNavigate();

  const fetchData = async (lectureId) => {
    const content = await getStudentsbySubject(classInfo, subjectCode);
    let newColumns = [
      { accessorKey: "sapid", header: "sapid", size: 120 },
      { accessorKey: "name", header: "Name", size: 200 },
    ];
    setColumns(newColumns);
    let newData = [];
    newData = getStudentArray(content);
    setData(newData);
    await fetchAttendance(lectureId);
  };

  const fetchAttendance = async (lectureId) => {
    try {
      const attendanceContent = await getLectureAttendance(lectureId);
      const jsonobj = {};
      attendanceContent.forEach((student) => {
        jsonobj[student] = true;
      });
      setRowSelection(jsonobj);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location?.state?.lectureId !== null) {
      setLectureId(location?.state?.lectureId);
    } else {
      setLectureId("1");
    }
    fetchData(location?.state?.lectureId);
  }, [location]);

  const markAttendance = async (rows) => {
    let sapIDs = [];
    rows.map((row) => {
      sapIDs.push(row.original.sapid);
    });
    const res = await markLectureAttendance(lectureId, sapIDs, subjectCode);
    if (res.status === 200) {
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
              }}>
              {table.setRowSelection}
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                onClick={() => markAttendance(table.getSelectedRowModel().rows)}
                startIcon={<FileUploadIcon />}
                variant="contained">
                Mark Attendance
              </Button>
            </Box>
          )}
        />
      )}
    </>
  );
};

export default AttendanceTable;
