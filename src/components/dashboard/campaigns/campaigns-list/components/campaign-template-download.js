import {Download as DownloadIcon} from '../../../../../icons/download';
import {textToFile} from '../../../../../utils/text-to-file';
import PropTypes from 'prop-types';
import {Button, Grid, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {Duplicate as DuplicateIcon} from '../../../../../icons/duplicate';


export const CampaignTemplateDownload = (props) => {

    const { campaign } = props;

    const downloadCampaignTemplate = () => {
        textToFile(`${campaign.name}-template.json`, JSON.stringify(campaign.template));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <ListItem
                    key={"path"}
                    sx={{
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 1,
                        '& + &': {
                            mt: 1
                        }
                    }}
                >
                    <ListItemIcon>
                        <DuplicateIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                        primary={`${campaign.name}-template.json`}
                        primaryTypographyProps={{
                            color: 'textPrimary',
                            variant: 'subtitle2'
                        }}
                    />
                </ListItem>
            </Grid>
            <Grid item xs={4}>
                <Button onClick={downloadCampaignTemplate}
                        size="small"
                        variant="outlined">
                    <DownloadIcon fontSize="small"/> Pobierz
                </Button>
            </Grid>
        </Grid>
    );
}

CampaignTemplateDownload.propTypes = {
    campaign: PropTypes.object
};
