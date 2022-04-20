import React from "react";
import "./newsurvey.scss";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { v4 as uuidv4 } from "uuid";
const NewSurvey = (props) => {
  const [is_nps, setNps] = React.useState(false);
  const [questionValues, setQuestionValues] = React.useState(
    props.formValue.Questions
  );
  const [formValues, setFormValues] = React.useState(props.formValue);
  const [validation, setValidation] = React.useState({
    surveyNameError: "",
    welcomeMessageError: "",
    closingMessageError: "",
  });
  const [validationStatus, setValidationStatus] = React.useState(true);
  const checkValidation = () => {
    //let errors = validation;
    let surveyNameError = "";
    let welcomeMessageError = "";
    let closingMessageError = "";
    let questionNameError = "";
    let question = formValues.Questions.find((element) => {
      return element.question === "";
    });
    if (question) {
      questionNameError = "Please enter a question";
    }
    //first Name validation
    if (!formValues.surveyName.trim()) {
      surveyNameError = "Please enter survey name";
    }
    if (!formValues.welcomeMessage.trim()) {
      welcomeMessageError = "Please enter welcome message";
    }
    if (!formValues.closingMessage.trim()) {
      closingMessageError = "Please enter closing message";
    }
    if (
      questionNameError ||
      surveyNameError ||
      welcomeMessageError ||
      closingMessageError
    ) {
      setValidation({
        questionNameError,
        surveyNameError,
        welcomeMessageError,
        closingMessageError,
      });
      return false;
    }
    return true;
  };
  React.useEffect(() => {}, [formValues]);

  //   useEffect(() => {
  //     checkValidation();
  //   }, [formValues]);

  let handleChange = (i, e) => {
    let newFormValues = [...questionValues];
    newFormValues[i][e.target.name] = e.target.value;
    if(e.target.value === "NPS" && i === 0){
      setNps(true);
      newFormValues = newFormValues.slice(0,1);
      setQuestionValues(newFormValues);
      setFormValues((prevSurvey) => {
        return {
          ...prevSurvey,
          Questions: newFormValues,
        };
      }); 
    }else{
      setNps(false);
      setQuestionValues(newFormValues);
      setFormValues((prevSurvey) => {
        return {
          ...prevSurvey,
          Questions: questionValues,
        };
      });
    }

  

    if (!e.target.value) {
      setValidation((prevValidation) => {
        return {
          ...prevValidation,
          questionNameError: "",
        };
      });
    }

  };
  let addFormFields = () => {
    if (props.editStatus) {
      setQuestionValues([
        ...questionValues,
        {
          questionId: uuidv4(),
          questionNo: questionValues.length + 1,
          question: "",
          questionType: "PS",
          minScale: 1,
          maxScale: 5,
        },
      ]);
    } else {
      setQuestionValues([
        ...questionValues,
        {
          questionNo: questionValues.length + 1,
          question: "",
          questionType: "PS",
          minScale: 1,
          maxScale: 5,
        },
      ]);
    }

    setFormValues((prevSurvey) => {
      return {
        ...prevSurvey,
        Questions: questionValues,
      };
    });
  };
  let submitNewSurvey = (event) => {
    event.preventDefault();
    if (checkValidation()) {
      // alert(JSON.stringify(formValues));
      props.onAdd(JSON.stringify(formValues));
    }
  };
  let deleteQuestions = (event, i) => {
    event.preventDefault();
    let questions = [...questionValues];
    questions.splice(i, 1);
    questions.map((qstn, index) => {
      qstn.questionNo = index + 1;
    });
    console.log(questions);
    setQuestionValues(questions);
    setFormValues((prevSurvey) => {
      return {
        ...prevSurvey,
        Questions: questions,
      };
    });
  };
  let reArrangeQuestions = (event, i, upward) => {
    event.preventDefault();
    let questions = [...questionValues];
    if (upward) {
      [questions[i - 1], questions[i]] = [questions[i], questions[i - 1]];
    } else {
      [questions[i], questions[i + 1]] = [questions[i + 1], questions[i]];
    }
    questions.map((qstn, index) => {
      qstn.questionNo = index + 1;
    });
    console.log(questions);
    setQuestionValues(questions);
    setFormValues((prevSurvey) => {
      return {
        ...prevSurvey,
        Questions: questions,
      };
    });
  };
  let handleFormChange = (event) => {
    const { name, value } = event.target;
    // eslint-disable-next-line default-case
    switch (name) {
      case "surveyName":
        if (value !== "") {
          setValidation((prevValidation) => {
            return {
              ...prevValidation,
              surveyNameError: "",
            };
          });
        }
        break;
      case "welcomeMessage":
        if (value !== "") {
          setValidation((prevValidation) => {
            return {
              ...prevValidation,
              welcomeMessageError: "",
            };
          });
        }
        break;
      case "closingMessage":
        if (value !== "") {
          setValidation((prevValidation) => {
            return {
              ...prevValidation,
              closingMessageError: "",
            };
          });
        }
        break;
      default:
      //
    }
    // if(name === 'surveyName'){

    // }
    setFormValues((prevSurvey) => {
      return {
        ...prevSurvey,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={submitNewSurvey}>
      <div className="section-header survey-primary">
        <button onClick={props.onBackClick} className="back-button">
          <ArrowBackIcon />
        </button>
        <h2>New Survey</h2>
        <Button
          disabled={!validationStatus}
          type="submit"
          value="Submit"
          variant="contained"
          className="save-survey"
        >
          Save
        </Button>
      </div>
      <div className="section-content survey-name">
        <Card component="form" noValidate autoComplete="off">
          <CardContent>
            <label>Survey Name</label>
            <TextField
              //label="Add Survey Name"
              required
              maxlength="10"
              name="surveyName"
              variant="outlined"
              value={formValues.surveyName}
              onChange={(e) => handleFormChange(e)}
            />
            <span className="text-danger">{validation.surveyNameError}</span>
          </CardContent>
          
        </Card>
      </div>

      <div className="section-header">
        <h2>Welcome Message</h2>
      </div>
      <div className="section-content">
        <Card component="form" noValidate autoComplete="off">
          
          <div className="icon-with-form">
            <div className="icon">
              <ChatBubbleOutlineIcon />
            </div>
            <div className="form-field-group text-message">
              <label>Message</label>
              <TextareaAutosize
                name="welcomeMessage"
                onChange={(e) => handleFormChange(e)}
                value={formValues.welcomeMessage}
                fullWidth
                variant="outlined"
                disabled="true"
              />
              <span className="text-danger">
                {validation.welcomeMessageError}
              </span>
            </div>
            
          </div>
        </Card>
      </div>
      <div className="section-header">
        <h2>Primary Question</h2>
      </div>
      {questionValues.map((element, index) => (
        <div className="section-content">
          {(index === 1 && (questionValues[0].questionType !=='NPS')) &&  <h2>Additional Question</h2>}
          {(index ===0 || (!is_nps && questionValues[0].questionType !=='NPS' )) && 
                      <Card component="form" noValidate autoComplete="off">
                      <div className="icon-with-form form-inline" key={index}>
                        <div className="icon ">
                          <div className="mover">
                            {index > 0 && (
                              <>
                                {index > 1 && (
                                  <button
                                    onClick={(e) => reArrangeQuestions(e, index, true)}
                                  >
                                    <ArrowUpwardIcon />
                                  </button>
                                )}
                                {index + 1 < questionValues.length && (
                                  <button
                                    onClick={(e) => reArrangeQuestions(e, index, false)}
                                  >
                                    <ArrowDownwardIcon />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
          
                          <span>Q{index + 1}</span>
          
                          {index > 0 && (
                            <button onClick={(e) => deleteQuestions(e, index)}>
                              <DeleteIcon />
                            </button>
                          )}
                        </div>
          
                        <div className="form-field-group text-question">
                          <label>Question</label>
          
                          <TextField
                            id="QuestionName"
                            name="question"
                            variant="outlined"
                            value={element.question}
                            type="text"
                            onChange={(e) => handleChange(index, e)}
                          />
                          <span className="text-danger">{!element.question && validation.questionNameError}</span>
                        </div>
                        <div className="form-field-group text-type">
                          <label>Question Type</label>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              {/* <InputLabel id="Score">Score</InputLabel> */}
                              <Select
                                labelId="Score"
                                id="demo-simple-select"
                                name="questionType"
                               // label="Score"
                                value={index > 0 ? formValues.surveyName !== ''?element.questionType:'PS':element.questionType?element.questionType:'CSAT'}
                                onChange={(e) => handleChange(index, e)}
                                disabled="true"
                              >
                                {index < 1 && (
                                  <MenuItem value="CSAT">
                                    Customer Satisfaction Score
                                  </MenuItem>
                                )}
                                {index < 1 && (
                                  <MenuItem value="CES">Customer Effort Score</MenuItem>
                                )}
                                {index < 1 && (
                                  <MenuItem value="NPS">Net Promoter Score</MenuItem>
                                )}
                                {index >= 1 && (
                                  <MenuItem value="PS">Point Scale</MenuItem>
                                )}
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div className="form-field-group text-scale">
                          <label>Scale</label>
                          <Box sx={{ maxWidth: 120 }}>
                            <FormControl fullWidth>
                              {/* <InputLabel id="Scale">scale</InputLabel> */}
                              <Select
                                labelId="Scale"
                                id="demo-simple-select"
                                name="minScale"
                                //label="scale"
                                value="10"
                                onChange={(e) => handleChange(index, e)}
                              >
                                <MenuItem value={10}>1-5</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                      </div>
                    </Card>
          }
          
        </div>
      ))}
      {(!is_nps && questionValues[0].questionType !=='NPS') && <div className="section-content add-question">
        <Card component="form" noValidate autoComplete="off">
          {questionValues.length < 5 && (
            <Button variant="outlined" onClick={() => addFormFields()}>
              <span>+</span>ADD ADDITIONAL QUESTION
            </Button>
          )}
        </Card>
      </div>}
      <div className="section-header">
        <h2>Closing Message</h2>
      </div>
      <div className="section-content">
        <Card component="form" noValidate autoComplete="off">
          <div className="icon-with-form">
            <div className="icon">
              <ChatBubbleOutlineIcon />
            </div>
            <div className="form-field-group text-message">
              <label>Message</label>
              <TextareaAutosize
                name="closingMessage"
                onChange={(e) => handleFormChange(e)}
                value={formValues.closingMessage}
                fullWidth
                variant="outlined"
              />
              <span className="text-danger">
              {validation.closingMessageError}
            </span>
            </div>
            
          </div>
        </Card>
      </div>
      <div className="section-footer">
        <Button variant="contained" onClick={submitNewSurvey} disabled="true">
          Save
        </Button>
      </div>
    </form>
  );
};

export default NewSurvey;
