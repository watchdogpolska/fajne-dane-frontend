import {Typography} from '@mui/material';
import * as React from 'react';
import {forwardRef, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ProbabilityBar} from './probability-bar';


export const CheckboxField = forwardRef((props, ref) => {
    const {
        showConflicts,
        enableEdit,
        index,
        answer,
        onChange,
        isSelected,
        ...other
    } = props;

    let [checked, setChecked] = useState(isSelected);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        ref.current = {
            value: answer.value,
            checked: event.target.checked
        };
        onChange();
    };

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
                              control={<Checkbox checked={checked} onChange={handleChange}/>}
                              sx={{
                                  paddingTop: "32px",
                              }}
                              label={label}/>
            {probabilityBar}
        </>
    );
});
