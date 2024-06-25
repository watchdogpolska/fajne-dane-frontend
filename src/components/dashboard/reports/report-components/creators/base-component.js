import React from "react"
import {Box, Button, Card, CardContent, Grid} from '@mui/material';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import {useAuth} from "@/hooks/use-auth";
import {useState} from 'react';
import toast from 'react-hot-toast';
import {Loading} from "@/components/dashboard/common/loading";
import {RedirectBackConfirmModal} from "@/components/dashboard/common/redirect-back-confirm-modal";
import {DeleteConfirmModal} from '@/components/dashboard/common/delete-confirm-modal';
import {ComponentConfigs} from "@/components/dashboard/reports/report-components/creators/configs";




export const BaseComponentForm = (props) => {
    const {
        componentType,
        reportId,
        componentId,
        initialValues,
        ...other
    } = props;
    const router = useRouter();
    const { repositories } = useAuth();

    let isUpdating = componentId != null;

    let config = ComponentConfigs[componentType];
    let fields = Object.keys(config.defaultValues);
    let requiredFields = config.requiredFields;
    let metadataFields = config.metadataFields;

    let _initialValues = initialValues || config.defaultValues;

    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: _initialValues,
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                if (isUpdating) {
                    await repositories.reportComponent.updateComponent(componentId, values);
                    toast.success('Komponent został zaaktualizowany!');
                } else {
                    await repositories.reportComponent.createComponent(componentType, reportId, values);
                    toast.success('Dodano nowy komponent!');
                }
                router.push(`/dashboard/reports/${reportId}/details`);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push(`/dashboard/reports/${reportId}/details/`);
    };

    const handleOpenDelete = () => {setDeleteModalOpen(true)};
    const handleCloseDelete = () => {setDeleteModalOpen(false)};
    const handleAcceptDelete = async (e) => {
        e.preventDefault();
        await repositories.reportComponent.deleteComponent(componentId);
        toast.success('Komponent został usunięty!');
        router.push(`/dashboard/reports/${reportId}/details/`);
    };

    const checkSubmitEnabled = function()
    {
        let isAnyEmpty = false;
        fields.forEach((fieldName) => {
            if (requiredFields.indexOf(fieldName) >= 0) {
                isAnyEmpty = isAnyEmpty || (formik.values[fieldName] === "");
            }
        });
        if (isAnyEmpty)
            return false

        if (isUpdating) {
            let isNotInitial = false;
            fields.forEach((fieldName) => {
                isNotInitial = isNotInitial || (formik.values[fieldName] !== _initialValues[fieldName]);
            });
            if (!isNotInitial)
                return false;
        }

        return true;
    }

    if (loading) {
        return <Loading/>;
    }

    let componentForm = React.createElement(
        config.component,
        {formik: formik, isUpdating: isUpdating, metadataFields: metadataFields}
    );

    return (
        <>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <DeleteConfirmModal open={deleteModalOpen}
                                header="Usunać wybrany komponent?"
                                message1="Czy jesteś pewien, że chcesz usunąć wybrany komponent?"
                                message2="Uwaga, operacja usunięcia wpisów jest nieodwracalna."
                                onClose={handleCloseDelete}
                                onAccept={handleAcceptDelete}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {componentForm}
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
                            {
                                isUpdating ?
                                    <Button onClick={handleOpenDelete}
                                            sx={{ m: 1, ml: 'auto' }}
                                            variant="outlined" color="error">
                                        Usuń
                                    </Button> : null
                            }
                            <Button onClick={handleOpenCancel}
                                    sx={isUpdating ? {m: 1} : { m: 1 , ml: 'auto'}}
                                    variant="outlined">
                                Anuluj
                            </Button>
                            <Button sx={{ m: 1 }}
                                    type="submit"
                                    disabled={!checkSubmitEnabled()}
                                    variant="contained">
                                {
                                    isUpdating ?
                                    "Aktualizuj komponent" :
                                    "Dodaj komponent"
                                }
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

BaseComponentForm.propTypes = {
};
