import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {Loading} from '@/components/dashboard/common/loading';
import {useAuth} from "@/hooks/use-auth";
import {ReportNameCard} from "./components/report-name-card";
import {RedirectBackConfirmModal} from "@/components/dashboard/common/redirect-back-confirm-modal";
import {DeleteConfirmModal} from "@/components/dashboard/common/delete-confirm-modal";


export const ReportCreateForm = (props) => {
    const {
        report,
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);
    const { repositories } = useAuth();

    let isUpdating = report != null;

    const formik = useFormik({
        initialValues: {
            name: isUpdating ? report.name : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                if (isUpdating) {
                    await repositories.report.updateReport(report.id, values);
                    toast.success('Raport został zaaktualizowany!');
                    router.push(`/dashboard/reports`);
                } else {
                    let result = await repositories.report.createReport(values);
                    toast.success('Dodano nowy raport!');
                    router.push(`/dashboard/reports/${result.id}/details`);
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push('/dashboard/reports');
    };

    const handleOpenDelete = () => {setDeleteModalOpen(true)};
    const handleCloseDelete = () => {setDeleteModalOpen(false)};
    const handleAcceptDelete = async (e) => {
        e.preventDefault();
        await repositories.report.deleteReport(report.id);
        toast.success('Raport został usunięty!');
        router.push(`/dashboard/reports`);
    };

    if (loading)
        return <Loading/>;

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen}
                                header="Usunać wybrany raport"
                                message1="Czy jesteś pewien, że chcesz usunąć wybrany raport?"
                                message2="Uwaga, operacja usunięcia typu instytucji jest nieodwracalna."
                                onClose={handleCloseDelete}
                                onAccept={handleAcceptDelete}/>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ReportNameCard formik={formik}/>
                        <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                mx: -1,
                                mb: -1,
                                mt: 3
                            }}>
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
                                    disabled={!(formik.values.name !== "")}
                                    variant="contained">
                                { isUpdating ?
                                    "Aktualizuj raport"
                                    :
                                    "Dodaj raport"
                                }
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

ReportCreateForm.propTypes = {
};
