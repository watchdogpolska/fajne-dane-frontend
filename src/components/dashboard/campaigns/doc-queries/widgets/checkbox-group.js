import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import FormGroup from '@mui/material/FormGroup';
import {CheckboxField} from './components/checkbox-field';
import {removeFromArray} from '@/utils/array';


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

    const handleChange = (event) => {
        let _currentValues = [...currentValues];
        if (event.target.checked) {
            _currentValues.push(event.target.value);
        } else {
            removeFromArray(_currentValues, event.target.value);
        }
        setCurrentValues(_currentValues);
    };

    useEffect(() => {
        if (prevCurrentValuesRef.current)
            setAnswerValues(currentValues);
        prevCurrentValuesRef.current = currentValues;
    }, [currentValues]);

    let answers = [];
    for (let [index, answer] of docQueryRecords.answers.entries()) {
        answers.push(
            <CheckboxField index={index}
                           key={`answer-${index}`}
                           isSelected={values.indexOf(answer.value) >= 0}
                           onChange={handleChange}
                           enableEdit={enableEdit}
                           showConflicts={showConflicts}
                           answer={answer}/>
        );
    }


    return (
        <FormGroup>
            {answers}
        </FormGroup>
    );
};
