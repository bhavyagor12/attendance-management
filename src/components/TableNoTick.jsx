import React, { useEffect, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
// import Result from '../components/result';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
export default function WithMultipleCheckboxes({ data, columns }) {
  const [studentsData, setStundentsData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [sapIDs, setSapIDs] = useState([]);
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log("clicked");
    console.log(e.sapid);
    console.log(e.name);
    navigate(`/student/${e.sapid}`, {
      state: { sapId: `${e.sapid}`, name: `${e.name}` },
    });
  };

  useEffect(() => {
    if (data.length !== 0 && columns) {
      console.log(data);
      setStundentsData(data);
      setTableRows(
        data.map((r) => {
          return {
            sapid: r.sapid,
            name: r.name,
            clickEvent: (e) => handleClick(e),
          };
        })
      );
    }
  }, [data]);

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
    <div className="p-8">
      {datatable.rows.length !== 0 ? (
        <div className="p-8">
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={datatable}
            responsive
            searchTop
            searchBottom={false}
          />
        </div>
      ) : (
        <ReactLoading
          type="spinningBubbles"
          color="#236F21"
          height={667}
          width={375}
        />
      )}
    </div>
  );
}
