import React from "react";
import Nav from "../components/Navbar";
import Banner from "../components/Banner";
import Filters from "../components/Filters";
import Example from "../components/MainTable";
import { useRecoilState } from "recoil";
import { filtersState } from "../atoms/filtersState";
const ReportPage = () => {
  const [filters, setFilters] = useRecoilState(filtersState);
  return (
    <div>
      <Nav />
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <h1 className="text-4xl font-bold text-black">Report Page</h1>
        <Filters />
      </div>
      <Example
        attendanceMark={false}
        callApi="getAllStudents"
        filters={filters}
      />
    </div>
  );
};

export default ReportPage;

//getdefaulterslistbyclass -- columns = subjects row= name, attendance per subject () (high priority)
//showstudentdetails -- columns = subjects row= name, attendance per subject but for only one student, in detail (low p[riority])
//
//
//
//
//
