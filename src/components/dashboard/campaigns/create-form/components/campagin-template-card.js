import {Button, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {TemplateDropzone} from '../../common/template-dropzone';
import {Download as DownloadIcon} from '../../../../../icons/download';


export const CampaignTemplateCard = (props) => {
    const {
        formik,
        file,
        onDrop,
        disabled,
        downloadMetaTemplate,
        ...other
    } = props;

    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'stretch',
                              flexWrap: 'nowrap',
                              justifyContent: 'space-between',
                              alignContent: 'flex-start'
                          }}>
                        <Box>
                            <Typography variant="h6">
                                Szablon zbioru danych
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2"
                                        sx={{ mt: 1 }}>
                                Wgraj szablon zbioru danych zgodny ze schematem. Możesz pobrać schemat danych, aby zapoznać się z jego strukturą.
                            </Typography>
                        </Box>
                        <Button onClick={downloadMetaTemplate}
                                sx={{
                                    m: 1 , mr: 'auto', ml: 0
                                }}
                                endIcon={(
                                    <DownloadIcon fontSize="small"/>
                                )}
                                variant="outlined">
                            Pobierz schemat
                        </Button>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <TemplateDropzone accept="application/json"
                                          file={file}
                                          onDrop={onDrop}
                                          maxFiles={1}/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

CampaignTemplateCard.propTypes = {
};
