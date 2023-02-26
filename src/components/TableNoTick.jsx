import React from "react";
import { MDBDataTableV5 } from "mdbreact";
// import Result from '../components/result';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
export default function WithMultipleCheckboxes() {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: "Sapid",
        field: "sapid",
        width: 150,
      },
      {
        label: "name",
        field: "name",
        width: 270,
      },
    ],
    rows: [
      {
        sapid: "60003200162",
        name: "Ishaan Goat",
      },
      {
        sapid: "60003200173",
        name: "dhruv noob",
      },
    ],
  });

  return (
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
  );
}
