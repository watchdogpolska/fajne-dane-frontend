import * as React from 'react';
import {useReducer} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CircularProgress from '@mui/material/CircularProgress';
import {useAuth} from "@/hooks/use-auth";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';


function merge(a, b) {
    let c = {};
    for(let idx in a) {
        c[idx] = a[idx];
    }
    for(let idx in b) {
        c[idx] = b[idx];
    }
    return c;
}


export const InstitutionSelect = (props) => {
    const {
        name,
        label,
        formik,
        institutionGroup,
        ...other
    } = props;

    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');

    const [options, setOptions] = useReducer(
        (options, newOptions) => merge(options, newOptions),
        {
            value: [],
            loading: false,
        }
    );
    const [open, setOpen] = React.useState(false);
    const { repositories } = useAuth();


    let fetch = async (query) => {
        setOptions({loading: true});
        let results = await repositories.institution.list({groupId: institutionGroup.id, query: query});
        setOptions({loading: false, value: results.results});
    };


    React.useEffect(() => {
        if (!open) {
        }
    }, [open]);

    return (
        <Autocomplete
            id="insitution-select"
            name={name}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onInputChange={async (event, newInputValue) => {
                if (!options.loading && newInputValue.length > 1)
                    await fetch(newInputValue);
                else if (newInputValue.length <= 1)
                    setOptions({value: []});
            }}
            onChange={(e, newValue) => {
                formik.setFieldValue(name, newValue.id);
            }}
            getOptionLabel={(option) => `${option.name} (${option.key})`}
            options={options.value}
            loading={options.loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {options.loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    fullWidth
                />
            )}
            renderOption={(props, option, { inputValue }) => {
                const matches = match(option.name, inputValue, { insideWords: true });
                const parts = parse(option.name, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
        />
    );
}
