import {Card, CardContent, Grid, MenuItem, Select, FormControl, InputLabel, Typography} from '@mui/material';


export const InstitutionGroupParentCard = (props) => {
    const {
        formik,
        disabled,
        institutionGroups,
        ...other
    } = props;

    let options = [
        <MenuItem key={'menu-answer-null'}
                  index='null'
                  value='null'>
            Brak
        </MenuItem>
    ];
    institutionGroups.forEach(
        (group) => {
            options.push(
                <MenuItem key={`menu-answer-${group.id}`}
                          index={group.id}
                          value={group.id}>
                    {group.name}
                </MenuItem>
            )
        }
    );

    return (
        <Card className={disabled ? "disabled" : ""}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h6">
                            Ustal hierarchię
                        </Typography>
                        <Typography color="textSecondary"
                                    variant="body2"
                                    sx={{ mt: 1 }}>
                            Zdecyduj, czy dodawany typ instytucji ma typ nadrzędny, np. powiat podlega pod gminę. W przypadku braku typu nadrzędnego pole pozostaw puste.
                        </Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Instytucja nadrzędna</InputLabel>
                            <Select fullWidth
                                    label="Instytucja nadrzędna"
                                    labelId="select-label"
                                    name="parent"
                                    value={formik.values.parent}
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}>
                                {options}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

InstitutionGroupParentCard.propTypes = {
};
