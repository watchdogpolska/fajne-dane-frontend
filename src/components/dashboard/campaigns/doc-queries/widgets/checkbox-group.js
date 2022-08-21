import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import FormGroup from '@mui/material/FormGroup';
import {CheckboxField} from './components/checkbox-field';
import {removeFromArray} from '@/utils/array';
import {OtherTextCheckbox} from './components/other-text-field/other-text-checkbox';


function getInitialOtherValue(docQueryRecords, values, hasPredefinedAnswers) {
    let initialSwitchValue = hasPredefinedAnswers;
    let widgetInitialValue = hasPredefinedAnswers ? docQueryRecords.otherAnswers[0].value : "";
    for (let value of values) {
        if (value && !docQueryRecords.valueInAnswers(value)) {
            if (docQueryRecords.valueInOtherAnswers(value)) {
                // predefined value
                widgetInitialValue = value;
            } else {
                // manually entered value
                initialSwitchValue = false;
                widgetInitialValue = value;
            }
            break;
        }
    }
    return [initialSwitchValue, widgetInitialValue];
}


export const CheckboxGroupWidget = (props) => {
    const {
        outputField,
        values,
        enableEdit,
        setAnswerValues,
        showConflicts,
        docQueryRecords,
        ...other
    } = props;

    const prevCurrentValuesRef = useRef();
    let [currentValues, setCurrentValues] = useState(values);
    let refs = {};

    const handleUpdate = () => {
        let _currentValues = []
        for (let ref of Object.values(refs))
            if (ref.current.checked)
                _currentValues.push(ref.current.value);
        setCurrentValues(_currentValues);
    };

    useEffect(() => {
        if (prevCurrentValuesRef.current)
            setAnswerValues(currentValues);
        prevCurrentValuesRef.current = currentValues;
    }, [currentValues]);

    let otherField = outputField.metadata['other_field']
    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        if (otherField && index >= otherField.position) index += 1;
        let isSelected = values.indexOf(answer.value) >= 0;

        refs[index] = useRef({
            value: answer.value,
            checked: isSelected
        });
        answers.push(
            <CheckboxField index={index}
                           ref={refs[index]}
                           key={`answer-${index}`}
                           isSelected={isSelected}
                           onChange={handleUpdate}
                           enableEdit={enableEdit}
                           showConflicts={showConflicts}
                           answer={answer}/>
        );
    }

    if (otherField) {
        let index = otherField.position;

        let hasPredefinedAnswers = docQueryRecords.otherAnswers.length > 0;
        let [initialSwitchValue, widgetInitialValue] = getInitialOtherValue(docQueryRecords, values, hasPredefinedAnswers);
        let isSelected = values.filter(value => !docQueryRecords.valueInAnswers(value)).length > 0;

        refs[index] = useRef({
            value: widgetInitialValue,
            checked: isSelected
        });
        answers.splice(
            index,
            0,
            <OtherTextCheckbox key={'answer-text'}
                               index={index}
                               ref={refs[index]}
                               enableEdit={enableEdit}
                               showConflicts={showConflicts}
                               label={otherField.label}
                               initialSwitchValue={initialSwitchValue}
                               widgetInitialValue={widgetInitialValue}
                               hasPredefinedAnswers={hasPredefinedAnswers}
                               onChange={handleUpdate}
                               isSelected={isSelected}
                               docQueryRecords={docQueryRecords}/>
        );
    }

    return (
        <FormGroup>
            {answers}
        </FormGroup>
    );
};
