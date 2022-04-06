import React from "react"
import {RadioGroupWidget} from './radio-group';
import {OtherRadioGroupWidget} from './other-radio-group';


let Components = {
    "radio": RadioGroupWidget,
    "multi_radio": OtherRadioGroupWidget,
};

export default class WidgetFactory {
    create(outputField, value, docQueryRecords, enableEdit, setAnswerValue, showConflicts) {
        if (outputField.widget === "hidden")
            return null;

        let component = Components[outputField.widget];
        return React.createElement(component, {
            outputField: outputField,
            value: value,
            docQueryRecords: docQueryRecords,
            enableEdit: enableEdit,
            showConflicts: showConflicts,
            setAnswerValue: setAnswerValue
        });
    }
}
