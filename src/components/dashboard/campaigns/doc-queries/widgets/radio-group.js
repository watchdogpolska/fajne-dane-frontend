import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import {RadioField} from './components/radio-field';


export const RadioGroupWidget = (props) => {
    const {
        outputField,
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

    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        answers.push(
            <RadioField index={index}
                        isSelected={value === answer.value}
                        enableEdit={enableEdit}
                        showConflicts={showConflicts}
                        answer={answer}/>
        );
    }


    return (
        <RadioGroup value={value}
                    onChange={handleChange}>
            {answers}
        </RadioGroup>
    );
};
