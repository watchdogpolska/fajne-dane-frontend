import * as React from 'react';
import {useState} from 'react';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ProbabilityBar} from '../probability-bar';
import {TextSelect} from './text-select';
import {ComponentLabel} from './component-label';


function getInitialValues(docQueryRecords, value, hasPredefinedAnswers) {
    let initialSwitchValue = hasPredefinedAnswers;
    let widgetInitialValue = hasPredefinedAnswers ? docQueryRecords.otherAnswers[0].value : "";
    if (value && !docQueryRecords.valueInAnswers(value)) {
        if (docQueryRecords.valueInOtherAnswers(value)) {
            // predefined value
            widgetInitialValue = value;
        } else {
            // manually entered value
            initialSwitchValue = false;
            widgetInitialValue = value;
        }
    }
    return [initialSwitchValue, widgetInitialValue];
}


export const OtherTextRadio = (props) => {
    const {
        showConflicts,
        enableEdit,
        component,
        index,
        label,
        value,
        handleChange,
        docQueryRecords,
        ...other
    } = props;

    let hasPredefinedAnswers = docQueryRecords.otherAnswers.length > 0;
    let [initialSwitchValue, widgetInitialValue] = getInitialValues(docQueryRecords, value, hasPredefinedAnswers);
    let [usePredefined, setUsePredefined] = useState(initialSwitchValue);
    let [widgetValue, setWidgetValue] = useState(widgetInitialValue);
    let isSelected = value && !docQueryRecords.valueInAnswers(value);

    const handleSwitchChange = (event) => {
        setUsePredefined(event.target.checked);
    };
    
    const handleTextChange = (event) => {
        setWidgetValue(event.target.value);
        handleChange(event);
    }

    let probabilityBar = null;
    if (showConflicts && docQueryRecords.otherProbability)
        probabilityBar = <ProbabilityBar answer={{probability: docQueryRecords.otherProbability}}/>;

    return (
        <>
            <FormControlLabel value={widgetValue}
                              disabled={!enableEdit}
                              control={<Radio/>}
                              sx={{
                                  paddingTop: "32px",
                              }}
                              label={<ComponentLabel index={index}
                                                     label={label}
                                                     usePredefined={usePredefined}
                                                     isSelected={isSelected}
                                                     hasPredefinedAnswers={hasPredefinedAnswers}
                                                     handleSwitchChange={handleSwitchChange}
                                                     enableEdit={enableEdit}/>}/>
            <TextSelect usePredefined={usePredefined}
                        docQueryRecords={docQueryRecords}
                        widgetInitialValue={widgetInitialValue}
                        onChange={handleTextChange}
                        enableEdit={enableEdit}/>
            {probabilityBar}
        </>
    );
};
