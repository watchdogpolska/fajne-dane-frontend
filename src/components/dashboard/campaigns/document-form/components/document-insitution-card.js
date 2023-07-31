import {useState, useEffect, useRef} from 'react';
import {Card, CardContent, Grid, TextField, Typography} from '@mui/material';
import {InstitutionSelect} from "@/components/dashboard/institutions/institutions/institution-select";
import {InstitutionGroupSelect} from "@/components/dashboard/institutions/institutions/institution-group-select";



export const DocumentInstitutionCard = (props) => {
    const {
        formik,
        ...other
    } = props;

    let institutionGroup = useRef(null);

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Instytucja wpisu
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Uzupełnij informację o instytucji z której pochodzi ten wpis
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <InstitutionGroupSelect
                                    ref={institutionGroup} 
                                    name="institutionGroupId"
                                    label={`Typ instytucji`}
                                    formik={formik}/>
                            </Grid>
                            <Grid item xs={12}>
                                <InstitutionSelect
                                    name="institution_id"
                                    label={`Instytucja`}
                                    formik={formik}
                                    disabled={institutionGroup.current === null}
                                    institutionGroup={institutionGroup.current}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

DocumentInstitutionCard.propTypes = {
};
