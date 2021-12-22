import {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {Box, Button, Divider, Drawer, IconButton, TextField, Typography, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Edit as EditIcon} from '@mui/icons-material';
import {X as XIcon} from '../../../../../icons/x';
import {PropertyList} from '../../../../property-list';
import {PropertyListItem} from '../../../../property-list-item';
import {campaignRepository} from '../../../../../api/repositories/campaign-repository';

const statusOptions = [
    {
        label: 'Canceled',
        value: 'canceled'
    },
    {
        label: 'Complete',
        value: 'complete'
    },
    {
        label: 'Pending',
        value: 'pending'
    },
    {
        label: 'Rejected',
        value: 'rejected'
    }
];

const CampaignPreview = (props) => {
    const { lgUp, onApprove, onEdit, onReject, campaign } = props;

    const align = lgUp ? 'horizontal' : 'vertical';
    
    return (
        <>
            <Box
                sx={{
                    fontSize: '0.85rem',
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
                }}
            >
                <Typography
                    color="textSecondary"
                    sx={{ mr: 2 }}
                    variant="overline"
                >
                    Akcje
                </Typography>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexWrap: 'wrap',
                        m: -1,
                        '& > button': {
                            m: 1
                        }
                    }}
                >
                    <Button
                        onClick={onEdit}
                        size="small"
                        startIcon={(
                            <EditIcon fontSize="small" />
                        )}
                    >
                        Edytuj
                    </Button>
                </Box>
            </Box>
            <Typography
                sx={{ my: 3 }}
                variant="h6"
            >
                Szczegóły
            </Typography>
            <PropertyList>
                <PropertyListItem
                    align={align}
                    disableGutters
                    label="Nazwa zbioru"
                    value={campaign.name}
                />
                <PropertyListItem
                    align={align}
                    disableGutters
                    label="Data dodania"
                    value={campaign.created_date}
                />
                <PropertyListItem
                    align={align}
                    disableGutters
                    label="Dodane przez"
                >
                    <Typography
                        color="primary"
                        variant="body2"
                    >
                        {campaign.author}
                    </Typography>
                </PropertyListItem>
            </PropertyList>
            <Divider sx={{ my: 3 }} />
            <Typography
                sx={{ my: 3 }}
                variant="h6"
            >
                Szablon danych
            </Typography>
            <Box>
                tutaj cos do pobrania
            </Box>
        </>
    );
};

const CampaignForm = (props) => {
    const { onCancel, onSave, onDelete, campaign } = props;
    const [loading, setLoading] = useState(false);

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
                await campaignRepository.updateCampaign(
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
            <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.100',
                    borderRadius: 1,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    px: 3,
                    py: 2.5
                }}
            >
                <Typography
                    variant="overline"
                    sx={{ mr: 2 }}
                    color="textSecondary"
                >
                    Campaign
                </Typography>
                <Box sx={{
                         alignItems: 'center',
                         display: 'flex',
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
            <Typography
                sx={{ my: 3 }}
                variant="h6"
            >
                Szczegóły
            </Typography>
            <TextField
                fullWidth
                label="Nazwa zbioru danych"
                margin="normal"
                name="name"
                error={Boolean(formik.touched.name && formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                required
            />
            <TextField
                disabled
                fullWidth
                label="Data dodania"
                margin="normal"
                name="number"
                value={campaign.created_date}
            />
            <Button
                onClick={onDelete}
                color="error"
                sx={{ mt: 3 }}
            >
                Usuń kampanie
            </Button>
        </form>
    );
};

const CampaignDrawerDesktop = styled(Drawer)({
    width: 500,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        position: 'relative',
        width: 500
    }
});

const CampaignDrawerMobile = styled(Drawer)({
    flexShrink: 0,
    maxWidth: '100%',
    height: 'calc(100% - 64px)',
    width: 500,
    '& .MuiDrawer-paper': {
        height: 'calc(100% - 64px)',
        maxWidth: '100%',
        top: 64,
        width: 500
    }
});

export const CampaignDrawer = (props) => {
    const {
        containerRef,
        onClose,
        onDeleteCampaign,
        onCampaignUpdate,
        open,
        campaignId,
        ...other
    } = props;
    
    const [isEditing, setIsEditing] = useState(false);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const [campaign, setCampaign] = useState(null);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    
    async function fetchCampaignData() {
        if (campaignId) {
            let campaign = await campaignRepository.getCampaign({id: campaignId});
            setCampaign(campaign);
            setIsEditing(false);
        }
    }
    
    useEffect(() => {
        fetchCampaignData();
    }, [campaignId]);
    
    const handleFormSave = () => {
        onCampaignUpdate();
    };


    // The reason for doing this, is that the persistent drawer has to be rendered, but not it's
    // content if an order is not passed.
    const content = campaign 
        ? (
            <>
                <Box
                    sx={{
                        alignItems: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        display: 'flex',
                        justifyContent: 'space-between',
                        px: 3,
                        py: 2
                    }}
                >
                    <Typography
                        color="inherit"
                        variant="h6"
                    >
                        {campaign.name}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={onClose}
                    >
                        <XIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        px: 3,
                        py: 4
                    }}
                >
                    {!isEditing
                        ? (
                            <CampaignPreview
                                onApprove={onClose}
                                onEdit={handleEdit}
                                onReject={onClose}
                                campaign={campaign}
                                lgUp={lgUp}
                            />
                        )
                        : (
                            <CampaignForm
                                onCancel={handleCancel}
                                onSave={handleFormSave}
                                onDelete={onDeleteCampaign}
                                campaign={campaign}
                            />
                        )}
                </Box>
            </>
        )
        : null;

    if (lgUp) {
        return (
            <CampaignDrawerDesktop
                anchor="right"
                open={open}
                SlideProps={{ container: containerRef?.current }}
                variant="persistent"
                {...other}>
                {content}
            </CampaignDrawerDesktop>
        );
    }

    return (
        <CampaignDrawerMobile
            anchor="right"
            ModalProps={{ container: containerRef?.current }}
            onClose={onClose}
            open={open}
            SlideProps={{ container: containerRef?.current }}
            variant="temporary"
            {...other}>
            {content}
        </CampaignDrawerMobile>
    );
};

CampaignDrawer.propTypes = {
    containerRef: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    campaign: PropTypes.object
};
