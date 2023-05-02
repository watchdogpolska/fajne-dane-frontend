import {Card, CardContent, Grid, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material';


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

    let options = [];
    for (const [key, value] of Object.entries(FIELDS)) {
        options.push(
            <FormControlLabel control={<Checkbox />} label={value} value={key} key={key}/>
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
