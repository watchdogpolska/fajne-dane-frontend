import {useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {Loading} from '@/components/dashboard/common/loading';
import {RedirectBackConfirmModal} from "../../../common/redirect-back-confirm-modal";
import {useAuth} from "@/hooks/use-auth";
import {InstitutionValidateFileCard} from "./components/institution-validate-file-card";
import {InstitutionUploadFileCard} from "./components/institution-upload-file-card";


export const InstitutionUploadFileForm = (props) => {
    const {
        group,
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);
    const { repositories } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                await repositories.institutions.create(values);
                toast.success('Dodano nowe instytucje!');
                router.push(`/dashboard/institutions/${group.id}`);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push(`/dashboard/institutions/${group.id}`);
    };

    if (loading)
        return <Loading/>;

    return (
        <>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InstitutionUploadFileCard group={group}
                                                   formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InstitutionValidateFileCard formik={formik} />
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                mx: -1,
                                mb: -1,
                                mt: 3
                            }}
                        >
                            <Button onClick={handleOpenCancel}
                                    sx={{ m: 1 , ml: 'auto'}}
                                    variant="outlined">
                                Anuluj
                            </Button>
                            <Button sx={{ m: 1 }}
                                    type="submit"
                                    disabled={true}
                                    variant="contained">
                                Dodaj instytucje
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

InstitutionUploadFileForm.propTypes = {
};
