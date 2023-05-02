import {Card, CardContent, Grid, Typography} from '@mui/material';


export const InstitutionValidateFileCard = (props) => {
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
                            Zgodność ze schematem
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Sprawdź, czy wgrany szablon listy instytucji jest zgodny z schematem
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        nazwa czy cos
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

InstitutionValidateFileCard.propTypes = {
};
