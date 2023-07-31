import {Card, CardContent, Grid, Typography, TextField} from '@mui/material';
import {InstitutionSelect} from "@/components/dashboard/institutions/institutions/institution-select";


const FIELDS = {
    link: {
        label: "Link do strony instytucji"
    },
    address: {
        label: "Adres instytucji"
    }
}


export const InstitutionDetailsCard = (props) => {
    const {
        formik,
        institutionGroup,
        ...other
    } = props;

    let options = institutionGroup.fields.map((fieldName) => {
        let field = FIELDS[fieldName];
        return <Grid key={fieldName} item xs={12}>
            <TextField
                fullWidth
                label={field.label}
                name={fieldName}
                error={Boolean(formik.touched.name && formik.errors[fieldName])}
                helperText={formik.touched[fieldName] && formik.errors[fieldName]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[fieldName]}
                required
            />
        </Grid>
    });

    let institutionParent = null;
    if (institutionGroup.parent)
        institutionParent = (
            <Grid item xs={12}>
                <InstitutionSelect
                    name="parentId"
                    label={`Instytucja nadrzędna (${institutionGroup.parent.name})`}
                    formik={formik}
                    institutionGroup={institutionGroup.parent}/>
            </Grid>
        );

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Informacje o instytucji
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Uzupełnij informacje, które opisują tę instytucję. Pola do uzupełniania mogą być różne w zależności od typu instytucji.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Typ instytucji"
                                    value={institutionGroup.name}
                                    disabled={true}
                                />
                            </Grid>
                            {institutionParent}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nazwa instytucji"
                                    name="name"
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Klucz instytucji"
                                    name="key"
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.key}
                                    required
                                />
                            </Grid>
                            {options}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

InstitutionDetailsCard.propTypes = {
};
