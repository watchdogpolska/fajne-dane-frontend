import {Card, CardContent, Grid, Typography} from '@mui/material';


export const InstitutionUploadFileCard = (props) => {
    const {
        group,
        formik,
        ...other
    } = props;

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Szablon listy instytucji
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Wgraj szablon listy instytucji zgodny ze schematem. Możesz pobrać schemat danych, aby zapoznać się z jego strukturą.
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

InstitutionUploadFileCard.propTypes = {
};
