import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import {RadioField} from './components/radio-field';
import {TextRadioField} from './components/text-radio-field';


export const OtherRadioGroupWidget = (props) => {
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

    let isOtherSelected = false;
    let otherField = outputField.metadata['other_field']
    answers.push(
        <TextRadioField index={answers.length}
                        isSelected={isOtherSelected}
                        enableEdit={enableEdit}
                        showConflicts={showConflicts}
                        label={otherField.label}
                        handleChange={handleChange}
                        docQueryRecords={docQueryRecords}
                        value={value}/>
    );

    return (
        <RadioGroup value={value}
                    onChange={handleChange}>
            {answers}
        </RadioGroup>
    );
};
