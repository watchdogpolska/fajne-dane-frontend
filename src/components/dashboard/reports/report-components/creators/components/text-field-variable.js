import {Grid, TextField, Typography} from '@mui/material';


export const TextFieldVariable = (props) => {
    const {
        label,
        description,
        name,
        formik,
        maxLength,
        required,
        ...other
    } = props;

    let infoIcon = null;

    return (
        <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
                <Typography variant="h6">
                    {label}
                </Typography>
                <Typography color="textSecondary"
                            variant="body2"
                            sx={{ mt: 1 }}>
                    {description}
                </Typography>
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField
                    fullWidth
                    label={label}
                    name={name}
                    inputProps={{maxLength: maxLength }}
                    error={Boolean(formik.touched[name] && formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                    required={required === undefined ? true: required}
                />
            </Grid>
        </Grid>
    );
};

TextFieldVariable.propTypes = {
};
