import {Box, Typography} from '@mui/material';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import {ProbabilityBar} from './probability-bar';


export const RadioField = (props) => {
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
            {letter}) {answer.value}
        </Typography>
    );

    let probabilityBar = null;
    if (showConflicts && answer.probability)
        probabilityBar = <ProbabilityBar answer={answer}/>;

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
