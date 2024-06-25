import {Card, CardContent, Grid} from '@mui/material';
import {TextFieldVariable} from "./components/text-field-variable";
import {MetadataForm} from "@/components/dashboard/reports/report-components/creators/components/metadata-form";


export const TitleBlockForm = (props) => {
    const {
        formik,
        metadataFields,
        ...other
    } = props;

    return (
        <Grid container
              justifyContent="space-between"
              spacing={3}>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name={"name"}
                                           maxLength={128}
                                           label={"Nazwa komponentu"}
                                           description={"Identyfikator techniczny, który nie jest wyświetlany w raporcie końcowym."}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name={"title"}
                                           maxLength={256}
                                           label={"Tytuł"}
                                           description={"Treść głównego nagłówka."}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name={"subtitle"}
                                           maxLength={512}
                                           label={"Podtytuł"}
                                           required={false}
                                           description={"Treść podtytułu, który pojawi się pod nagłówkiem."}/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <MetadataForm formik={formik}
                                      metadataFields={metadataFields}/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

TitleBlockForm.propTypes = {
};
