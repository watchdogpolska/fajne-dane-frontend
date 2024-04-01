import {Card, CardContent, Grid} from '@mui/material';
import {TextFieldVariable} from "./components/text-field-variable";


export const TitleBlockForm = (props) => {
    const {
        formik,
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
                                           label={"Podtytuł"}
                                           description={"Treść podtytułu, który pojawi się pod nagłówkiem."}/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

TitleBlockForm.propTypes = {
};
