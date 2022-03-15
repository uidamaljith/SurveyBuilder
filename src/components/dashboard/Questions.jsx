import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';


const rows: GridRowsProp[] = [
  { id: 1, 
    Sl:1,
    Question: "How did we do?", 
    Metric: "NPS",
    Positive:"85%",
    Avarage:"10%",
    Negative:"5%",
    Responses:"1,000",
    
  },
  { id: 2, 
    Sl:2,
    Question: "How well did our representative address your concerns?", 
    Metric: "NPS",
    Positive:"85%",
    Avarage:"10%",
    Negative:"5%",
    Responses:"1,000",
   
  },
  
  
];

const columns: GridColDef[] = [
  // { field: "id", hide: true },
  { field: "id", headerName: "#", flex: 1,maxWidth: 20, },
  { field: "Question", headerName: "Question", flex: 1,minWidth: 400, },
  { field: "Metric", headerName: "Primary Metric",flex: 1,minWidth: 150,},
  { field: "Positive", renderHeader: ()=><SentimentSatisfiedAltIcon style={{ color: "green",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 150 },
  { field: "Avarage", renderHeader: ()=><SentimentSatisfiedIcon style={{ color: "orange",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 150,},
  { field: "Negative", renderHeader: ()=><SentimentVeryDissatisfiedIcon style={{ color: "red",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 150,},
  { field: "Responses", headerName: "Responses",flex: 1,minWidth: 150,},
  
];

 function QuestionsTable() {
  return (
    <React.Fragment>
      <div style={{ height: 300, width: '100%' }}>
        <h3>Survey 3</h3>
          <DataGrid rows={rows} columns={columns} />
      </div>
      <div style={{ height: 300, width: '100%' }}>
      <h3>Survey 2</h3>
          <DataGrid rows={rows} columns={columns} />
      </div>
      <div style={{ height: 300, width: '100%' }}>
      <h3>Survey 1</h3>
          <DataGrid rows={rows} columns={columns} />
      </div>
    </React.Fragment>

    
  );
}

export default QuestionsTable;


