import React from "react";
import Nav from "../components/Navbar";
import { useRecoilState } from "recoil";
import { filtersState } from "../atoms/filtersState";
import ReportTable from "../components/ReportTable";
const ReportPage = () => {
  const [filters] = useRecoilState(filtersState);
  return (
    <div className="flex-col">
      <Nav />
      <div className="flex flex-col gap-y-4 justify-center items-center">
        <h1 className="text-4xl font-bold text-black mb-2">Report Page</h1>
      </div>
      <ReportTable filters={filters} />
    </div>
  );
};

export default ReportPage;
