import {Box, Button, Divider, Typography} from '@mui/material';
import {Edit as EditIcon} from '@mui/icons-material';
import {PropertyList} from '../../../../property-list';
import {PropertyListItem} from '../../../../property-list-item';
import {CampaignTemplateDownload} from "./campaign-template-download";


export const CampaignDetailsPreview = (props) => {
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
                <Box sx={{
                         alignItems: 'center',
                         display: 'flex',
                         flexWrap: 'wrap',
                         m: -1,
                         '& > button': {
                             m: 1
                         }
                     }}>
                    <Button
                        onClick={onEdit}
                        size="small"
                        startIcon={(
                            <EditIcon fontSize="small" />
                        )}>
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
            </PropertyList>
            <Divider sx={{ my: 3 }} />
            <Typography
                sx={{ my: 3 }}
                variant="h6"
            >
                Szablon danych
            </Typography>
            <Box>
                <CampaignTemplateDownload campaign={campaign}/>
            </Box>
        </>
    );
};
