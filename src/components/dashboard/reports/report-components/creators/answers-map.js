import {Card, CardContent, Grid} from '@mui/material';
import {
    TextFieldVariable
} from "@/components/dashboard/reports/report-components/creators/components/text-field-variable";
import {
    DataViewVariable
} from "@/components/dashboard/reports/report-components/creators/components/data-view-variable";


export const AnswersMapForm = (props) => {
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
                                          disableKeys={false}
                                          disableColumns={true}
                                          multiColumns={false}
                                          readOnly={readOnly}
                                          dataSourceId="dataSourceId"
                                          dataSourceKeys="dataSourceKey"/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={12}>
                <Card>
                    <CardContent>
                        <TextFieldVariable formik={formik}
                                           name="title"
                                           label="Tytuł mapy"
                                           description="Tytuł, który będzie wyświetał się nad mapą."/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};


AnswersMapForm.propTypes = {
};
