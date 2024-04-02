import {Card, CardContent, Grid} from '@mui/material';
import {
    TextFieldVariable
} from "@/components/dashboard/reports/report-components/creators/components/text-field-variable";
import {
    DataViewVariable
} from "@/components/dashboard/reports/report-components/creators/components/data-view-variable";


export const FrequencyTableForm = (props) => {
    const {
        formik,
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
                                           label="Tytuł tabeli"
                                           description="Tytuł, który będzie wyświetał się nad tabelą."/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};


FrequencyTableForm.propTypes = {
};
