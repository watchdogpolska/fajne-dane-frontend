import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {fileSourceRepository} from '../../../../api/repositories/file-source-repository';
import {ResourceDetailsCard} from "./components/resource-details-card";
import {RedirectBackConfirmModal} from "../../common/redirect-back-confirm-modal";


export const ResourceEditForm = (props) => {
    const {
        resourceId,
        resource,
        campaignId,
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: resource.name,
            source: resource.source,
            description: resource.description
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
            source: Yup.string().max(255),
            description: Yup.string().max(1000),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                await fileSourceRepository.patchFileSource({
                    campaignId: campaignId,
                    id: resourceId,
                    name: values['name'],
                    description: values['description'],
                    source: values['source'],
                });
                toast.success('Zmiany zostały zapisane');
                router.push(`/dashboard/campaigns/${campaignId}/resources`);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push(`/dashboard/campaigns/${campaignId}/resources`);
    };

    if (loading)
        return <div>Loading</div>;

    return (
        <>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ResourceDetailsCard formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
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
                                    disabled={
                                        formik.values.name == "" ||
                                        formik.values.source == ""
                                    }
                                    variant="contained">
                                Zapisz zmiany
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

ResourceEditForm.propTypes = {
};
