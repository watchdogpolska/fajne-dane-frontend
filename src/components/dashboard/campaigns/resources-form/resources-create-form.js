import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {campaignRepository} from '../../../../api/repositories/campaign-repository';
import {textToFile} from '../../../../utils/text-to-file';
import {CampaignNameCard} from "./components/resource-details-card";
import {useHasChanged} from "../../../../hooks/use-has-changed";
import {RedirectBackConfirmModal} from "../../common/redirect-back-confirm-modal";
import {ResourceDetailsCard} from "./components/resource-details-card";
import {ResourceFileCard} from "./components/resource-file-card";
import {ResourceValidationCard} from "./components/resource-validation-card";


export const ResourcesCreateForm = (props) => {
    const {
        campaignId,
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resource, setResource] = useState({
        file: null,
        report: null
    })

    async function fetchCampaignData() {
        if (campaignId) {
            let campaign = await campaignRepository.getCampaign({id: campaignId});
            setCampaign(campaign);
            console.log(campaign);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCampaignData();
    }, []);

    const handleDrop = (newFiles) => {
    };

    const handleRemove = (file) => {
    };

    const handleOnCancel = () => {

    };

    const downloadReport = () => {

    };

    const handleValidate = () => {

    };

    const formik = useFormik({
        initialValues: {
            name: '',
            source: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
            source: Yup.string().max(255),
            description: Yup.string().max(1000),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
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
                        <ResourceFileCard disabled={formik.values.name == ""}
                                              onDrop={handleDrop}
                                              file={resource.file}
                                              formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceValidationCard formik={formik}
                                                file={resource.file}
                                                disabled={formik.values.name == "" || resource.file === null}
                                                validationReport={resource.report}
                                                onDownloadReport={downloadReport}
                                                onDrop={handleDrop}
                                                onRemove={handleRemove}
                                                onValidate={handleValidate}/>
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
                                    variant="contained">
                                Dodaj zbiór danych
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

ResourcesCreateForm.propTypes = {
};
