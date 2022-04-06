import * as React from 'react';
import {Box, Typography} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';


export const ProbabilityBar = (props) => {
    const {
        answer,
        ...other
    } = props;

    let probability = Math.round(answer.probability * 100 * 100) / 100;
    return (
        <Box component="div"
             key={`answer-${answer.value}-prob`}
             sx={{
                 position: "relative",
                 padding: "12px 40px 12px 32px"
             }}>
            <Box component="div"
                 sx={{
                     width: "calc(100% - 60px)"
                 }}>
                <LinearProgress variant="determinate" value={probability} color="error"/>
            </Box>
            <Box component="div"
                 sx={{
                     position: "absolute",
                     right: "40px",
                     top: "2px"
                 }}>
                <Typography variant="body1" color="error">
                    {probability}%
                </Typography>
            </Box>
        </Box>
    );
};
