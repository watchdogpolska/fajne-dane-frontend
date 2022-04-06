import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Drawer, IconButton, Typography, useMediaQuery} from '@mui/material';
import {styled} from '@mui/material/styles';
import {X as XIcon} from '@/icons/x';
import {CampaignDetailsForm} from './campaign-details-form';
import {useAuth} from "@/hooks/use-auth";
import {CampaignDetailsPreview} from './campaign-details-preview';


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
    const { repositories } = useAuth();

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };
    
    async function fetchCampaignData() {
        if (campaignId) {
            let campaign = await repositories.campaign.getCampaign({id: campaignId});
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
                <Box sx={{
                        px: 3,
                        py: 4
                    }}>
                    {
                        !isEditing
                        ? (
                            <CampaignDetailsPreview onApprove={onClose}
                                                    onEdit={handleEdit}
                                                    onReject={onClose}
                                                    campaign={campaign}
                                                    lgUp={lgUp}/>
                        )
                        : (
                            <CampaignDetailsForm onCancel={handleCancel}
                                                 onSave={handleFormSave}
                                                 onDelete={onDeleteCampaign}
                                                 campaign={campaign}/>
                        )}
                </Box>
            </>
        )
        : null;

    if (lgUp) {
        return (
            <CampaignDrawerDesktop anchor="right"
                                   open={open}
                                   SlideProps={{ container: containerRef?.current }}
                                   variant="persistent"
                                   {...other}>
                {content}
            </CampaignDrawerDesktop>
        );
    }

    return (
        <CampaignDrawerMobile anchor="right"
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
