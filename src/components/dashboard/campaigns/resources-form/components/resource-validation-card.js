import {TemplateDropzoneElements} from '../../common/template-dropzone-elements';
import {Card, CardContent, Grid, Typography} from '@mui/material';


export const ResourceValidationCard = (props) => {
    const {
        formik,
        validationReport,
        file,
        disabled,
        onDrop,
        onDownloadReport,
        onRemove,
        onValidate,
        ...other
    } = props;


    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Zgodność z szablonem
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Sprawdź, czy plik ze źródłem danych jest zgodny z szablonem zbioru danych.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        {
                            file ?
                                <TemplateDropzoneElements file={file}
                                                          onDrop={onDrop}
                                                          validationReport={validationReport}
                                                          onDownloadReport={onDownloadReport}
                                                          onRemove={onRemove}
                                                          onValidate={onValidate}/>
                                :
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejsciu pojawi się wgrany plik
                                </Typography>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

ResourceValidationCard.propTypes = {
};
