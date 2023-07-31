import React from "react"
import {RadioGroupWidget} from './radio-group';
import {CheckboxGroupWidget} from './checkbox-group';


let Components = {
    "radio": RadioGroupWidget,
    'ChoiceField': RadioGroupWidget,
    'CheckboxField': CheckboxGroupWidget
};


export default class WidgetFactory {
    create(outputField, values, docQueryRecords, enableEdit, setAnswerValues, showConflicts) {
        if (outputField.widget === "hidden")
            return null;

        let component = Components[outputField.widget];
        return React.createElement(component, {
            outputField: outputField,
            values: values,
            docQueryRecords: docQueryRecords,
            enableEdit: enableEdit,
            showConflicts: showConflicts,
            setAnswerValues: setAnswerValues
        });
    }
}
