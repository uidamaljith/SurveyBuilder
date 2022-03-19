import React, {useEffect } from 'react';
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
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { v4 as uuidv4 } from 'uuid';
const NewSurvey = props =>{

    const [score, setScore] = React.useState('');
    const [scale, setScale] = React.useState('');
    const [surveyNameValid, setSurveyNameValid] = React.useState(false);
    const [welcomeMessageValid, setWelcomeMessageValid] = React.useState(false);
    const [closingMessageValid, setClosingMessageValid] = React.useState(false);
    const [questionValues,setQuestionValues]=React.useState(props.formValue.Questions);
    const [formValues, setFormValues] = React.useState(props.formValue);
    const [validation, setValidation] = React.useState({
        "surveyNameError": '', 
        "welcomeMessageError": '', 
        "closingMessageError": '', 
    });
    const [requiredValidation,setRequiredValidation] = React.useState(true);
    const [validationStatus,setValidationStatus] = React.useState(true);
      const checkValidation = () => {
        //let errors = validation;
        let surveyNameError = '';
        let welcomeMessageError = '';
        let closingMessageError ='';
        let questionNameError ='';
        let question = formValues.Questions.find(element=>{
            return element.question === '';
        })
        if(question){
            questionNameError = "Please enter a question"
        }
        //first Name validation
        if (formValues.surveyName.trim()) {
            if(formValues.surveyName.length < 5){
                surveyNameError = "surveyName name must be >= 5";
            }
        }else{
            surveyNameError = "Please eneter survey name";
        }
        if (formValues.welcomeMessage.trim()) {
            if(formValues.welcomeMessage.length < 5){
                welcomeMessageError = "welcomeMessage must be >= 5";
            }
          //setValidationStatus(false);
        } else{
            welcomeMessageError = "Please enter welcome message";
        }
        if (formValues.closingMessage.trim()) {
            if(formValues.closingMessage.length < 5){
                closingMessageError = "closingMessage must be >= 5";
            }
          } 
          else{
            closingMessageError = "Please enter closing message";
          }
        if (questionNameError || surveyNameError || welcomeMessageError || closingMessageError) {
            setValidation({questionNameError,surveyNameError,welcomeMessageError,closingMessageError});
            return false;
          }
          return true;

      };
      React.useEffect(() => {
        
      }, [formValues]);

    //   useEffect(() => {
    //     checkValidation();
    //   }, [formValues]);
    
    let handleChange = (i, e) => {
        let newFormValues = [...questionValues];
        newFormValues[i][e.target.name] = e.target.value;
        setQuestionValues(newFormValues);
        if(!e.target.value){
            setValidation(prevValidation=>{
                return{
                    ...prevValidation,
                    "questionNameError":'Please enter the question.'
                }
            })
        }
        setFormValues(prevSurvey=>{
            return{
                ...prevSurvey,
                'Questions':questionValues
            }
        });
      }
    let addFormFields = () => {
        if(props.editStatus){
            setQuestionValues([...questionValues, {questionId:uuidv4(),questionNo:questionValues.length+1,question: "", questionType : "CES",minScale:1,maxScale:5}])
        }else{
            setQuestionValues([...questionValues, {questionNo:questionValues.length+1,question: "", questionType : "CES",minScale:1,maxScale:5}])
        }

        setFormValues(prevSurvey=>{
            return{
                ...prevSurvey,
                'Questions':questionValues
            }
        });
    }
    let submitNewSurvey = (event) => {
        event.preventDefault();
        if (checkValidation()) {
            // alert(JSON.stringify(formValues));
             props.onAdd(JSON.stringify(formValues));
           
        }
    }
    let deleteQuestions = (event,i) => {
        event.preventDefault();
        let questions = [...questionValues];
        questions.splice(i, 1);
        questions.map((qstn, index) => {
            qstn.questionNo = index+1;
        });
        console.log(questions);
        setQuestionValues(questions);
        setFormValues(prevSurvey=>{
            return{
                ...prevSurvey,
                'Questions':questions
            }
        });
    }
    let reArrangeQuestions = (event,i,upward) => {
        event.preventDefault();
        let questions = [...questionValues];
        if(upward){
            [questions[i-1], questions[i]] = [questions[i], questions[i-1]];
        }else{
            [questions[i], questions[i+1]] = [questions[i+1], questions[i]];
        }
        questions.map((qstn, index) => {
            qstn.questionNo = index+1;
        });
        console.log(questions);
        setQuestionValues(questions);
        setFormValues(prevSurvey=>{
            return{
                ...prevSurvey,
                'Questions':questions
            }
        });
    }
    let handleFormChange =(event)=>{
        const {name,value} = event.target;
            //setRequiredValidation(false);
            // eslint-disable-next-line default-case
        switch (name){
            case 'surveyName':
                if(value !== ''){
                    //setSurveyNameValid(false);
                    setValidation(prevValidation=>{
                        return{
                            ...prevValidation,
                            "surveyNameError":''
                        }
                    })
                }
                break;
            case 'welcomeMessage':
                if(value !== ''){
                    //setSurveyNameValid(false);
                    setValidation(prevValidation=>{
                        return{
                            ...prevValidation,
                            "welcomeMessageError":''
                        }
                    })
                }
                break;
            case 'closingMessage':
                if(value !== ''){
                    //setSurveyNameValid(false);
                    setValidation(prevValidation=>{
                        return{
                            ...prevValidation,
                            "closingMessageError":''
                        }
                    })
                }
                break;
            default:
                //


        }
        // if(name === 'surveyName'){

        // }
        setFormValues(prevSurvey=>{
            return{
                ...prevSurvey,
                [name]:value
            }
        });
    }

    return (

        <form onSubmit={submitNewSurvey}>
        <button onClick={props.onBackClick}><ArrowBackIcon /></button>
        <div className='content-container surveys'>
            <div className='section-header'>
                <h2>New Survey</h2>
                <Button disabled={!validationStatus} type="submit" value="Submit" variant="contained">Save</Button>
            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off" >
                    <CardContent>
                        <TextField  label="Survey Name" required maxlength="10" name="surveyName" variant="outlined" value={formValues.surveyName} onChange={e => handleFormChange(e)}/>
                    </CardContent>
                    <span className="text-danger">{validation.surveyNameError}</span>
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
                            <TextareaAutosize name="welcomeMessage" onChange={e => handleFormChange(e)} value={formValues.welcomeMessage} fullWidth variant="outlined" />
                        </div>
                        <span className="text-danger">{validation.welcomeMessageError}</span>
                    </div>

                </Card>
            </div>

            <div className='section-header'>
                <h2>Primary Question</h2>

            </div>
            <div className="section-content">
                <Card component="form" noValidate autoComplete="off">
                {questionValues.map((element, index) => (
                                        <div className="icon-with-form form-inline" key={index}>
                                        <div className="icon"><span>Q{index+1}</span>&nbsp;
                                        {index > 0 && <button  onClick={e => deleteQuestions(e,index)}><DeleteIcon /></button>}
                                        {index > 0 &&
                                        <>

                                            {index > 1 && <button  onClick={e => reArrangeQuestions(e,index,true)}><ArrowUpwardIcon /></button>}
                                            {index+1 < questionValues.length && <button  onClick={e => reArrangeQuestions(e,index,false)}><ArrowDownwardIcon /></button>}

                                        </>

                                        }
                                        </div>

                                        <div className="form-field-group">
                                            <label>Question</label>
                                            
                                                <TextField id="QuestionName" name='question' variant="outlined" value={element.question} onChange={e => handleChange(index, e)}/>
                                            
                                        </div>
                                        <div className="form-field-group">
                                            <label>Question Type</label>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="Score">Score</InputLabel>
                                                    <Select
                                                        labelId="Score"
                                                        id="demo-simple-select"
                                                        name='questionType'
                                                        label="Score"
                                                        value={index > 0 ? formValues.surveyName !== ''?element.questionType:'PS':formValues.surveyName !== ''?element.questionType:'CSAT'}
                                                        onChange={e => handleChange(index, e)}
                                                    >
                                                        {index < 1 && <MenuItem value='CSAT'>Customer Satisfaction Score</MenuItem>}
                                                        {index < 1 && <MenuItem value='CES'>Customer Effort Score</MenuItem>}
                                                        {index < 1 && <MenuItem value='NPS'>Net Promoter Score</MenuItem>}
                                                        {index >= 1 && <MenuItem value='PS'>Point Scale</MenuItem>}
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
                                                        name='minScale'
                                                        label="scale"
                                                        value='10'
                                                        onChange={e => handleChange(index, e)}
                                                    >
                                                        <MenuItem value={10}>1-5</MenuItem>
                                                       
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </div>
                                    </div>
                ))}


                </Card>
                <span>{validation.questionNameError}</span>
            </div>

            <div className='section-header'>
                <h2>Additional Questions</h2>

            </div>
            <div className="section-content add-question">
                <Card component="form" noValidate autoComplete="off">
                {
                    questionValues.length < 5 && <Button variant="outlined" onClick={() => addFormFields()}><span>+</span>ADD QUESTION</Button>
                }

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
                            <TextareaAutosize name="closingMessage" onChange={e => handleFormChange(e)} value={formValues.closingMessage} fullWidth variant="outlined" />
                        </div>
                        <span className="text-danger">{validation.closingMessageError}</span>
                    </div>

                </Card>
            </div>
            <div className='section-footer'>
                
                    <Button variant="contained" onClick={submitNewSurvey}>Save</Button>
            </div>

        </div>
        </form>

    )
}

export default NewSurvey;