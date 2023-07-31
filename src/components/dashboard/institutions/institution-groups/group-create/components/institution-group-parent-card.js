import {Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, Typography} from '@mui/material';
import {InstitutionGroupSelect} from "@/components/dashboard/institutions/institutions/institution-group-select";


export const InstitutionGroupParentCard = (props) => {
    const {
        formik,
        disabled,
        ...other
    } = props;


    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Ustal hierarchię
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Zdecyduj, czy dodawany typ instytucji ma typ nadrzędny, np. powiat podlega pod gminę. W przypadku braku typu nadrzędnego pole pozostaw puste.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <InstitutionGroupSelect formik={formik}
                                                label="Instytucja nadrzędna"
                                                name="parent"/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

InstitutionGroupParentCard.propTypes = {
};
