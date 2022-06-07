import React, { useState,useEffect } from 'react';
import './surveyhistory.scss';
import 'react-toastify/dist/ReactToastify.css';
import SurveyTable from './SurveyHistoryTable/surveyhistorytable';
import { useSearchParams } from "react-router-dom"

function SurveyHistory() {
    const urlBase = process.env.REACT_APP_BASE_URL;
    const [surveyData, setSurveyData] = useState([]);
    const [searchkey, setSearchKey] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [searchType, setSearchType] = useState('contactId');
    let [searchParams, setSearchParams] = useSearchParams('')



    const getSurveyHistory = async (searchkey) => {
        setIsSearch(true);
         const url = `${urlBase}getSurveyHistory?${searchType}=${searchkey}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            let data = json.message;
        //     let data = [
        //   {
        //      "id": "1",
        //     "companyCode": "PPAY",
        //     "companyName": "PlacePay",
        //     "surveyName": "PlacePay CES",
        //     "surveyType": "CES",
        //     "phone": "7862471779",
        //     "contactId": "12344455ffffgfg",
        //     "q1Response": "5",
        //     "q2Response": "5",
        //     "q3Response": "5",
        //     "q4Response": "5",
        //     "q5Response": "5",
        //     "date": "12/31/2021"
        //   },
        //   {
        //       "id": "2",
        //     "companyCode": "PPAY",
        //     "companyName": "PlacePay",
        //     "surveyName": "PlacePay CSAT",
        //     "surveyType": "CSAT",
        //     "phone": "7862471779",
        //     "contactId": "22344455ffffgfg",
        //     "q1Response": "5",
        //     "q2Response": "5",
        //     "q3Response": "5",
        //     "q4Response": "5",
        //     "q5Response": "5",
        //     "date": "12/31/2021"
        //   } 
        //     ]
            const surveyProcessed = data.map((surveyData,index) => ({id: index,Survey:  surveyData.surveyName, 
            CompanyName: surveyData.companyName,
            survey: surveyData.surveyName,
            surveyType: surveyData.surveyType,
            Q1: surveyData.Q1,
            Q2: surveyData.Q2,
            Q3: surveyData.Q3,
            Q4: surveyData.Q4,
            Q5: surveyData.Q5,
            Created:surveyData.timeStamp,
          }));
            setSurveyData(surveyProcessed);
            console.log(surveyData);
        } catch (error) {
            console.log("error", error);
            setSurveyData([]);
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
        const cId = searchParams.get("contactId")
        if(cId){
            setSearchKey(cId);
            setTimeout(function(){
             getSurveyHistory(searchkey);
            },500)
        }
    }, [searchkey]);
    let surveyList = <SurveyTable data={surveyData}/>;
    return (
        <div className='content-container surveys'>
            <h2>Survey History</h2> 
            <div>
                <label htmlFor="search">Search</label><br></br>
                <input name="search" onChange={(e) => handleChange(e)} type="text" placeholder='Contactid/Phone Number' />
                <button className="search-button" onClick={()=>getSurveyHistory(searchkey)}>Search</button>
                <select class="type-filter" name="type" id="type" onChange={(e) => handleTypeChange(e)}>
                    <option value="contactId">Contact Id</option>
                    <option value="contactNumber">Phone Number</option>
                </select>
            </div>
            {surveyData.length > 0? surveyList:isSearch?<span>No data found</span>:<></>}
        </div>
    )
}

export default SurveyHistory;
