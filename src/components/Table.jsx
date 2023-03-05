import React, { useEffect, useState } from "react";
import { MDBDataTableV5, MDBNavLink } from "mdbreact";
// import Result from '../components/result';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function WithMultipleCheckboxes({ data, columns }) {
  const [studentsData, setStundentsData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [sapIDs, setSapIDs] = useState([]);

  useEffect(() => {
    if (data.length !== 0 && columns) {
      console.log(data);
      setStundentsData(data);
      setTableRows(
        data.map((r) => {
          return {
            sapid: r.sapid,
            name: r.name,
            // clickEvent: () => handleClick(),
          };
        })
      );
    }
  }, [data]);

  const navigate = useNavigate();
  // console.log(data)
  const handleClick = () => {
    navigate("/home");
    console.log("clicked");
  };

  // console.log(`hello`+data)
  const addSapID = (e) => {
    if (e.length === data.length && sapIDs.length !== data.length) {
      let saps = [];
      console.log(e);
      e.map((r) => saps.push(Number(r.sapid)));
      setSapIDs(saps);
    } else if (sapIDs.length !== data.length && !sapIDs.includes(e.sapid)) {
      setSapIDs((current) => [...current, e.sapid]);
    } else if (sapIDs.includes(e.sapid)) {
      const index = sapIDs.indexOf(e.sapid);
      sapIDs.splice(index, 1);
      setSapIDs((current) => [...current]);
    } else {
      setSapIDs([]);
    }
  };

  console.log(sapIDs);
  const [checkbox1, setCheckbox1] = React.useState([]);

  const markAttendance = async () => {
    const res = await axios.post("http://localhost:9000/markAttendance", {
      lecture_id: "ea818591-a0b7-4e45-ba14-a2a1c2ecce50",
      subject_id: "dc74e59c-b524-4972-b991-263f665715f9",
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

  const [datatable, setDatatable] = React.useState({
    columns: columns,
    rows: tableRows,
  });

  useEffect(() => {
    setDatatable({
      columns: columns,
      rows: tableRows,
    });
  }, [tableRows]);
  return (
    <div className="p-3">
      <div className="flex items-center justify-end">
        <button
          className="bg-[#AA5656] text-[#F1DBBF] font-[Poppins] py-2 px-6 rounded  hover:bg-[#F1DBBF] hover:text-[#AA5656] duration-500"
          onClick={markAttendance}
        >
          Mark Attendance
        </button>
      </div>
      {datatable.rows.length !== 0 ? (
        <div className="p-8">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            checkbox
            headCheckboxID="id6"
            bodyCheckboxID="checkboxes6"
            getValueCheckBox={(e) => {
              addSapID(e);
            }}
            getValueAllCheckBoxes={(e) => {
              addSapID(e);
            }}
            multipleCheckboxes
            responsive
            searchTop
            searchBottom={false}
          />
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
