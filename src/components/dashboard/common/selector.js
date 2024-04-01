import * as React from 'react';
import {forwardRef} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';


export const Selector = forwardRef((props, ref) => {
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

    let options = [];
    values.forEach(
        (value) => {
            options.push(
                <MenuItem key={`menu-answer-${value[indexVar]}`}
                          index={value[indexVar]}
                          value={value[indexVar]}>
                    {value[labelVar]}
                </MenuItem>
            )
        }
    );

    return (
        <FormControl fullWidth
                     disabled={disabled}>
            <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
            <Select fullWidth
                    label={label}
                    value={formik.values[name]}
                    labelId={`${name}-select-label`}
                    name={name}
                    error={Boolean(formik.touched[name] && formik.errors[name])}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}>
                {options}
            </Select>
        </FormControl>
    );
});

Selector.propTypes = {};
