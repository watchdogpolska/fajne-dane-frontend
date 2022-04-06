import {useRouter} from 'next/router';
import * as Yup from 'yup';
import NextLink from 'next/link';
import {useFormik} from 'formik';
import {Alert, Box, Button, Grid, FormHelperText, TextField} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";


export const ChangePasswordForm = (props) => {
    const { 
        token,
        ...other
    } = props;

    const { repositories } = useAuth();
    const router = useRouter();
    const formik = useFormik({
        validateOnBlur: false,
        initialValues: {
            password1: null,
            password2: null
        },
        validationSchema: Yup.object({
            password1: Yup
                .string()
                .max(255)
                .required('Pole jest wymagane'),
            password2: Yup
                .string()
                .max(255)
                .required('Pole jest wymagane')
                .oneOf([Yup.ref('password1'), null], 'Podane hasła nie są takie same')
        }),
        onSubmit: async (values, helpers) => {
            try {
                let response = await repositories.auth.resetPassword({
                    token: token,
                    password: values.password1,
                    password_confirmation: values.password2,
                });

                router.push("/authentication/login");
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
            <TextField error={Boolean(formik.touched.password1 && formik.errors.password1)}
                       fullWidth
                       helperText={formik.touched.password1 && formik.errors.password1}
                       label="Hasło"
                       margin="normal"
                       name="password1"
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       type="password"
                       value={formik.values.password1}/>
            <TextField error={Boolean(formik.touched.password2 && formik.errors.password2)}
                       fullWidth
                       helperText={formik.touched.password2 && formik.errors.password2}
                       label="Potwórz hasło"
                       margin="normal"
                       name="password2"
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       type="password"
                       value={formik.values.password}/>
            {formik.errors.submit && (
                <Box sx={{mt: 3}}>
                    <FormHelperText error>
                        {formik.errors.submit}
                    </FormHelperText>
                </Box>
            )}
            <Box sx={{mt: 2}}>
                <Button disabled={formik.isSubmitting || (formik.values.password1 == null || formik.values.password2 == null)}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained">
                    Utwórz nowe hasło
                </Button>
            </Box>
        </form>
    );
};
