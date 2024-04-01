import {Card, CardContent, Grid} from '@mui/material';
import {TextFieldVariable} from "./components/text-field-variable";
import {HtmlFieldVariable} from "./components/html-field-variable";


export const HtmlBodyForm = (props) => {
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
                        <HtmlFieldVariable formik={formik}
                                           name={"text"}
                                           label={"Treść tekstu"}
                                           description={"Tutaj treść."}/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

HtmlBodyForm.propTypes = {
};
