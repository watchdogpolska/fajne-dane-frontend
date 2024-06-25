import {Card, CardContent, Grid} from '@mui/material';
import {
    TextFieldVariable
} from "@/components/dashboard/reports/report-components/creators/components/text-field-variable";
import {
    DataViewVariable
} from "@/components/dashboard/reports/report-components/creators/components/data-view-variable";
import {MetadataForm} from "@/components/dashboard/reports/report-components/creators/components/metadata-form";


export const FrequencyPlotForm = (props) => {
    const {
        formik,
        metadataFields,
        isUpdating,
        ...other
    } = props;

    let readOnly = isUpdating === true;

    return (
        <Grid container
              justifyContent="space-between"
              spacing={3}>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name="name"
                                           label="Nazwa komponentu"
                                           description="Identyfikator techniczny, który nie jest wyświetlany w raporcie końcowym."/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <DataViewVariable formik={formik}
                                          disableKeys={true}
                                          multiColumns={false}
                                          readOnly={readOnly}
                                          dataSourceId="dataSourceId"
                                          dataSourceColumns="dataSourceColumn"/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name="title"
                                           label="Tytuł wykresu"
                                           description="Tytuł, który będzie wyświetał się nad wykresem."/>
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


FrequencyPlotForm.propTypes = {
};
