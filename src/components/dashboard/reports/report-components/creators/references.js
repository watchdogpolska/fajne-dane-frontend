import {Card, CardContent, Grid} from '@mui/material';
import {TextFieldVariable} from "./components/text-field-variable";


export const ReferencesForm = (props) => {
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
        </Grid>
    );
};

ReferencesForm.propTypes = {
};
