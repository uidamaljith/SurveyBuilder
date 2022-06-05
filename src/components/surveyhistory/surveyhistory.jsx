import React, { useState,useEffect } from 'react';
import './surveyhistory.scss';
import 'react-toastify/dist/ReactToastify.css';
import SurveyTable from './SurveyHistoryTable/surveyhistorytable';

function SurveyHistory() {
    const urlBase = process.env.REACT_APP_BASE_URL;
    const [surveyData, setSurveyData] = useState('');
    const [searchkey, setSearchKey] = useState('');
    const [searchType, setSearchType] = useState('contactId');
    const url = `${urlBase}getSurveyHistory?${searchType}=${searchkey}`;
    const getSurveyHistory = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            //let data = json.message;
            let data = [
          {
             "id": "6c218e41-3af9-439f-9fee-d657a79e1e57",
            "companyCode": "PPAY",
            "companyName": "PlacePay",
            "surveyName": "PlacePay CES",
            "surveyType": "CES",
            "phone": "7862471779",
            "contactId": "12344455ffffgfg",
            "q1Response": "5",
            "q2Response": "5",
            "q3Response": "5",
            "q4Response": "5",
            "q5Response": "5",
            "date": "12/31/2021"
          },
          {
              "id": "6c238e41-3af9-439f-9fee-d657a79e1e37",
            "companyCode": "PPAY",
            "companyName": "PlacePay",
            "surveyName": "PlacePay CSAT",
            "surveyType": "CSAT",
            "phone": "7862471779",
            "contactId": "22344455ffffgfg",
            "q1Response": "5",
            "q2Response": "5",
            "q3Response": "5",
            "q4Response": "5",
            "q5Response": "5",
            "date": "12/31/2021"
          } 
            ]
            const surveyProcessed = data.map(surveyData => ({id: surveyData.id,Survey:  surveyData.surveyName, 
            CompanyName: surveyData.companyName,
            survey: surveyData.surveyName,
            surveyType: surveyData.surveyType,
            q1Response: surveyData.q1Response,
            q2Response: surveyData.q2Response,
            q3Response: surveyData.q3Response,
            q4Response: surveyData.q4Response,
            q5Response: surveyData.q5Response,
            Created:new Date(surveyData.date).toLocaleDateString("en-US"),
          }));
            setSurveyData(surveyProcessed);
            console.log(surveyData);
        } catch (error) {
            console.log("error", error);
        }
    };
    const handleChange = (event)=>{
        console.log(event.target.value);
        setSearchKey(event.target.value)
    }
    const handleTypeChange = (event)=>{
        console.log(event.target.value);
        setSearchType(event.target.value)
    }
    useEffect(() => {
      //fetchData();
    }, []);
    let surveyList = <SurveyTable data={surveyData}/>;
    return (
        <div className='content-container surveys'>
            <h2>Survey History</h2> 
            <div>
                <label htmlFor="search">Search</label><br></br>
                <input name="search" onChange={(e) => handleChange(e)} type="text" placeholder='Contactid/Phone Number' />
                <button onClick={getSurveyHistory}>Search</button>

                <select name="type" id="type" onChange={(e) => handleTypeChange(e)}>
                    <option value="contactId">Contact Id</option>
                    <option value="contactNumber">Contact Number</option>
                </select>
            </div>
                {surveyList}
        </div>
    )
}

export default SurveyHistory;
