import {useRouter} from 'next/router';
import * as Yup from 'yup';
import NextLink from 'next/link';
import {useFormik} from 'formik';
import {Alert, Box, Button, Grid, FormHelperText, TextField} from '@mui/material';
import {useMounted} from '../../hooks/use-mounted';
import {useAuth} from "@/hooks/use-auth";


export const ResetPasswordForm = (props) => {
    const { 
        onMessageSent,
        ...other
    } = props;
    
    const router = useRouter();
    const { repositories } = useAuth();
    const formik = useFormik({
        validateOnBlur: false,
        initialValues: {
            email: null,
            submit: null
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Email nie ma poprawnego formatu')
                .max(255)
                .required('Email jest wymagany'),
        }),
        onSubmit: async (values, helpers) => {
            try {
                let response = await repositories.auth.requestResetPassword({email: values.email});
                onMessageSent(values.email);
            } catch (err) {
                console.error(err);

                helpers.setStatus({ success: false });
                helpers.setErrors({
                    submit: `Wystąpił błąd: "${err.response.data['detail']}"`
                });
                helpers.setSubmitting(false);
            }
        }
    });
    
    return (
        <form
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}>
            <TextField error={Boolean(formik.touched.email && formik.errors.email)}
                       fullWidth
                       helperText={formik.touched.email && formik.errors.email}
                       label="Email"
                       margin="normal"
                       name="email"
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       type="email"
                       value={formik.values.email}/>
            {formik.errors.submit && (
                <Box sx={{mt: 3}}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{mt: 2}}>
                <Grid container>
                    <Grid item xs={6}
                          sx={{
                              pr: 2
                          }}>
                        <NextLink href={'/authentication/login'} passHref>
                            <Button disabled={formik.isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="outlined">
                                Wróć
                            </Button>
                        </NextLink>
                    </Grid>
                    <Grid item xs={6}
                          sx={{
                              lr: 2
                          }}>
                        <Button disabled={formik.isSubmitting || (formik.values.email == null)}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained">
                            Odzyskaj hasło
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};
