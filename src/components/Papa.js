import Papa from "papaparse";
import React, { useState } from "react";
import { getCsvSapIds } from "../utils/helpers";
import { markLectureAttendance } from "../utils/services";

function Csvconvert({ lectureId, subjectId }) {
  const [sapIds, setSapIds] = useState([]);

  return (
    <div className="App">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const files = e.target.files;

          if (files) {
            Papa.parse(files[0], {
              complete: function (results) {
                setSapIds(getCsvSapIds(results.data));
              },
            });
          }
        }}
      />
      {sapIds.length > 0 && (
        <button
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          onClick={() => markLectureAttendance(lectureId, sapIds)}//TODO: add subjectId
        >
          Mark Attendance
        </button>
      )}
    </div>
  );
}
export default Csvconvert;
