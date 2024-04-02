import {useAuth} from "@/hooks/use-auth";
import * as React from 'react';
import {forwardRef, useEffect, useReducer} from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import merge from "@/utils/merge";


export const DataSourceSelector = forwardRef((props, ref) => {
    const {
        formik,
        name,
        label,
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

    async function fetchDataSourcesData() {
        setState({loading: true});
        let dataSources = await repositories.dataSource.list();
        setState({loading: true, value: dataSources});
    }

    const handleChange = (event) => {
        let group = event.target.value;
        if (ref) ref.current = group;
        formik.setFieldValue(name, group);
    };

    useEffect(async () => {
        await fetchDataSourcesData();
    }, []);


    let options = [];
    state.value.forEach(
        (group) => {
            options.push(
                <MenuItem key={`menu-answer-${group.id}`}
                          index={group.id}
                          value={group.id}>
                    {group.campaignName}
                </MenuItem>
            )
        }
    );

    return (
        <FormControl fullWidth
                     disabled={disabled}>
            <InputLabel id="data-source-select-label">{label}</InputLabel>
            <Select fullWidth
                    label={label}
                    value={formik.values[name]}
                    labelId="data-source-select-label"
                    name={name}
                    error={Boolean(formik.touched[name] && formik.errors[name])}
                    onBlur={formik.handleBlur}
                    onChange={handleChange}>
                {options}
            </Select>
        </FormControl>
    );
});

DataSourceSelector.propTypes = {};
