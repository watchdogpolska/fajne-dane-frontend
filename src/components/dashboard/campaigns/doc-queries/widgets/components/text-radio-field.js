import {Box, Typography, TextField, Select, InputLabel, MenuItem, Switch} from '@mui/material';
import {useState} from 'react';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';
import {ProbabilityBar} from './probability-bar';


export const TextRadioField = (props) => {
    const {
        showConflicts,
        enableEdit,
        index,
        label,
        value,
        handleChange,
        docQueryRecords,
        isSelected,
        ...other
    } = props;

    let hasPredefinedAnswers = docQueryRecords.otherAnswers.length > 0;
    let initialSwitchValue = hasPredefinedAnswers;

    let widgetInitialValue = hasPredefinedAnswers ? docQueryRecords.otherAnswers[0].value : "";
    if (value && !docQueryRecords.valueInAnswers(value)) {
        if (docQueryRecords.valueInOtherAnswers(value)) {
            // predefined value
            widgetInitialValue = value;
        } else {
            // manually entered value
            initialSwitchValue = false;
            widgetInitialValue = value;
        }
    }

    let [widgetValue, setWidgetValue] = useState(widgetInitialValue);
    let [usePredefined, setUsePredefined] = useState(initialSwitchValue);

    const handleWidgetChange = (event) => {
        setWidgetValue(event.target.value);
        handleChange(event);
    };

    const handleSwitchChange = (event) => {
        setUsePredefined(event.target.checked);
    };

    let letter = String.fromCharCode(97 + index);
    let labelComponent = (
        <Box sx={{display: "flex"}}>
            <Typography variant="body1"
                        sx={{ fontWeight: isSelected ? 'bold': 'regular' }}
                        key={`answer-${letter}`}
                        color="textSecondary">
                {letter}) {label}
            </Typography>
            {
                hasPredefinedAnswers &&
                <FormControlLabel control={<Switch />}
                                  disabled={!enableEdit}
                                  checked={usePredefined}
                                  onChange={handleSwitchChange}
                                  sx={{
                                      position: "absolute",
                                      right: 0
                                  }}
                                  label="Wybierz z dostępnych"/>
            }
        </Box>
    );

    let probabilityBar = null;
    if (showConflicts && docQueryRecords.otherProbability)
        probabilityBar = <ProbabilityBar answer={{probability: docQueryRecords.otherProbability}}/>;
    
    let component = null;
    if (usePredefined) {
        let options = docQueryRecords.otherAnswers.map(
            (answer) =>
                <MenuItem key={`menu-answer-${answer.value}`}
                          index={answer.value}
                          value={answer.value}>
                    {answer.value}
                </MenuItem>
        );

        component = (
            <Select disabled={!enableEdit}
                    value={widgetValue}
                    sx={{
                        maxWidth: "500px",
                        marginLeft: "30px",
                        marginRight: "10px"
                    }}
                    onChange={handleWidgetChange}>
                {options}
            </Select>
        );
    } else {
        component = (
            <TextField disabled={!enableEdit}
                       value={widgetValue}
                       placeholder={"Wpisz Tutaj"}
                       sx={{
                           maxWidth: "500px",
                           marginLeft: "30px",
                           marginRight: "10px"
                       }}
                       onChange={handleWidgetChange}/>
        )
    }

    return (
        <>
            <FormControlLabel value={widgetValue}
                              disabled={!enableEdit}
                              control={<Radio/>}
                              sx={{
                                  paddingTop: "32px",
                              }}
                              label={labelComponent}/>
            {component}
            {probabilityBar}
        </>
    );
};
