import {Box, Typography} from '@mui/material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import {ProbabilityBar} from './probability-bar';


export const CheckboxField = (props) => {
    const {
        showConflicts,
        enableEdit,
        index,
        answer,
        onChange,
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
                              control={<Checkbox checked={isSelected} onChange={onChange}/>}
                              sx={{
                                  paddingTop: "32px",
                              }}
                              label={label}/>
            {probabilityBar}
        </>
    );
};
