import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import AgentRating from "./components/agentrating/AgentRating";
import Dashboard from "./components/dashboard/Dashboard";
import MainNav from "./components/navigation/MainNav";
import Surveys from "./components/surveys/Surveys";
import ScoreTrend from "./components/scoretrend/ScoreTrend";
import { ToastContainer, toast } from "react-toastify";

import "./App.scss";
import NewSurvey from "./components/newsurvey/NewSurvey";

const route = [
  {
    path: "/",
    title: "Dashboard",
    exact: true,
  },
  {
    path: "/Surveys",
    title: "Surveys",
  },
  {
    path: "/AgentRating",
    title: "Agent Rating",
  },
  {
    path: "/components/newsurvey/NewSurvey",
    title: "New Survey",
  },
  {
    path: "/components/scoretrend/ScoreTrend",
    title: "Score Trend",
  },
];

export default function App() {
  return (
    <Router>
      <div className="dashboard-container">
        <ToastContainer />
        <MainNav />
        <Routes>
          {route.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main />}
            />
          ))}
        </Routes>

        <div className="content">
          <Routes>
            {/* {route.map((route, index) => (
              
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))} */}

            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/Surveys" element={<Surveys />} />
            <Route exact path="/AgentRating" element={<AgentRating />} />

            <Route exact path="/NewSurvey" element={<NewSurvey />} />

            <Route exact path="/ScoreTrend" element={<ScoreTrend />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
