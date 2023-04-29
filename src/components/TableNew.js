import React, { useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import axios from 'axios';

//defining columns outside of the component is fine, is stable

const Example = ({callApi}) => {

  const[columns,setColumns]= useState([]);
    const[data,setData]= useState([]);
    const getData = async () => {
        const res = await axios.get(`http://localhost:9000/${callApi}`);
        // if(callApi==="getAllStudents")
        // {setData(getStudentArray(res.data));}
        // else{
        //     setData(res.data);
        // }
        setData(res.data);
        setColumns( Object.keys(res.data[0]))

        // console.log(res.data);
      };
    
    //   const getStudentArray = (students) => {
    //     let initialStudents = [];
    //     initialStudents = students?.map((student) => {
    //       return {
    //         sapid: student.sap_id,
    //         name: student.name,
    //       };
    //     });
    //     return initialStudents;
    //   };
      useEffect(() => {
        getData();
      }, []);
    
      const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
      };
      const csvExporter = new ExportToCsv(csvOptions);

      const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
      };
    
      const handleExportData = () => {
        csvExporter.generateCsv(data);
      };

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Box
          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
        >
          <Button
            color="primary"
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
            variant="contained"
          >
            Export Selected Rows
          </Button>
        </Box>
      )}
    />
  );
};

export default Example;
