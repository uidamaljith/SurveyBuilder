import React, { useState,useEffect } from 'react';
import './surveys.scss';
import Button from '@mui/material/Button';
import SurveyTable from './SurveyTable/SurveyTable';
import NewSurvey from '../newsurvey/NewSurvey';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Surveys() {
    const [newSurvey,setnewSurvey] = useState(false);
    const [editSurveyStatus,seteditSurveyStatus] = useState(false);
    const urlBase = 'https://y97ci5zkbh.execute-api.us-east-1.amazonaws.com/Prod/';
    let companyData = {companyname:'PlacePay',companycode:'PPAY'};
    if(localStorage.companyDetails){
         companyData = JSON.parse(localStorage.companyDetails);
    }
    const [formData,setFormData] = useState({
        "surveyName": '', 
        "welcomeMessage": 'Thank you for taking the time to complete the survey. We value your opinion.”',
        "closingMessage": 'Thank you for your feedback. Your feedback helps us continuesly improve our services for you. If you have other ideas or anything else you need please let us know',  
        "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}],
        "canUpdate":true
    });
    const showSurveyForm = () =>{ 
        setnewSurvey(true);
        seteditSurveyStatus(false);
    }
    const showSurveyList = () =>{
        setnewSurvey(false);
        setFormData({
            "surveyName": '', 
            "welcomeMessage": 'Thank you for taking the time to complete the survey. We value your opinion.', 
            "closingMessage": 'Thank you for your feedback. Your feedback helps us continuesly improve our services for you. If you have other ideas or anything else you need please let us know.', 
 
            "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}],
            "canUpdate":true
        })
    }
    const [surveyData, setSurveyData] = useState('');
    const [surveyId, setSurveyId] = useState('');
    let qParam = ''
    if(companyData.companycode !== ''){
        qParam = `?companyCode=${companyData.companycode}`;
    }
    const url = `${urlBase}getAllSurveyData${qParam}`;
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            const surveyProcessed = data.map(surveyData => ({ id: surveyData.id,
            Survey:  surveyData.surveyName, 
            PrimaryMetric: surveyData.Questions[0].questionType,
            Created:new Date(surveyData.createdAt).toLocaleDateString("en-US"),
            Modified:new Date(surveyData.modifiedAt).toLocaleDateString("en-US"),
            canUpdate:surveyData.canUpdate,
            default:surveyData.default
            // Created:new Date(surveyData.createdAt).toJSON().slice(0,10).split('-').reverse().join('/'),
            // Modified:new Date(surveyData.modifiedAt).toJSON().slice(0,10).split('-').reverse().join('/'),
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
            "welcomeMessage": 'Thank you for taking the time to complete the survey. We value your opinion.', 
            "closingMessage": 'Thank you for your feedback. Your feedback helps us continuesly improve our services for you. If you have other ideas or anything else you need please let us know.', 
 
            "Questions":[{ questionNo:1,question: "How did we do?", questionType : "CSAT",minScale:1,maxScale:5}],
            "canUpdate":true
        })
        //fetchData();
    }
    const editOldSurvey = data => {
        const requestOptions = {
            method: 'POST',
            body: data
        };
        fetch(`${urlBase}updateSurveyData/${surveyId}`,requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            fetchData();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            toast.success("Survey updated successfully")

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            toast.error("Something went wrong.! Please try again after some time")
            console.error('There was an error!', error);
        });
        //this.setState({ postId: data.id });
    };
    const addNewSurvey = data => {
        const requestOptions = {
            method: 'POST',
            body: data
        };
        fetch(`${urlBase}addSurveyData`,requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            fetchData();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            toast.success("Survey added successfully")
            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            toast.error("Something went wrong.! Please try again after some time")
            console.error('There was an error!', error);
        });

    };

    const editSurvey = (id,canUpdate) => {
        console.log(id);
        const url = `${urlBase}getSurveyDataById/${id}`;
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
                    "Questions":data.Questions,
                    "canUpdate":canUpdate
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
    const selectDefault =(id)=>{
        const data = JSON.stringify({
            companyCode:companyData.companycode,
            "default":true
        });
        const requestOptions = {
            method: 'POST',
            body: data
        };
        fetch(`${urlBase}updateDefaultSurveyData/${id}`,requestOptions).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            fetchData();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            toast.success("Set default survey successfully")

            //this.setState({ postId: data.id })
        })
        .catch(error => {
            //this.setState({ errorMessage: error.toString() });
            toast.error("Something went wrong.! Please try again after some time")
            console.error('There was an error!', error);
        });
    }
    let newSurveyForm;
    let surveyList;
    if(newSurvey){
        newSurveyForm = <NewSurvey onAdd={addSurvey} formValue={formData} editStatus={editSurveyStatus} onBackClick={showSurveyList}/>
    }else{
        surveyList =  <SurveyTable data={surveyData} onEdit={editSurvey} onSelectDefault={selectDefault}/>;
    }
    return (
        <div className='content-container surveys'>
            {surveyList &&
                <div className='section-header'>
                    <h2>Surveys</h2>
                    <Button variant="contained" onClick={showSurveyForm}>New Survey</Button>
                </div>
            }
                {surveyList}
                {newSurveyForm}
        </div>
    )
}

export default Surveys;
