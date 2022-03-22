import React,{useEffect} from 'react';
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

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { red,green } from "@mui/material/colors";

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';

import './ScoreTrend.scss';

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




function ScoreTrend() {

    const [monthselector, setMonthselector] = React.useState('');
    const [surveyname, setSurveyname] = React.useState('');
    const [bymonth, setBymonth] = React.useState('');
    const [scoreTrend, setScoreTrend] = React.useState('');
    const handleChange = (event) => {
        setMonthselector(event.target.value);
        setSurveyname(event.target.value);
        setBymonth(event.target.value);
    };
    const url = "https://y97ci5zkbh.execute-api.us-east-1.amazonaws.com/Prod/dummyDashboardGetTrend";
    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.message);
            setScoreTrend(json.message);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchData();
      }, []);

      const renderTrend = () => {
        let els = [];
      
        for (let i = 0; i < scoreTrend.length; i++) {
          els.push(
            <div className="scoretrend-row">
                <div className='score-month'>{scoreTrend[i].date}</div>
                <div className='score-percentage'>{scoreTrend[i].totalPositiveScore}</div>
                <div className='score-diff diff-nutral'>{parseInt(scoreTrend[i].difference)>=0 ? <ArrowUpwardIcon sx={{ color: green[300] }}/>:<ArrowDownwardIcon sx={{ color: red[300] }}/> }<span>{Math.abs(parseInt(scoreTrend[i].difference))}%</span></div>
                <div className='score-graph'>
                    <div className="positive" style={{width:scoreTrend[i].totalPositiveScore}}></div>
                    <div className="avarage" style={{width:scoreTrend[i].totalNeutralScore}}></div>
                    <div className="negative" style={{width:scoreTrend[i].totalNegativeScore}}></div>
                </div>
            </div>
          );
        }
      
        return els;
      };
    return (
        <div className='content-container dashboard'>
            <div className='section-header'>
                <h2>Dashboard</h2>
            </div>
            <div className="section-content">
                
                        <div className="dashboard-filter">
                            <div className="form-field-group">
                                <label>Month Selector</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="MonthSelector">Month Selector</InputLabel> */}
                                        <Select
                                            labelId="MonthSelector"
                                            id="Month"
                                            value={monthselector}
                                            label="Month Selector"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Last 12 Months</MenuItem>
                                            <MenuItem value={20}>Last 6 Months</MenuItem>
                                            <MenuItem value={30}>Last 3 Months</MenuItem>
                                            <MenuItem value={30}>Last 1 Months</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="form-field-group">
                                <label>By Month</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="ByMonth">By Month</InputLabel> */}
                                        <Select
                                            labelId="ByMonth"
                                            id="Month"
                                            value={bymonth}
                                            label="By Month"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>By Month</MenuItem>
                                            <MenuItem value={20}>January</MenuItem>
                                            <MenuItem value={30}>February</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className="form-field-group">
                                <label>Survey Name</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="SurveyName"></InputLabel> */}
                                        <Select
                                            labelId="surveyname"
                                            id="Survey"
                                            value={surveyname}
                                            label="Survey Name"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>Customer Satisfaction Score</MenuItem>
                                            <MenuItem value={20}>Promoter Score</MenuItem>
                                            <MenuItem value={30}>Effort Score</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                   

            </div>
            <div className="section-content">
            <Card component="form" noValidate autoComplete="off">
                    <CardContent>

                        {
                            renderTrend()
                        }

                        {/*<div className="scoretrend-row">
                            <div className='score-month'>Dec 2021</div>
                            <div className='score-percentage'>85%</div>
                            <div className='score-diff diff-nutral'>0%</div>
                            <div className='score-graph'>
                                <div className="positive" style={{width:'60%'}}></div>
                                <div className="avarage" style={{width:'30%'}}></div>
                                <div className="negative" style={{width:'10%'}}></div>
                            </div>
                        </div>
                         <div className="scoretrend-row">
                            <div className='score-month'>Nov</div>
                            <div className='score-percentage'>85%</div>
                            <div className='score-diff diff-positive'>3%</div>
                            <div className='score-graph'>
                                <div className="positive" style={{width:'50%'}}></div>
                                <div className="avarage" style={{width:'30%'}}></div>
                                <div className="negative" style={{width:'20%'}}></div>
                            </div>
                        </div>
                        <div className="scoretrend-row">
                            <div className='score-month'>Oct</div>
                            <div className='score-percentage'>85%</div>
                            <div className='score-diff diff-negative'>2%</div>
                            <div className='score-graph'>
                                <div className="positive" style={{width:'80%'}}></div>
                                <div className="avarage" style={{width:'10%'}}></div>
                                <div className="negative" style={{width:'10%'}}></div>
                            </div>
                        </div>
                        <div className="scoretrend-row">
                            <div className='score-month'>Sep</div>
                            <div className='score-percentage'>85%</div>
                            <div className='score-diff diff-nutral'>0%</div>
                            <div className='score-graph '>
                                <div className="positive" style={{width:'70%'}}></div>
                                <div className="avarage" style={{width:'20%'}}></div>
                                <div className="negative" style={{width:'10%'}}></div>
                            </div>
                        </div> */}

                    </CardContent>
            </Card>
            </div>
            

        </div>
    )
}

export default ScoreTrend;