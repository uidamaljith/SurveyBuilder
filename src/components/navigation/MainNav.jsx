import React from "react";
// import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";

import logo from "../../assets/SurveyLogoSolo100.png";
import SelectCompany from "../../assets/select-company.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import { SidebarData } from './SidebarData';

import "./MainNav.scss";

function MainNav() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="nav">
      <h1>
        {" "}
        <img src={logo} alt="" />
        <span>Survey Builder</span>
      </h1>
      <div className="mainnav">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/Surveys">Surveys</Link>
          </li>
          <li>
            <Link to="/AgentRating">Agent Rating</Link>
          </li>
          {/* <li>
                        <Link to="/NewSurvey">New Survey</Link>
                    </li> */}
          {/* <li>
                        <Link to="/ScoreTrend">Score Trend</Link>
                    </li> */}
        </ul>

        <Button onClick={handleOpen} className="select-company">
          <img src={SelectCompany} alt="" />
          Select Company
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="pop-window">
            <h1>
              <img src={logo} alt="" />
              <span>Survey Builder</span>
              
            </h1>
            <Typography>Select Company</Typography>
            <div className="sc-card-container">
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company">PlacePay</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company">PaySchools Central</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company">SchoolPay</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company">MerchantServices</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company">TechnicalHelp</Button>
              </Card>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MainNav;
