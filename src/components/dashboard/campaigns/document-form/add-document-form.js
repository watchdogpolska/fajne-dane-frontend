import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {RedirectBackConfirmModal} from "../../common/redirect-back-confirm-modal";
import {Loading} from '@/components/dashboard/common/loading';
import {DocumentDetailsCard} from './components/document-details-card';
import {useAuth} from "@/hooks/use-auth";


export const AddDocumentForm = (props) => {
    const {
        campaign,
        ...other
    } = props;

    const router = useRouter();
    const { repositories } = useAuth();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [loading, setLoading] = useState(false);

    let initialValues = {};
    let validationSchema = {};
    for (let field of campaign.documentFields) {
        initialValues[field.name] = "";
        validationSchema[field.name] = Yup.string().max(255);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                let document = await repositories.document.createDocument({
                    campaignId: campaign.id,
                    data: formik.values
                });

                console.log(document);
                toast.success('Dokument zostały dodany');
                router.push(`/dashboard/campaigns/${campaign.id}/documents/${document.id}`);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push(`/dashboard/campaigns/${campaign.id}`);
    };

    let disabled = false;
    for (let field of campaign.documentFields)
        if (formik.values[field.name] == "") {
            disabled = true;
            break;
        }

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
                        <DocumentDetailsCard documentFields={campaign.documentFields}
                                             formik={formik}/>
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
                                    disabled={disabled}
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

AddDocumentForm.propTypes = {
};
