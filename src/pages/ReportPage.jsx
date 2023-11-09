import React, { useState } from "react";
import Nav from "../components/Navbar";
import Filters from "../components/Filters";
import { useRecoilState, useRecoilValue } from "recoil";
import { filtersState } from "../atoms/filtersState";
import ReportTable from "../components/ReportTable";
import { getTwoDecimals } from "../utils/helpers";
import { getClassAttendance } from "../utils/services";
import { infoState } from "../atoms/infoState";
const ReportPage = () => {
  const userinfo = useRecoilValue(infoState);
  const [loading, setLoading] = useState(false);
  const [filters] = useRecoilState(filtersState);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [display, setDisplay] = useState("percentage");

  const [mainContent, setMainContent] = useState(null);

  const fetchData = async (filterData) => {
    try {
      setLoading(true);
      const response = await getClassAttendance({
        year: filterData.year,
        division: filterData.division,
        start_date: filterData.startDate,
        end_date: filterData.endDate,
        teacher_id: userinfo.ID,
      });
      setMainContent(response.data);
      const content = response.data;
      if (content?.students === null) {
        setData(null);
        setColumns([]);
        setLoading(false);
        return;
      }
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

      newData = getDefaulterArray(content, newColumns, display);
      setData(newData);
      setColumns(newColumns);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDefaulterArray = (data, newColumns, displayMode) => {
    let initialStudents = [];

    initialStudents = data?.students.map((student) => {
      const jsonObject = {};
      const valuesToUpdate = [];
      valuesToUpdate.push(student.student_id);
      valuesToUpdate.push(student.student_name);

      student.subject_attendance.forEach((subject) => {
        let theoryAttendance, practicalAttendance;
        if (displayMode === "fraction") {
          theoryAttendance = `${subject.attended_theory || 0}/${
            subject.total_theory
          }`;
          practicalAttendance = `${subject.attended_practical || 0}/${
            subject.total_practical
          }`;
        } else {
          theoryAttendance = getTwoDecimals(subject.attendance_theory) + "%";
          practicalAttendance =
            getTwoDecimals(subject.attendance_practical) + "%";
        }
        valuesToUpdate.push(theoryAttendance);
        valuesToUpdate.push(practicalAttendance);
      });
      let grandAttendance;
      if (displayMode === "fraction") {
        grandAttendance = `${student.attended_grand || 0}/${
          student.total_grand || 0
        }`;
      } else {
        grandAttendance = getTwoDecimals(student.grand_attendance) + "%";
      }
      valuesToUpdate.push(grandAttendance);
      valuesToUpdate.push(student.defaulter);
      newColumns.forEach((key, index) => {
        jsonObject[key.accessorKey] = valuesToUpdate[index];
      });

      return jsonObject;
    });
    setLoading(false);

    return initialStudents;
  };

  return (
    <div className="flex-col">
      <Nav />
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <h1 className="text-4xl font-bold text-black">Report Page</h1>
        <Filters loading={loading} fetchData={fetchData} />
      </div>
      <ReportTable
        columns={columns}
        data={data}
        setLoading={setLoading}
        loading={loading}
        filters={filters}
        display={display}
        setDisplay={setDisplay}
        mainContent={mainContent}
        getDefaulterArray={getDefaulterArray}
        setData={setData}
      />
    </div>
  );
};

export default ReportPage;
