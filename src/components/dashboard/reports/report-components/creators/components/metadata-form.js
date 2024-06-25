import {Grid, TextField, Typography} from '@mui/material';
import {useReducer, useEffect} from 'react';
import merge from "@/utils/merge";

const NumberMetadataField = (props) => {
    const {
        name,
        label,
        value,
        setStateValue,
        ...other
    } = props;

    const handleChange = (event) => {
        setStateValue(event.target.name, Number(event.target.value));
    }

    return (
        <TextField
            fullWidth
            type="number"
            label={label}
            name={name}
            onChange={handleChange}
            value={value}
        />
    );
}


export const MetadataForm = (props) => {
    const {
        formik,
        metadataFields,
        ...other
    } = props;

    let defaultValues = formik.values['metadata'];

    const [state, setState] = useReducer(
        (values, newValues) => merge(values, newValues), defaultValues
    );

    const setStateValue = (name, value) => {
        let data = {};
        data[name] = value;
        setState(data);
    };

    useEffect(() => {
        formik.setFieldValue("metadata", state);
    }, [state]);

    let fields = [];
    metadataFields.forEach((field) => {
        if (field.type === "number") {
            if (fields.length > 0) {
                fields.push(<Grid item md={4} xs="hidden"/>);
            }
            fields.push(
                <Grid item md={8} xs={12} key={field.name}>
                    <NumberMetadataField name={field.name}
                                         label={field.label}
                                         value={state[field.name]}
                                         setStateValue={setStateValue}/>
                </Grid>
            );
        }
    });

    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Typography variant="h6">
                    Metadane
                </Typography>
                <Typography color="textSecondary"
                            variant="body2"
                            sx={{ mt: 1 }}>
                    Metadane
                </Typography>
            </Grid>
            {fields}
        </Grid>
    );
};

MetadataForm.propTypes = {
};
