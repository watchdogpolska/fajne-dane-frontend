import {Card, CardContent, Grid, TextField, Typography} from '@mui/material';


export const ResourceDetailsCard = (props) => {
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
                            Informacje o źródle danych danych
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Uzupełnij informacje, które opisują to źródło danych.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Źródło pozyskania daych"
                                    name="source"
                                    error={Boolean(formik.touched.source && formik.errors.source)}
                                    helperText={formik.touched.source && formik.errors.source}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.source}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    label="Opis źródła"
                                    name="description"
                                    error={Boolean(formik.touched.description && formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ResourceDetailsCard.propTypes = {
};
