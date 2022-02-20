import {Typography, Grid, Box, Divider} from '@mui/material';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LinearProgress from '@mui/material/LinearProgress';
import {OutputFieldFormField} from './output-field-form-field';


export const OutputFieldForm = (props) => {
    const {
        value,
        enableEdit,
        setAnswerValue,
        showConflicts,
        docQueryRecords,
        ...other
    } = props;
    
    const handleChange = (event) => {
        setAnswerValue(event.target.value);
    };

    let query = docQueryRecords.docQuery.query;
    let question = query.data[0];
    let outputField = query.outputField;


    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        answers.push(
            <OutputFieldFormField index={index}
                                  isSelected={value === answer.value}
                                  enableEdit={enableEdit}
                                  showConflicts={showConflicts}
                                  answer={answer}/>
        );
    }


    return (
        <>
            <Typography variant="subtitle1"
                        color="textSecondary"
                        sx={{
                            paddingTop: "12px",
                            paddingBottom: "20px",
                        }}>
                {question.value}
            </Typography>
            <Divider/>
            <FormControl fullWidth={true}>
                <RadioGroup value={value}
                            onChange={handleChange}>
                    {answers}
                </RadioGroup>
            </FormControl>
        </>
    );
};
