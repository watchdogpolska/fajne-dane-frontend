import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {useRouter} from 'next/router'
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {Box, Button, Grid} from '@mui/material';
import {campaignRepository} from '../../../../api/repositories/campaign-repository';
import {templateRepository} from '../../../../api/repositories/template-repository';
import {textToFile} from '../../../../utils/text-to-file';
import {CampaignDetailsCard} from "./components/campaign-details-card";
import {CampaignTemplateCard} from "./components/campagin-template-card";
import {CampaignValidationCard} from "./components/campaign-validation-card";
import {useHasChanged} from "../../../../hooks/use-has-changed";
import {RedirectBackConfirmModal} from "../../common/redirect-back-confirm-modal";


export const CampaignCreateForm = (props) => {
    const {
        ...other
    } = props;

    const router = useRouter();
    const [cancelModalOpen, setCancelModalOpen ] = useState(false);
    const [loading, setLoading] = useState();
    const [metaTemplate, setMetaTemplate] = useState();
    const [template, setTemplate] = useState({
        "file": null,
        "template": null,
        "report": null
    });
    const [hasTemplateChanged, prevTemplate] = useHasChanged(template);

    useEffect(() => {
        async function fetchData() {
            let metaTemplate = await templateRepository.getMetaTemplate();
            setMetaTemplate(metaTemplate);
        }
        fetchData();
    }, []);

    const handleDrop = (newFiles) => {
        setTemplate({
            file: newFiles[0],
            template: null,
            report: null
        });
    };

    const handleRemove = (file) => {
        setTemplate({
            file: null,
            template: null,
            report: null
        });
    };

    useEffect(() => {
        if (hasTemplateChanged && prevTemplate) {
            if (template.file && template.file !== prevTemplate.file)
                loadFile(template.file);
        }
    }, [template]);
    
    const loadFile = (file) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
            let parsedData = JSON.parse(e.target.result);
            setTemplate({
                file: template.file,
                template: parsedData,
                report: null
            });
        };
    };

    const handleValidate = () => {
        async function fetchData() {
            let report = await templateRepository.validate({template: template.template});
            setTemplate({
                file: template.file,
                template: template.template,
                report: report
            });
        }
        fetchData();
    };

    const downloadReport = () => {
        textToFile("validation-report.json", JSON.stringify(template.report));
    };

    const downloadMetaTemplate = () => {
        textToFile("campaign-meta-template.json", JSON.stringify(metaTemplate.template));
    };

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
                values['template'] = template.template;
                await campaignRepository.createCampaign(values);
                toast.success('Dodano nową kampanię!');
                router.push('/dashboard/campaigns');
            } catch (err) {
                console.error(err);
            }
        }
    });

    const handleOpenCancel = () => {setCancelModalOpen(true)};
    const handleCloseCancel = () => {setCancelModalOpen(false)};
    const handleAcceptCancel = (e) => {
        e.preventDefault();
        router.push('/dashboard/campaigns');
    };

    if (loading)
        return <div>Loading</div>;

    if (metaTemplate === null)
        return <div>Loading</div>;

    return (
        <>
            <RedirectBackConfirmModal open={cancelModalOpen}
                                      onClose={handleCloseCancel}
                                      onAccept={handleAcceptCancel}/>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CampaignDetailsCard formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CampaignTemplateCard downloadMetaTemplate={downloadMetaTemplate}
                                              disabled={formik.values.name == ""}
                                              onDrop={handleDrop}
                                              file={template.file}
                                              formik={formik}/>
                    </Grid>
                    <Grid item xs={12}>
                        <CampaignValidationCard formik={formik}
                                                file={template.file}
                                                disabled={formik.values.name == "" || template.template === null}
                                                validationReport={template.report}
                                                onDownloadReport={downloadReport}
                                                onDrop={handleDrop}
                                                onRemove={handleRemove}
                                                onValidate={handleValidate}/>
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
                                    disabled={!(template.report && template.report.isValid)}
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

CampaignCreateForm.propTypes = {
};
