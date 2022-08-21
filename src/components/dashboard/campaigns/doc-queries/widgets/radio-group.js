import * as React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import {RadioField} from './components/radio-field';
import {OtherTextRadio} from './components/other-text-field/other-text-radio';


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
    //let answerIndexes = setState([]);

    const handleChange = (event) => {
        setAnswerValues([event.target.value]);
    };

    let otherField = outputField.metadata['other_field']
    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        if (otherField && index >= otherField.position)
            index += 1;
        answers.push(
            <RadioField key={`answer-${index}`}
                        index={index}
                        isSelected={value === answer.value}
                        enableEdit={enableEdit}
                        showConflicts={showConflicts}
                        answer={answer}/>
        );
    }

    if (otherField) {
        answers.splice(
            otherField.position,
            0,
            <OtherTextRadio key={'answer-text'}
                            index={otherField.position}
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
