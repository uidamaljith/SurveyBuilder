import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Radio from "@mui/material/Radio";
import './SurveyTable.scss'

const SurveyTable = (props) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [defaultSUrvey,setDefaultSUrvey]= React.useState({});
  const [defaultitem,setDefaultItem]= React.useState();
  console.log(props.data);
  if(props.data){
    const selectedRow = props.data.filter((item) => {
      return item.default === true;
    });
    const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "Survey",
      headerName: "Survey",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "PrimaryMetric",
      headerName: "Primary Metric",
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
    },
    {
      field: "Modified",
      headerName: "Modified",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Design",
      width: 100,
      getActions: (data) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={handleEditClick(data)}
        />,
        // <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(data)}/>,
      ],
    },
    {
      field: "analyze",
      type: "actions",
      headerName: "Analyze",
      width: 100,
      getActions: (data) => [
        <GridActionsCellItem
          icon={<InsertChartIcon />}
          label="Analyze"
          onClick={handleEditClick(data)}
        />,
        // <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(data)}/>,
      ],
    },
    {
      field: "default",
      headerName: "Default",
      width: 100,
      renderCell: (params) => (
        <Radio checked={selectedRow[0].id === params.id} value={params.id}  onClick={onRadioSelcetion(params.id)}/>
      )
    },
  ];
    //let radioChecked = [selectedRow.id];
    console.log(defaultSUrvey);
    const handleEditClick = (data) => (event) => {
      event.stopPropagation();
      console.log(data);
      //apiRef.current.setRowMode(id, 'edit');
      props.onEdit(data.id,data.row.canUpdate);
    };

    const onRadioSelcetion = (value)=> (event)  =>{
      event.stopPropagation();
      console.log(value);
      props.onSelectDefault(value);
    }

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
    return (<span>Loading...</span> )
  }


};

export default SurveyTable;
