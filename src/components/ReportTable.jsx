import React, { useState } from "react";
import MaterialReactTable from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import ReactLoading from "react-loading";
const ReportTable = ({ loading, setLoading, columns, data }) => {
  const [rowSelection, setRowSelection] = useState({});

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
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#000000"}
            height={"20%"}
            width={"20%"}
          />
        </div>
      ) : data !== null ? (
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
      ) : (
        <div> </div>
      )}
    </>
  );
};

export default ReportTable;
