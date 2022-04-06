import {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {Box, Button, Divider, Drawer, TextField, Typography} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {CampaignTemplateDownload} from "./campaign-template-download";


export const CampaignDetailsForm = (props) => {
    const { onCancel, onSave, onDelete, campaign } = props;
    const [loading, setLoading] = useState(false);
    const { repositories } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: campaign.name
        },
        validationSchema: Yup.object({
            name: Yup.string().max(255),
        }),
        onSubmit: async (values, helpers) => {
            try {
                setLoading(true);
                await repositories.campaign.updateCampaign(
                    {id: campaign.id, payload: values});
                toast.success('Zaktualizowano kampanię!');
                setLoading(false);
                onSave();
            } catch (err) {
                console.error(err);
            }
        }
    });

    if (loading)
        return <div>LOADING</div>;

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{
                alignItems: 'center',
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'neutral.800'
                    : 'neutral.100',
                borderRadius: 1,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                px: 3,
                py: 1
            }}>
                <Typography variant="overline"
                            sx={{ mr: 2 }}
                            color="textSecondary">
                    Akcje
                </Typography>
                <Box sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    m: -1,
                    '& > button': {
                        m: 1
                    }
                }}>
                    <Button color="primary"
                            type="submit"
                            size="small"
                            variant="contained">
                        Zapisz
                    </Button>
                    <Button onClick={onCancel}
                            size="small"
                            variant="outlined">
                        Anuluj
                    </Button>
                </Box>
            </Box>
            <Typography sx={{ my: 3 }}
                        variant="h6">
                Szczegóły
            </Typography>
            <TextField fullWidth
                       label="Nazwa zbioru danych"
                       margin="normal"
                       name="name"
                       error={Boolean(formik.touched.name && formik.errors.name)}
                       helperText={formik.touched.name && formik.errors.name}
                       onBlur={formik.handleBlur}
                       onChange={formik.handleChange}
                       value={formik.values.name}
                       required/>
            <TextField disabled
                       fullWidth
                       label="Data dodania"
                       margin="normal"
                       name="number"
                       value={campaign.created_date}/>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ my: 3 }}
                        variant="h6">
                Szablon danych
            </Typography>
            <Box>
                <CampaignTemplateDownload campaign={campaign}/>
            </Box>
            <Button onClick={onDelete}
                    color="error"
                    sx={{ mt: 3 }}>
                Usuń kampanie
            </Button>
        </form>
    );
};

