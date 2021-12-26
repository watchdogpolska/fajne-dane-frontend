import {Card, CardContent, Grid, TextField, Typography} from '@mui/material';


export const CampaignDetailsCard = (props) => {
    const {
        formik,
        ...other
    } = props;

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Informacje o zbiorze danych
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Podaj nazwę, pod którą będzie wyświetlany zbiór danych (np. nazwę kampanii).
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <TextField
                            fullWidth
                            label="Nazwa zbioru danych"
                            name="name"
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

CampaignDetailsCard.propTypes = {
};
