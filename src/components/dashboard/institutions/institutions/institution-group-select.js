import * as React from 'react';
import {forwardRef, useEffect, useReducer} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import merge from "@/utils/merge";


export const InstitutionGroupSelect = forwardRef((props, ref) => {
    const {
        name,
        label,
        formik,
        allowEmpty,
        disabled,
        ...other
    } = props;

    const { repositories } = useAuth();
    const [state, setState] = useReducer(
        (options, newOptions) => merge(options, newOptions),
        {
            value: [],
            loading: true,
        }
    );

    async function fetchInstitutionGroupsData() {
        setState({loading: true});
        let institutionGroups = await repositories.institutionGroup.list();
        setState({loading: true, value: institutionGroups});
    }

    const handleChange = (event) => {
        let group = event.target.value;
        if (ref) ref.current = group;
        formik.setFieldValue(name, group.id);
    };

    useEffect(async () => {
        await fetchInstitutionGroupsData();
    }, []);


    let options = [];

    if (allowEmpty) {
        options.push(
            <MenuItem key={'menu-answer-null'}
                      index='null'
                      value='null'>
                Brak
            </MenuItem>
        );
    }
    state.value.forEach(
        (group) => {
            options.push(
                <MenuItem key={`menu-answer-${group.id}`}
                          index={group.id}
                          value={group}>
                    {group.name}
                </MenuItem>
            )
        }
    );

    return (
        <FormControl fullWidth
                     disabled={disabled}>
            <InputLabel id="institution-select-label">{label}</InputLabel>
            <Select fullWidth
                    label={label}
                    labelId="institution-select-label"
                    name={name}
                    error={Boolean(formik.touched[name] && formik.errors[name])}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}>
                {options}
            </Select>
        </FormControl>
    );
});
