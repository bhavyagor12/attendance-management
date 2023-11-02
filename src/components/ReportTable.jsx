import React, { useEffect, useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import ReactLoading from "react-loading";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation } from "react-router-dom";
import { infoState } from "../atoms/infoState";
import { filtersState } from "../atoms/filtersState";
import { getTwoDecimals } from "../utils/helpers";
import { getClassAttendance } from "../utils/services";
import Filters from "./Filters";

const ReportTable = () => {
  const userinfo = useRecoilValue(infoState);
  const [data, setData] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [lectureId, setLectureId] = useState("");
  const [filters, setFilters] = useRecoilState(filtersState);
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(true);

  let location = useLocation();

  const fetchData = async () => {
    try {
      const response = await getClassAttendance({
        year: filters.year,
        division: filters.division,
        start_date: filters.startDate,
        end_date: filters.endDate,
        teacher_id: userinfo.ID,
      });
      const content = response.data;

      let newData = [];
      let newColumns = [
        { accessorKey: "sapid", header: "Sapid", size: 120 },
        { accessorKey: "name", header: "Name", size: 200 },
      ];

      content.subjects.forEach((subject) => {
        newColumns.push({
          accessorKey: subject + " theory",
          header: subject + " (T)",
          size: 120,
        });
        newColumns.push({
          accessorKey: subject + " practical",
          header: subject + " (P)",
          size: 120,
        });
      });

      newColumns.push(
        {
          accessorKey: "grand_attendance",
          header: "Grand Attendance",
          size: 120,
        },
        { accessorKey: "status", header: "Status", size: 120 }
      );

      newData = getDefaulterArray(content, newColumns);
      setData(newData);
      setColumns(newColumns);
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
  }, [location, filters]);

  const getDefaulterArray = (data, newColumns) => {
    let initialStudents = [];

    initialStudents = data?.students.map((student) => {
      const jsonObject = {};
      const valuesToUpdate = [];
      valuesToUpdate.push(student.student_id);
      valuesToUpdate.push(student.student_name);

      student.subject_attendance.forEach((subject) => {
        const theoryAttendance = getTwoDecimals(subject.attendance_theory);
        const practicalAttendance = getTwoDecimals(
          subject.attendance_practical
        );
        valuesToUpdate.push(`${theoryAttendance}%`);
        valuesToUpdate.push(`${practicalAttendance}%`);
      });
      const grandAttendance = getTwoDecimals(student.grand_attendance);
      valuesToUpdate.push(`${grandAttendance}%`);
      valuesToUpdate.push(student.defaulter);
      newColumns.forEach((key, index) => {
        jsonObject[key.accessorKey] = valuesToUpdate[index];
      });

      return jsonObject;
    });
    setLoading(false);

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

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };
  return (
    <>
      {!loading && data !== null ? (
        <>
          <Filters loading={loading} />
          <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection={false}
            positionToolbarAlertBanner="bottom"
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
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                >
                  Download CSV
                </Button>
              </Box>
            )}
          />
        </>
      ) : (
        <div
          className="flex items-center justify-center h-full
        "
        >
          <ReactLoading
            type={"spinningBubbles"}
            color={"#000000"}
            height={"20%"}
            width={"20%"}
          />
        </div>
      )}
    </>
  );
};

export default ReportTable;
