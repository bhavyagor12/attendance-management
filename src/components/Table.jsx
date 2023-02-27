import React from "react";
import { MDBDataTableV5, MDBNavLink } from "mdbreact";
// import Result from '../components/result';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function WithMultipleCheckboxes({ data,columns }) {
  const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home')
        console.log('clicked')
    }
    // console.log(`hello`+data)
  const [datatable, setDatatable] = React.useState({
    columns: columns,
    // [
    //   {
    //     label: "Sapid",
    //     field: "sapid",
    //     width: 150,
    //     attributes: {
    //       "aria-controls": "DataTable",
    //       "aria-label": "Name",
    //     },
    //   },
    //   {
    //     label: "Name",
    //     field: "name",
    //     width: 270,
    //   },
    //   {
    //     label: "Position",
    //     field: "position",
    //     width: 270,
    //   },
    // ],
    rows: data.map((r) => {
      return {
        sapid: r.sapid,
        name: r.name,
        position: <Link to="/">Link</Link>,
        clickEvent: () => handleClick(),
      };
    }),
    // [
    //   {
    //     sapid: "60003200137",
    //     name: "Ishaan Goat",
    //     position: <Link to="/">Link</Link>,
    //     clickEvent: () => handleClick(),
    //   },
    //   {
    //     sapid: "60003200138",
    //     name: "dhruv noob",
    //     position: <Link to="/home">Link</Link>,
    //   },
    // ],
  });
  const [checkbox1, setCheckbox1] = React.useState([]);
  var saps = [];
  const showLogs2 = (e) => {
    setCheckbox1(e);
    console.log(e);
  };

  const markAttendance = async () => {
    if (checkbox1.length) {
      checkbox1.map((r) => saps.push(Number(r.sapid)));
      console.log(saps);
      const res = await axios.post("http://localhost:9000/markAttendance", {
        lecture_id: "fb7ad24b-8991-4e8b-a2b7-4e73314f63b6",
        attendance: saps,
      });
      Swal.fire({
        title: "Success!",
        text: "Marked Attendance",
        icon: "success",
        confirmButtonText: "Done",
      });
      navigate("/home");
      saps = [];
    } else {
      console.log(checkbox1.sapid);
    }
  };

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
          showLogs2(e);
        }}
        getValueAllCheckBoxes={(e) => {
          showLogs2(e);
        }}
        multipleCheckboxes
        responsive
        searchTop
        searchBottom={false}
      />
    </div>
  );
}
