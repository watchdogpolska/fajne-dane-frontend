import {Card, CardContent, Grid, TextField, Typography} from '@mui/material';



export const DocumentDetailsCard = (props) => {
    const {
        formik,
        documentFields,
        ...other
    } = props;

    let fields = documentFields.map((field) => {
        let name = field.name; 
        return (
            <Grid item xs={12} key={name}>
                <TextField fullWidth
                           key={name}
                           label={name}
                           name={name}
                           error={Boolean(formik.touched[name] && formik.errors[name])}
                           helperText={formik.touched[name] && formik.errors[name]}
                           onBlur={formik.handleBlur}
                           onChange={formik.handleChange}
                           value={formik.values[name]}
                           required />
            </Grid>
        );
    });

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Informacje o wpisie
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Uzupełnij informacje, które opisują ten wpis.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={3}>
                            {fields}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

DocumentDetailsCard.propTypes = {
};
