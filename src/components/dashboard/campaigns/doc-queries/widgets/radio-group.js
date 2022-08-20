import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import {RadioField} from './components/radio-field';
import {TextRadioField} from './components/text-radio-field';


export const RadioGroupWidget = (props) => {
    const {
        outputField,
        values,
        enableEdit,
        setAnswerValues,
        showConflicts,
        docQueryRecords,
        ...other
    } = props;

    let value = values[0] || null;

    const handleChange = (event) => {
        setAnswerValues([event.target.value]);
    };

    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        answers.push(
            <RadioField key={`answer-${index}`}
                        index={index}
                        isSelected={value === answer.value}
                        enableEdit={enableEdit}
                        showConflicts={showConflicts}
                        answer={answer}/>
        );
    }

    if ('other_field' in outputField.metadata) {
        let otherField = outputField.metadata['other_field']
        let isOtherSelected = docQueryRecords.valueInOtherAnswers(value);
        answers.splice(
            otherField.position,
            0,
            <TextRadioField key={'answer-text'}
                            index={answers.length}
                            isSelected={isOtherSelected}
                            enableEdit={enableEdit}
                            showConflicts={showConflicts}
                            label={otherField.label}
                            handleChange={handleChange}
                            docQueryRecords={docQueryRecords}
                            value={value}/>
        );
    }

    return (
        <RadioGroup value={value}
                    onChange={handleChange}>
            {answers}
        </RadioGroup>
    );
};
