import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import {
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';

// const rows: GridRowsProp[] = [
//   { id: 1, 
//     Survey: "Survey 2", 
//     PrimaryMetric: "NPS",
//     Created:"12/31/2021",
//     Modified:"12/31/2021",
//     Design:"",
//     Analyze:"",
//     Default:"" 
//   },
//   { id: 2, 
//     Survey: "Survey 1", 
//     PrimaryMetric: "CES",
//     Created:"12/31/2021",
//     Modified:"12/31/2021",
//     Design:"",
//     Analyze:"",
//     Default:"" 
//   },
  
// ];



// const rows: GridRowsProp[] = [
//   { id: 1, 
//     Survey: "Survey 2", 
//     PrimaryMetric: "NPS",
//     Created:"12/31/2021",
//     Modified:"12/31/2021",
//     Design:"",
//     Analyze:"",
//     Default:"" 
//   },
//   { id: 2, 
//     Survey: "Survey 1", 
//     PrimaryMetric: "CES",
//     Created:"12/31/2021",
//     Modified:"12/31/2021",
//     Design:"edit",
//     Analyze:"",
//     Default:"" 
//   },
  
// ];



 const SurveyTable = props => {
  const columns: GridColDef[] = [
    { field: "id", hide: true },
    { field: "Survey", headerName: "Survey", flex: 1,minWidth: 150,editable: true, },
    { field: "PrimaryMetric", headerName: "Primary Metric",flex: 1,minWidth: 150,editable: true,},
    { field: "Created", headerName: "Created",flex: 1,minWidth: 150,editable: true,},
    { field: "Modified", headerName: "Modified",flex: 1,minWidth: 150,editable: true,},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Design',
      width: 100,
      getActions: (data) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(data)}/>,
        // <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(data)}/>,
      ],
    },
    {
      field: 'analyze',
      type: 'actions',
      headerName: 'Analyze',
      width: 100,
      getActions: (data) => [
        <GridActionsCellItem icon={<InsertChartIcon />} label="Analyze" onClick={handleEditClick(data)}/>,
        // <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(data)}/>,
      ],
    },
    {
      field: 'default',
      type: 'actions',
      headerName: 'Default',
      width: 100,
      getActions: (data) => [
        <GridActionsCellItem icon={<ToggleOnIcon />} label="Default" onClick={handleEditClick(data)}/>,
        
        
        //  <GridActionsCellItem icon={<ToggleOffIcon />} label="Default" onClick={handleEditClick(data)}/>,
      ],
    }
    
  ];
  const handleEditClick = (data) => (event) => {
    event.stopPropagation();
    console.log(data.id);
    //apiRef.current.setRowMode(id, 'edit');
    props.onEdit(data.id);
  };
  // const handleDeleteClick = (id) => (event) => {
  //   event.stopPropagation();
  //   console.log(id);
  // };
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={props.data} columns={columns}/>
    </div>
  );
}

export default SurveyTable;




