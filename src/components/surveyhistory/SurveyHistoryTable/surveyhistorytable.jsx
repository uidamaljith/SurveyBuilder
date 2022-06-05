import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from "@mui/material/Radio";
import './surveyhistorytable.scss'

const SurveyTable = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  console.log(props.data);
  if(props.data){
    props.data.filter((item) => {
      if(item.default){
        return item.default === true;
      }
    });
    const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "CompanyName",
      headerName: "Company",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "Survey",
      headerName: "Survey",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "surveyType",
      headerName: "Survey Type",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "q1Response",
      headerName: "Q1",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "q2Response",
      headerName: "Q2",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "q3Response",
      headerName: "Q3",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "q4Response",
      headerName: "Q4",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "q5Response",
      headerName: "Q5",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "Created",
      headerName: "Created",
      flex: 1,
      minWidth: 150,
      editable: true,
    }
  ];

  return (
    <Card component="form" noValidate autoComplete="off">
      <CardContent>
        <div style={{ height: 700, width: "100%" }} className="set-height">
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            rows={props.data}
            columns={columns}
          />
        </div>
      </CardContent>
    </Card>
  );
  }else{
    return (<span></span> )
  }


};

export default SurveyTable;
