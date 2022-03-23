import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import logo from '../../assets/SurveyLogoSolo100.png';

// import { SidebarData } from './SidebarData';




import './MainNav.scss';

function MainNav() {
    return (
        <div className='nav'>
            <h1> <img src={logo} alt=""/><span>Survey Builder</span></h1>
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
            </div>
        </div>
    )
}

export default MainNav;
