import * as React from 'react';
import './newsurvey.scss';
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


function NewSurvey() {

    const [score, setScore] = React.useState('');
    const [scale, setScale] = React.useState('');

    const handleChange = (event) => {
        setScore(event.target.value);
        setScale(event.target.value);
    };


    return (
        <div className='content-container surveys'>
            <div className='section-header'>
                <h2>New Survey</h2>
                <Button variant="contained">Save</Button>
            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off" >
                    <CardContent>
                        <TextField id="SurveyName" label="Survey Name" variant="outlined"/>
                    </CardContent>
                </Card>
            </div>

            <div className='section-header'>
                <h2>Welcome Message</h2>

            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off">

                    <div className="icon-with-form">
                        <div className="icon"><ChatBubbleOutlineIcon /></div>
                        <div className="form-field-group">
                            <label>Message</label>
                            <TextareaAutosize fullWidth id="SurveyName" variant="outlined" placeholder='Thank you for taking the time to complete the survey. We value your opinion. By pressing the numbers on your keypad, please 
rate on a scale of 1 to 5 where 1 is poor and 5 is excellent. If you would like to have the question repeated, press *.' />
                        </div>
                    </div>

                </Card>
            </div>

            <div className='section-header'>
                <h2>Primary Question</h2>

            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off">

                    <div className="icon-with-form">
                        <div className="icon"><span>Q1</span></div>
                        <div className="form-field-group">
                            <label>Message</label>
                            
                                <TextField id="SurveyName" label="Survey Name" variant="outlined" />
                            
                        </div>
                        <div className="form-field-group">
                            <label>Question Type</label>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="Score">Score</InputLabel>
                                    <Select
                                        labelId="Score"
                                        id="demo-simple-select"
                                        value={score}
                                        label="Score"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Customer Satisfaction Score</MenuItem>
                                        <MenuItem value={20}>Promoter Score</MenuItem>
                                        <MenuItem value={30}>Effort Score</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="form-field-group">
                            <label>Message</label>
                            <Box sx={{ maxWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="Scale">scale</InputLabel>
                                    <Select
                                        labelId="Scale"
                                        id="demo-simple-select"
                                        value={scale}
                                        label="scale"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>1-5</MenuItem>
                                        <MenuItem value={20}>5-10</MenuItem>
                                        <MenuItem value={30}>10-15</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>

                </Card>
            </div>

            <div className='section-header'>
                <h2>Additional Questions</h2>

            </div>
            <div className="section-content add-question">
                <Card component="form" noValidate autoComplete="off">

                <Button variant="outlined"><span>+</span>ADD QUESTION</Button>

                </Card>
            </div>
            <div className='section-header'>
                <h2>Closing Message</h2>
            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off">

                    <div className="icon-with-form">
                        <div className="icon"><ChatBubbleOutlineIcon /></div>
                        <div className="form-field-group">
                            <label>Message</label>
                            <TextareaAutosize fullWidth id="SurveyName" variant="outlined" placeholder='Thank you for taking the time to complete the survey. We value your opinion. By pressing the numbers on your keypad, please 
rate on a scale of 1 to 5 where 1 is poor and 5 is excellent. If you would like to have the question repeated, press *.' />
                        </div>
                    </div>

                </Card>
            </div>
            <div className='section-footer'>
                
                    <Button variant="contained">Save</Button>
                
            </div>

        </div>
    )
}

export default NewSurvey;