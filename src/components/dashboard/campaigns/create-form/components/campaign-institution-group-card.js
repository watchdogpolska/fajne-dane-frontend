import {Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, Typography} from '@mui/material';
import {InstitutionGroupSelect} from "@/components/dashboard/institutions/institutions/institution-group-select";


export const CampaignInstitutionGroupCard = (props) => {
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
                            Wybierz instytucje nadrzędną
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Instytucja
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <InstitutionGroupSelect formik={formik}
                                                label="Instytucja nadrzędna"
                                                allowEmpty={false}
                                                name="institutionGroup"/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

CampaignInstitutionGroupCard.propTypes = {
};
