import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {textToFile} from '@/utils/text-to-file';
import {ResourceDetailsCard} from "./components/resource-details-card";
import {RedirectBackConfirmModal} from "../../common/redirect-back-confirm-modal";
import {ResourceFileCard} from "./components/resource-file-card";
import {useAuth} from "@/hooks/use-auth";
import {ResourceValidationCard} from "./components/resource-validation-card";


export const ResourcesCreateForm = (props) => {
    const {
        campaignId,
        ...other
    } = props;

    const router = useRouter();
    const { repositories } = useAuth();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resource, setResource] = useState({
        file: null,
        report: null,
        isValidating: false
    })

    async function fetchCampaignData() {
        if (campaignId) {
            let campaign = await repositories.campaign.getCampaign({id: campaignId});
            setCampaign(campaign);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCampaignData();
    }, []);

    const handleDrop = (newFiles) => {
        setResource({
            file: newFiles[0],
            report: null,
            isValidating: false
        });
    };

    const handleRemove = (file) => {
        setResource({
            file: null,
            report: null,
            isValidating: false
        });
    };

    const downloadReport = () => {
        textToFile("resource-parsing-report.json", JSON.stringify(resource.report));
    };

    const handleValidate = () => {
        async function fetchData() {
            setResource({
                file: resource.file,
                report: null,
                isValidating: true,
            });

            let report = await repositories.fileSource.validate({
                campaignId: campaign.id,
                file: resource.file
            });

            setResource({
                file: resource.file,
                report: report,
                isValidating: false,
            });
        }
        
        fetchData();
    };

    const formik = useFormik({
        initialValues: {
            name: null,
            sourceLink: null,
            sourceDate: null,
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255).required(),
            sourceLink: Yup.string().url().max(255).required(),
            sourceDate: Yup.date().required(),
            description: Yup.string().max(1000),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                await repositories.fileSource.create({
                    campaignId: campaign.id,
                    name: values['name'],
                    description: values['description'],
                    sourceLink: values['sourceLink'],
                    sourceDate: values['sourceDate'],
                    file: resource.file
                });
                toast.success('Dodano nowe źródło danych!');
                router.push(`/dashboard/campaigns/${campaign.id}/`);
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push(`/dashboard/campaigns/${campaign.id}/`);
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
                        <ResourceFileCard disabled={
                                            formik.values.name == "" ||
                                            formik.values.source == ""
                                          }
                                          onDrop={handleDrop}
                                          file={resource.file}
                                          formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <ResourceValidationCard formik={formik}
                                                file={resource.file}
                                                disabled={
                                                    formik.values.name == "" ||
                                                    formik.values.source == "" ||
                                                    resource.file === null
                                                }
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
                                    disabled={
                                        formik.values.name == "" ||
                                        formik.values.source == "" ||
                                        resource.report === null
                                    }
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
