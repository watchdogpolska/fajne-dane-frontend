import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {Loading} from '@/components/dashboard/common/loading';
import {RedirectBackConfirmModal} from "../../../common/redirect-back-confirm-modal";
import {useAuth} from "@/hooks/use-auth";
import {InstitutionGroupNameCard} from "./components/institution-group-name-card";
import {InstitutionGroupParentCard} from "./components/institution-group-parent-card";
import {InstitutionGroupFieldsCard} from "./components/institution-group-fields-card";


export const InstitutionGroupEditForm = (props) => {
    const {
        handleOpenDelete,
        institutionGroup,
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);
    const { repositories } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: institutionGroup.name,
            parent: institutionGroup.parent ? institutionGroup.parent.id : 'null',
            fields: institutionGroup.fields
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
            parent: Yup.string().max(255),
            fields: Yup.array(Yup.string().required())
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                values['groupId'] = institutionGroup.id;
                await repositories.institutionGroup.update(values);
                toast.success('Zaktualizowano typ instytucji!');
                router.push('/dashboard/institutions');
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push('/dashboard/institutions');
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
                        <InstitutionGroupNameCard formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InstitutionGroupParentCard disabled={true}
                                                    formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <InstitutionGroupFieldsCard formik={formik}
                                                    disabled={true}/>
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
                            <Button onClick={handleOpenDelete}
                                    sx={{ m: 1 , ml: 'auto'}}
                                    variant="outlined" color="error">
                                Usuń typ
                            </Button>
                            <Button onClick={handleOpenCancel}
                                    sx={{ m: 1 }}
                                    variant="outlined">
                                Anuluj
                            </Button>
                            <Button sx={{ m: 1 }}
                                    type="submit"
                                    disabled={!(formik.values.name !== "")}
                                    variant="contained">
                                Edytuj typ instytucji
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

InstitutionGroupEditForm.propTypes = {
};
