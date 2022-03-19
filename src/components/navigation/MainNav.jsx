import React from 'react';
// import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

// import { SidebarData } from './SidebarData';




import './MainNav.scss';

function MainNav() {
    return (
        <div className='nav'>
            <h1>Survey Builder</h1>
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
                    <li>
                        <Link to="/ScoreTrend">Score Trend</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainNav;
