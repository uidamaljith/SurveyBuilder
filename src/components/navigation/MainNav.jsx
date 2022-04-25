import React, { useEffect } from "react";
// import ReactDOM from 'react-dom';
import { Link,NavLink } from "react-router-dom";

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

  const [modalBackDrop,setModalBackDrop] = React.useState(false);
  const [company, setCompany] = React.useState('Select Company');
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if(!localStorage.companyDetails){
        handleOpen();
        setModalBackDrop(true);
    }else{
      let company = JSON.parse(localStorage.companyDetails)
      setCompany(company.companyname)
      setModalBackDrop(false);
    }
  }, []);
  const handleOpen = () => {
      setOpen(true)
      if(localStorage.companyDetails){
            console.log(JSON.parse(localStorage.companyDetails));
        }
    };
  const handleClose = () => setOpen(false);
  const choseCompany = (event, companyName,companyCode) =>{
    console.log(companyName);
    console.log(companyCode);
    setCompany(companyName)
    localStorage.setItem("companyDetails",JSON.stringify({'companyname':companyName,'companycode':companyCode}))
    setOpen(false)
    setModalBackDrop(false);
    window.location.reload(false);
  }
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
            {/* <Link className="active" to="/">Dashboard</Link> */}
            <NavLink  to="/" activeClassName="selected">
  Dashboard
</NavLink>
          </li>
          <li>
            {/* <Link to="/Surveys">Surveys</Link> */}
            <NavLink  to="/Surveys" activeClassName="selected">
  Surveys
</NavLink>
          </li>
          <li>
            {/* <Link to="/AgentRating">Agent Rating</Link> */}
            <NavLink  to="/AgentRating" activeClassName="selected">
  Agent Rating
</NavLink>
          </li>
        </ul>


        <Button onClick={handleOpen} className="select-company">
          <img src={SelectCompany} alt="" />
          {company}
        </Button>
        <Modal
          open={open}
          hideBackdrop={modalBackDrop}
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
              <Card noValidate autoComplete="off">
              <Button className="select-company" onClick={(e) => choseCompany(e, "PlacePay",'PPAY')}>PlacePay</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company" onClick={(e) => choseCompany(e, "PaySchools Central",'PSCH')}>PaySchools Central</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company" onClick={(e) => choseCompany(e, "SchoolPay",'SPAY')}>SchoolPay</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company" onClick={(e) => choseCompany(e, "MerchantServices",'MCHS')}>MerchantServices</Button>
              </Card>
              <Card component="form" noValidate autoComplete="off">
                <Button className="select-company" onClick={(e) => choseCompany(e, "TechnicalHelp",'TEHP')}>TechnicalHelp</Button>
              </Card>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default MainNav;
