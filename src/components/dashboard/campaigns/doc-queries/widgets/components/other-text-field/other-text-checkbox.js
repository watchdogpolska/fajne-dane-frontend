import * as React from 'react';
import {useState, forwardRef} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {ProbabilityBar} from '../probability-bar';
import {TextSelect} from './text-select';
import {ComponentLabel} from './component-label';


export const OtherTextCheckbox = forwardRef((props, ref) => {
    const {
        showConflicts,
        enableEdit,
        index,
        label,
        isSelected,
        onChange,
        hasPredefinedAnswers,
        initialSwitchValue,
        widgetInitialValue,
        docQueryRecords,
        ...other
    } = props;

    let [usePredefined, setUsePredefined] = useState(initialSwitchValue);
    let [widgetValue, setWidgetValue] = useState(widgetInitialValue);
    let [checked, setChecked] = useState(isSelected);

    const handleSwitchChange = (event) => {
        setUsePredefined(event.target.checked);
    };
    
    const handleTextChange = (event) => {
        setWidgetValue(event.target.value);
        ref.current = {
            value: event.target.value,
            checked: checked
        };
        onChange();
    };

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        ref.current = {
            value: widgetValue,
            checked: event.target.checked
        };
        onChange();
    };

    let probabilityBar = null;
    if (showConflicts && docQueryRecords.otherProbability)
        probabilityBar = <ProbabilityBar answer={{probability: docQueryRecords.otherProbability}}/>;

    return (
        <>
            <FormControlLabel value={widgetValue}
                              disabled={!enableEdit}
                              control={<Checkbox checked={checked} onChange={handleCheckboxChange}/>}
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
});
