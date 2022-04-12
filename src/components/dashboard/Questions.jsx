import React from 'react';
import Button from '@mui/material/Button';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';


import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
  { field: "SL", headerName: "#", flex: 1,maxWidth: 50, },
  { field: "Question", headerName: "Question", flex: 1,minWidth: 300, },
  { field: "Metric", headerName: "Metric",flex: 1,minWidth: 150,},
  { field: "Positive", renderHeader: ()=><SentimentSatisfiedAltIcon style={{ color: "green",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100 },
  { field: "Avarage", renderHeader: ()=><SentimentSatisfiedIcon style={{ color: "orange",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100,},
  { field: "Negative", renderHeader: ()=><SentimentVeryDissatisfiedIcon style={{ color: "red",margin:'auto'}} fontSize='large' />,flex: 1,minWidth: 100,},
  { field: "Responses", headerName: "Responses",flex: 1,minWidth: 100,},
  
];

 const QuestionsTable = ({data}) => {
  const [pageSize, setPageSize] = React.useState(5);
  const row = [];
   data.map((item,index) => {
    if (!row[index]) row[index] = [];
    item.responses.map((element,i) => {
      //eval('var row' + index+1 + '=[]');
      if(element){
        row[index].push({ id: element.questionId, 
          SL:i+1,
          Question: element.question, 
          Metric: element.questionType,
          Positive:element.totalPositiveScore+'%  '+element.totalPositiveResponse,
          Avarage:element.totalNeutralScore+'%  '+element.totalNeutralResponse,
          Negative:element.totalNegativeScore+'%  '+element.totalNegativeResponse,
          Responses:element.totalResponse,
          
        })
      }
     })
     console.log(row[index]);

   })

   const renderTempBoxes = () => {
    let els = [];
  
    for (let i = 0; i < data.length; i++) {
      els.push(
        <div>
          <h3> {data[i].surveyName}</h3>
          <Card component="form" noValidate autoComplete="off">
            <CardContent>

              <div style={{ height: 330, width: '100%' }}>
              
                <DataGrid 
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                rows={row[i]} 
                columns={columns} 
                key={i}/>
              </div>
            </CardContent>
        </Card>
        </div>
        
      );
    }
    if(els.length > 0){
      return els;
    }else{
        return <span>No data available.</span>
    }
  };

  return (
    <React.Fragment>
      {renderTempBoxes()}
    </React.Fragment>

    
  );
}

export default QuestionsTable;


