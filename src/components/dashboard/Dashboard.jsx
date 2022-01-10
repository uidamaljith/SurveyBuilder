import React from 'react';
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

import QuestionsTable from './Questions';
import './dashboard.scss';

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

    const [monthselector, setmonthselector] = React.useState('');
    const [surveyname, setsurveyname] = React.useState('');

    const handleChange = (event) => {
        setmonthselector(event.target.value);
        setsurveyname(event.target.value);
    };

    return (
        <div className='content-container dashboard'>
            <div className='section-header'>
                <h2>Dashboard</h2>
            </div>
            <div className="section-content">
                
                        <div className="dashboard-filter">
                            <div className="form-field-group">
                                {/* <label>Question Type</label> */}
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="MonthSelector">Month Selector</InputLabel>
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
                                {/* <label>Question Type</label> */}
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="SurveyName">Survey Name</InputLabel>
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

                <TabsUnstyled defaultValue={0}>
                    <TabsList>
                        <Tab>Overview</Tab>
                        <Tab>Questions</Tab>

                    </TabsList>
                    <TabPanel value={0}>

                        <Card component="form" noValidate autoComplete="off">
                            <CardContent>

                                <h3>CSAT (Customer Satisfaction Score)</h3>
                                <div className="score-content happy">
                                    <div className='score-smile'>
                                        <SentimentSatisfiedAltIcon style={{ color: "green" }} fontSize='large' />
                                    </div>
                                    <div className='score-card'>
                                        <h4>75%</h4>
                                        <span>Score</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>20%</h4>
                                        <span>Neutral</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>5%</h4>
                                        <span>Negative</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>1,233</h4>
                                        <span>Responses</span>
                                    </div>
                                    <div className='score-card'>
                                        <Link to="/AgentRating">View Trend</Link>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                        <Card component="form" noValidate autoComplete="off">
                            <CardContent>

                                <h3>CSAT (Customer Satisfaction Score)</h3>
                                <div className="score-content avarge">
                                    <div className='score-smile'>
                                        <SentimentSatisfiedIcon style={{ color: "orange" }} fontSize='large' />
                                    </div>
                                    <div className='score-card'>
                                        <h4>75%</h4>
                                        <span>Score</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>20%</h4>
                                        <span>Neutral</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>5%</h4>
                                        <span>Negative</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>1,233</h4>
                                        <span>Responses</span>
                                    </div>
                                    <div className='score-card'>
                                        <Link to="/AgentRating">View Trend</Link>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                        <Card component="form" noValidate autoComplete="off">
                            <CardContent>

                                <h3>CSAT (Customer Satisfaction Score)</h3>
                                <div className="score-content sad">
                                    <div className='score-smile'>
                                        <SentimentVeryDissatisfiedIcon style={{ color: "red" }} fontSize='large' />
                                    </div>
                                    <div className='score-card'>
                                        <h4>75%</h4>
                                        <span>Score</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>20%</h4>
                                        <span>Neutral</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>5%</h4>
                                        <span>Negative</span>
                                    </div>
                                    <div className='score-card'>
                                        <h4>1,233</h4>
                                        <span>Responses</span>
                                    </div>
                                    <div className='score-card'>
                                        <Link to="/AgentRating">View Trend</Link>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                    </TabPanel>
                    <TabPanel value={1}><Card component="form" noValidate autoComplete="off">
                        <CardContent>

                            <QuestionsTable></QuestionsTable>

                        </CardContent>
                    </Card></TabPanel>

                </TabsUnstyled>


            </div>

        </div>
    )
}

export default Dashboard;
