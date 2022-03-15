import React, { useState,useEffect } from 'react';
import './surveys.scss';
import Button from '@mui/material/Button';
import SurveyTable from './SurveyTable/SurveyTable';
//import { color } from '@mui/system';
import Card from '@mui/material/Card';
//import CardContent from '@mui/material/CardContent';
import NewSurvey from '../newsurvey/NewSurvey';

function Surveys() {
    const [newSurvey,setnewSurvey] = useState(false);
    const [editSurveyStatus,seteditSurveyStatus] = useState(false);
    const urlBase = 'https://2u7idz6kn8.execute-api.us-east-1.amazonaws.com/Prod/';
    const [formData,setFormData] = useState({
        "surveyName": '', 
        "welcomeMessage": '', 
        "closingMessage": '', 
        "default":false, 
        "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}]
    });
    const showSurveyForm = () =>{ 
        setnewSurvey(true);
        seteditSurveyStatus(false);
    }
    const showSurveyList = () =>{
        setnewSurvey(false);
        setFormData({
            "surveyName": '', 
            "welcomeMessage": '', 
            "closingMessage": '', 
            "default":false, 
            "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}]
        })
    }
    const [surveyData, setSurveyData] = useState('');
    const [surveyId, setSurveyId] = useState('');
    const url = urlBase+"getAllSurveyData";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            const surveyProcessed = data.map(surveyData => ({ id: surveyData.id,
            Survey:  surveyData.surveyName, 
            PrimaryMetric: surveyData.Questions[0].questionType,
            Created:surveyData.createdAt,
            Modified:surveyData.modifiedAt
          }));
            setSurveyData(surveyProcessed);
            console.log(surveyData);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
      fetchData();
    }, []);
    const addSurvey = data => {
        console.log(data);
        setnewSurvey(false);
        if(editSurveyStatus){
            editOldSurvey(data);
        }else{
            addNewSurvey(data);
        }

        setFormData({
            "surveyName": '', 
            "welcomeMessage": '', 
            "closingMessage": '', 
            "default":false, 
            "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}]
        })
        //fetchData();
    }
    const editOldSurvey = data => {
        const requestOptions = {
            method: 'POST',
            body: data
        };
        fetch(`https://2u7idz6kn8.execute-api.us-east-1.amazonaws.com/Prod/updateSurveyData/${surveyId}`,requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            fetchData();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        //this.setState({ postId: data.id });
    };
    const addNewSurvey = data => {
        const requestOptions = {
            method: 'POST',
            body: data
        };
        fetch('https://2u7idz6kn8.execute-api.us-east-1.amazonaws.com/Prod/addSurveyData',requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            fetchData();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });;

    };

    const editSurvey = id => {
    console.log(id);
    const url = `https://2u7idz6kn8.execute-api.us-east-1.amazonaws.com/Prod/getSurveyDataById/${id}`;
    const fetchDataById = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            //setSurveyData(surveyProcessed);
            setSurveyId(data.id);
            setFormData({
                "surveyName": data.surveyName, 
                "welcomeMessage": data.welcomeMessage, 
                "closingMessage": data.closingMessage, 
                "default":data.default, 
                "Questions":data.Questions
            });
            console.log(formData);
            showSurveyForm();
            seteditSurveyStatus(true);
        } catch (error) {
            console.log("error", error);
        }
    };
    fetchDataById();
    //
    }
    let newSurveyForm;
    let surveyList;
    if(newSurvey){
        newSurveyForm = <NewSurvey onAdd={addSurvey} formValue={formData} editStatus={editSurveyStatus} onBackClick={showSurveyList}/>
    }else{
        surveyList =  <SurveyTable data={surveyData} onEdit={editSurvey}/>;
    }
    return (
        <div className='content-container surveys'>
            <div className='section-header'>
                <h2>Surveys</h2>
                <Button variant="contained" onClick={showSurveyForm}>New Survey</Button>
            </div>
            <Card sx={{ minWidth: 275 }}>
               
                    {surveyList}
                   {newSurveyForm}
                   
            </Card>


        </div>
    )
}

export default Surveys;
