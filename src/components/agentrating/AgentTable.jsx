import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Card from '@mui/material/Card';


import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { height } from '@mui/system';


const rows: GridRowsProp[] = [
  { id: 1, 
    Sl:1,
    Agent: "Carlos Smith", 
    Positive:"85%",
    Avarage:"10%",
    Negative:"5%",
    Responses:"1,000",
    
  },
  { id: 2, 
    Sl:2,
    Agent: "Anna Johnson", 
    Positive:"75%",
    Avarage:"20%",
    Negative:"5%",
    Responses:"800",
    
  },
  
  
];

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "Sl", headerName: "#", flex: 1,maxWidth: 30, },
  { field: "Agent", headerName: "Agent", flex: 1,minWidth: 300, },
  { field: "Positive", renderHeader: ()=><SentimentSatisfiedAltIcon style={{ color: "green",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100 },
  { field: "Avarage", renderHeader: ()=><SentimentSatisfiedIcon style={{ color: "orange",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100,},
  { field: "Negative", renderHeader: ()=><SentimentVeryDissatisfiedIcon style={{ color: "red",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100,},
  { field: "Responses", headerName: "Responses",flex: 1,minWidth: 100,},
  
];




 

 function AgentTable() {

  return (
    <div style={{ height: 250, width: '100%' }}>
      
      <DataGrid rows={rows} columns={columns} id="AgentTble" />
     </div>
  );
}

export default AgentTable;


