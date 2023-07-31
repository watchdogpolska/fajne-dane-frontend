import {TemplateDropzoneElements} from '../../common/template-dropzone-elements';
import {Card, CardContent, Grid, Typography} from '@mui/material';


export const CampaignValidationCard = (props) => {
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
                            Zgodność ze schematem
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Sprawdź, czy wgrany szablon zbioru danych jest zgodny z schematem
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

CampaignValidationCard.propTypes = {
};
