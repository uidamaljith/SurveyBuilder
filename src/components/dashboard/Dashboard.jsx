import React,{ useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Link} from 'react-router-dom';

import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import ScoreTrend from '../scoretrend/ScoreTrend';
import QuestionsTable from './Questions';
import './dashboard.scss';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#80BFFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
};

const Tab = styled(TabUnstyled)`
    background-color: white;
    color: #009688;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    &:hover {
        color: #fff;
      background-color: #00bfad;
      
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      color: #fff;
      outline: none;
      
    }
  
    &.${tabUnstyledClasses.selected} {
      background-color: #009688;
      color: white;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

const TabPanel = styled(TabPanelUnstyled)`
    font-size: 0.875rem;
  `;

const TabsList = styled(TabsListUnstyled)`
    
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
  `;




function Dashboard() {

    const [monthDetails, setMonthDetails] = React.useState('');
    const [surveyId, setSurveyId] = React.useState('');
    const [questionsDetails, setQuestionsDetails] = React.useState('');
    const [loading,setLoading] = React.useState(true);
    const [surveyDetails, setSurveyDetails] = React.useState([]);
    const [surveyOverView, setSurveyOverView] = React.useState([]);
    const [viewTrend, setViewTrend] = React.useState(false);
    const handleChangeSurvey = (event) => {
        setSurveyId(event.target.value);
        console.log(event.target.value);
    };
    const handleChangeMonth = (event) => {
        setMonthDetails(event.target.value);
        console.log(event.target.value);
    };
    useEffect(() => {
        fetchData(surveyId,monthDetails);
    }, [surveyId,monthDetails]);
    const baseUrl = 'https://y97ci5zkbh.execute-api.us-east-1.amazonaws.com/Prod/';
    const fetchQuestionsData = async () => {
        const surveyUrl = `${baseUrl}getAllSurveyData`
        try {
            const response = await fetch(surveyUrl);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            const surveyProcessed = data.map(surveyData => ({ id: surveyData.id,
                name:  surveyData.surveyName, 
              }));
            setSurveyDetails(surveyProcessed);
            setLoading(false);
            console.log(surveyProcessed);
        } catch (error) {
            console.log("error", error);
        }
    };
    const fetchOverviewData = async () => {
        const surveyUrl = `${baseUrl}dummyDashboardGetOverview`
        try {
            const response = await fetch(surveyUrl);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            setSurveyOverView(data);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchOverviewData();
        fetchQuestionsData();
      }, []);

    const fetchData = async (surveyId,month) => {
        const url = `${baseUrl}dashboardGetQuestion/${surveyId}?month=${month}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.message);
            setQuestionsDetails(json.message);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData('','12');
      }, []);
      const showTrend = () =>{
        setViewTrend(true);
      }
      const onBackClick = () =>{
        setViewTrend(false);
      }
      const renderSelectOptions = () => {
        let els = [];
      
        for (let i = 0; i < surveyDetails.length; i++) {
          els.push(<MenuItem value={surveyDetails[i].id} key={i}>{surveyDetails[i].name}</MenuItem>);
        }
      
        return els;
      };

      const renderOverview = () => {
        let els = [];
      
        for (let i = 0; i < surveyOverView.length; i++) {
          els.push(
            <Card component="form" noValidate autoComplete="off">
            <CardContent>

                <h3>{surveyOverView[i].questionType}</h3>
                <div className="score-content happy">
                    <div className='score-smile'>
                        {parseInt(surveyOverView[i].score) > 60 && <SentimentSatisfiedAltIcon style={{ color: "green" }} fontSize='large' />}
                        {(parseInt(surveyOverView[i].score) >= 41 && parseInt(surveyOverView[i].score) <= 60) && <SentimentSatisfiedIcon style={{ color: "orange" }} fontSize='large' />}
                        {parseInt(surveyOverView[i].score) <= 40 && <SentimentVeryDissatisfiedIcon style={{ color: "red" }} fontSize='large' />}
                        <div className='score-card'>
                        <h4>{surveyOverView[i].score}</h4>
                        <span>Score</span>
                    </div>
                    </div>
                    <div className='score-card'>
                        <h4>{surveyOverView[i].totalPositiveScore}</h4>
                        <span>Positive</span>
                    </div>
                    <div className='score-card'>
                        <h4>{surveyOverView[i].totalNeutralScore}</h4>
                        <span>Neutral</span>
                    </div>
                    <div className='score-card'>
                        <h4>{surveyOverView[i].totalNegativeScore}</h4>
                        <span>Negative</span>
                    </div>
                    <div className='score-card'>
                        <h4>{surveyOverView[i].totalResponse}</h4>
                        <span>Responses</span>
                    </div>
                    <div className='score-card'>
                        <a href="#" onClick={showTrend}>View Trend</a>
                        {/* <Link to="/AgentRating">View Trend</Link> */}
                    </div>
                </div>

            </CardContent>
            </Card>
          );
        }
      
        return els;
      };
      let scoretrend;
    if (loading) {
        return <>Still loading...</>;
    }else{
        if(viewTrend){
            scoretrend = <ScoreTrend />
        }
    }
    return (
        <div className='content-container dashboard'>
             <button onClick={onBackClick} className="back-button">
                <ArrowBackIcon />
            </button>
            {!viewTrend &&             <>
            <div className='section-header'>
                <h2>Dashboard</h2>
            </div>
            <div className="section-content">
                
                        <div className="dashboard-filter">
                            <div className="form-field-group">
                                
                                <label>Month Selector</label>
                                <Box sx={{ minWidth: 300 }}>
                                    
                                    <FormControl fullWidth>
                                        <InputLabel id="MonthSelector">Select a Period</InputLabel>
                                        <Select
                                            labelId="MonthSelector"
                                            id="Month"
                                            value={monthDetails}
                                            label="Month Selector"
                                            onChange={handleChangeMonth}
                                        >
                                            <MenuItem value={12}>Last 12 Months</MenuItem>
                                            <MenuItem value={6}>Last 6 Months</MenuItem>
                                            <MenuItem value={3}>Last 3 Months</MenuItem>
                                            <MenuItem value={1}>Last 1 Months</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="form-field-group">
                                <label>Survey Name</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="SurveyName">Select a Survey</InputLabel>
                                        <Select
                                            labelId="surveyname"
                                            id="Survey"
                                            value={surveyId}
                                            label="Survey Name"
                                            onChange={handleChangeSurvey}
                                        >
                                            {
                                                renderSelectOptions()
                                            }
                                            {/* <MenuItem value={10}>Customer Satisfaction Score</MenuItem>
                                            <MenuItem value={20}>Promoter Score</MenuItem>
                                            <MenuItem value={30}>Effort Score</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                    

            </div>
            <div className="section-content">
              
                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        <Tab>Overview</Tab>
                        <Tab>Questions</Tab>
                    </TabsList>
                    <TabPanel value={0}>
                        {renderOverview()}
                    </TabPanel>
                    <TabPanel value={1}>
                        <QuestionsTable data={questionsDetails}></QuestionsTable>
                    </TabPanel>

                </TabsUnstyled>


                
            </div>
            </>}


            {scoretrend}
        </div>

    )
}

export default Dashboard;
