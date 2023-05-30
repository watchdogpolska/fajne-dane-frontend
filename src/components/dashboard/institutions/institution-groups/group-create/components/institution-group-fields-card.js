import {useState} from 'react';
import {Card, CardContent, Grid, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import {deepCopy} from "@/utils/deep-copy";


const FIELDS = {
    "address": "Adres instytucji",
    "link": "URL"
};


export const InstitutionGroupFieldsCard = (props) => {
    const {
        formik,
        disabled,
        ...other
    } = props;

    let [values, setValues] = useState(formik.values.fields);

    const handleChange = (event) => {
        let newValues = deepCopy(values);
        if (event.target.checked) {
            newValues.push(event.target.value);
        } else {
            const index = newValues.indexOf(event.target.value);
            if (index > -1) {
                newValues.splice(index, 1);
            }
        }
        setValues(newValues);
        formik.setFieldValue("fields", newValues);
    };

    let options = [];
    for (const [key, value] of Object.entries(FIELDS)) {
        options.push(
            <FormControlLabel control={<Checkbox onChange={handleChange}
                                                 defaultChecked={formik.values.fields.indexOf(key) >= 0}/>}
                              label={value}
                              value={key}
                              key={key}/>
        );
    }

    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <Typography variant="h6">
                            Ustal pola typu instytucji
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Dodaj pola, które opisują typ instytucji, np. jakie dane należy podać, aby opisać urząd, szkołę, stronę internetową itp.
                        </Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <FormGroup>
                            {options}
                        </FormGroup>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

InstitutionGroupFieldsCard.propTypes = {
};
