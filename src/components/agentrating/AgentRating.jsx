import React,{useEffect} from 'react';
import Button from '@mui/material/Button';
import { color } from '@mui/system';
import AgentTable from './AgentTable';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './agentrating.scss';


const AgentRating = () => {
    const [monthselector, setMonthselector] = React.useState('');
    const [surveyname, setSurveyname] = React.useState('');
    const [bymonth, setBymonth] = React.useState('');
    const [surveyId, setSurveyId] = React.useState('1');
    const [loading,setLoading] = React.useState(true);
    const [surveyDetails, setSurveyDetails] = React.useState([]);

    const handleChange = (event) => {
        setMonthselector(event.target.value);
        setSurveyname(event.target.value);
        setBymonth(event.target.value);
    };
    const baseUrl = 'https://y97ci5zkbh.execute-api.us-east-1.amazonaws.com/Prod/';
    const fetchSurveyData = async () => {
        const surveyUrl = `${baseUrl}getAllSurveyData`
        try {
            const response = await fetch(surveyUrl);
            const json = await response.json();
            console.log(json.message);
            let data = json.message;
            const surveyProcessed = data.map(surveyData => ({ id: surveyData.id,
                name:  surveyData.surveyName, 
              }));
              surveyProcessed.unshift({ id: '1',
                name:  'All',
              })
            setSurveyDetails(surveyProcessed);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        fetchSurveyData();
      }, []);
    const renderSelectOptions = () => {
        let els = [];
      
        for (let i = 0; i < surveyDetails.length; i++) {
          els.push(<MenuItem value={surveyDetails[i].id} key={i}>{surveyDetails[i].name}</MenuItem>);
        }
      
        return els;
      };
    return (
        <div className='content-container surveys'>
            <div className='section-header'>
                <h2>Agent Rating</h2>
                <Button variant="contained">Download</Button>
            </div>
            <div className="section-content">
                
                        <div className="dashboard-filter">
                            <div className="form-field-group">
                                <label>Time Period</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="MonthSelector">Month Selector</InputLabel> */}
                                        <Select
                                            labelId="MonthSelector"
                                            id="Month"
                                            value={12}
                                            // label="Month Selector"
                                            onChange={handleChange}
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
                                <label>Trend</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="ByMonth">By Month</InputLabel> */}
                                        <Select
                                            labelId="ByMonth"
                                            id="Month"
                                            value={10}
                                            // label="By Month"
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
                                <label>Select Survey Name</label>
                                <Box sx={{ minWidth: 300 }}>
                                    <FormControl fullWidth>
                                        {/* <InputLabel id="SurveyName">Survey Name</InputLabel> */}
                                        <Select
                                            labelId="surveyname"
                                            id="Survey"
                                            value={surveyId}
                                            // label="Survey Name"
                                            onChange={handleChange}
                                        >
                                            {renderSelectOptions()}
                                            {/* <MenuItem value={10}>Customer Satisfaction Score</MenuItem>
                                            <MenuItem value={20}>Promoter Score</MenuItem>
                                            <MenuItem value={30}>Effort Score</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                   

            </div>
            <Card sx={{ minWidth: 275 }}>
                
                    <AgentTable />
                
            </Card>


        </div>
    )
}

export default AgentRating;