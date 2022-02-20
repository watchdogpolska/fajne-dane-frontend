import {Box, Typography} from '@mui/material';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';


export const OutputFieldFormField = (props) => {
    const {
        showConflicts,
        enableEdit,
        index,
        answer,
        isSelected,
        ...other
    } = props;

    let letter = String.fromCharCode(97 + index);
    let label = (
        <Typography variant="body1"
                    sx={{ fontWeight: isSelected ? 'bold': 'regular' }}
                    key={`answer-${letter}`}
                    color="textSecondary">
            {letter}) {answer.value} {isSelected}
        </Typography>
    );

    let probabilityBar = null;
    if (showConflicts && answer.probability) {
        let probability = Math.round(answer.probability * 100 * 100) / 100;
        probabilityBar = (
            <Box component="div"
                 key={`answer-${letter}-prob`}
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
    }

    return (
        <>
            <FormControlLabel value={answer.value}
                              disabled={!enableEdit}
                              control={<Radio/>}
                              sx={{
                                  paddingTop: "32px",
                              }}
                              label={label}/>
            {probabilityBar}
        </>
    );
};
