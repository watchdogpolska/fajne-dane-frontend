import {Box, Typography, TextField, Select, InputLabel, MenuItem, Switch} from '@mui/material';
import {useState} from 'react';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LinearProgress from '@mui/material/LinearProgress';


export const TextSelect = (props) => {
    const {
        enableEdit,
        docQueryRecords,
        usePredefined,
        onChange,
        widgetInitialValue,
        ...other
    } = props;

    let [widgetValue, setWidgetValue] = useState(widgetInitialValue);

    const handleWidgetChange = (event) => {
        setWidgetValue(event.target.value);
        onChange(event);
    };

    if (usePredefined) {
        let options = docQueryRecords.otherAnswers.map(
            (answer) =>
            <MenuItem key={`menu-answer-${answer.value}`}
                      index={answer.value}
                      value={answer.value}>
              {answer.value}
            </MenuItem>
        );
        return (
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
        return (
            <TextField disabled={!enableEdit}
                       value={widgetValue}
                       placeholder={"Wpisz Tutaj"}
                       sx={{
                           maxWidth: "500px",
                           marginLeft: "30px",
                           marginRight: "10px"
                       }}
                      onChange={handleWidgetChange}/>
        );

    }
};
