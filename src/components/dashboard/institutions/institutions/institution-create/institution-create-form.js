import {useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {Loading} from '@/components/dashboard/common/loading';
import {RedirectBackConfirmModal} from "../../../common/redirect-back-confirm-modal";
import {useAuth} from "@/hooks/use-auth";
import {InstitutionDetailsCard} from "./components/institution-details-card";


export const InstitutionCreateForm = (props) => {
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
            name: '',
            key: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
            key: Yup.string().max(255),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                await repositories.institution.create({groupId: group.id, ...values});
                toast.success('Dodano nową instytucję!');
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

    let disabled = false;
    for (let field of ["name", "key", ...group.fields]) {
        if (formik.values[field] === "" || formik.values[field] == null) {
            disabled = true;
            break;
        }
    }

    return (
        <>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <InstitutionDetailsCard formik={formik}
                                                institutionGroup={group}/>
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
                                    disabled={disabled}
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

InstitutionCreateForm.propTypes = {
};
