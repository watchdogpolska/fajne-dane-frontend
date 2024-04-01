import * as React from 'react';
import {forwardRef} from 'react';
import {Checkbox, Typography, FormControl, InputLabel, MenuItem, Select, OutlinedInput} from '@mui/material';


export const MultiSelector = forwardRef((props, ref) => {
    const {
        formik,
        name,
        label,
        values,
        indexVar,
        labelVar,
        disabled,
        ...other
    } = props;

    const handleChange = (event) => {
        let currentValue = event.target.value;
        if (ref) ref.current = currentValue;
        formik.setFieldValue(name, currentValue);
    };

    let selectedValues = formik.values[name];

    let labelsMap = {}
    let options = [];
    values.forEach(
        (value) => {
            labelsMap[value[indexVar]] = value[labelVar];
            options.push(
                <MenuItem key={`menu-answer-${value[indexVar]}`}
                          index={value[indexVar]}
                          value={value[indexVar]}>
                    <Checkbox checked={selectedValues.indexOf(value[indexVar]) > -1} />
                    <Typography sx={{
                        marginY: 0,
                        maxWidth: "500px",
                        whiteSpace: "normal"
                    }}>
                        {value[labelVar]}
                    </Typography>
                </MenuItem>
            )
        }
    );

    return (
        <FormControl fullWidth
                     disabled={disabled}>
            <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
            <Select fullWidth
                    multiple
                    label={label}
                    value={selectedValues}
                    labelId={`${name}-select-label`}
                    name={name}
                    value={formik.values[name]}
                    error={Boolean(formik.touched[name] && formik.errors[name])}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.map((x) => labelsMap[x]).join(', ')}>
                {options}
            </Select>
        </FormControl>
    );
});

MultiSelector.propTypes = {};
