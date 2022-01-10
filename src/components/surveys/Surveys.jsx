import React from 'react';
import './surveys.scss';
import Button from '@mui/material/Button';
import SurveyTable from './SurveyTable/SurveyTable';
import { color } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


function Surveys() {
    return (
        <div className='content-container surveys'>
            <div className='section-header'>
                <h2>Surveys</h2>
                <Button variant="contained">New Survey</Button>
            </div>
            <Card sx={{ minWidth: 275 }}>
                
                    <SurveyTable />
                
            </Card>


        </div>
    )
}

export default Surveys;
