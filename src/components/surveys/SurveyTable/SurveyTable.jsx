import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


const rows: GridRowsProp[] = [
  { id: 1, 
    Survey: "Survey 2", 
    PrimaryMetric: "NPS",
    Created:"12/31/2021",
    Modified:"12/31/2021",
    Design:"",
    Analyze:"",
    Default:"" 
  },
  { id: 2, 
    Survey: "Survey 1", 
    PrimaryMetric: "CES",
    Created:"12/31/2021",
    Modified:"12/31/2021",
    Design:"",
    Analyze:"",
    Default:"" 
  },
  
];

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "Survey", headerName: "Survey", flex: 1,minWidth: 150, },
  { field: "PrimaryMetric", headerName: "Primary Metric",flex: 1,minWidth: 150,},
  { field: "Created", headerName: "Created",flex: 1,minWidth: 150,},
  { field: "Modified", headerName: "Modified",flex: 1,minWidth: 150,},
  { field: "Design", headerName: "Design",flex: 1,minWidth: 150,},
  { field: "Analyze", headerName: "Analyze",flex: 1,minWidth: 150,},
  { field: "Default", headerName: "Default",flex: 1,minWidth: 150,}
];

 function SurveyTable() {
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default SurveyTable;


