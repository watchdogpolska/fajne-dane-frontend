import {
    Box,
    Typography
} from '@mui/material';
import {withAuthGuard} from '../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../hocs/with-dashboard-layout';
import {DocumentText as DocumentTextIcon} from '../../../../icons/document-text';
import {User as UserIcon} from '../../../../icons/user';


export const SourceLabel = (props) => {
    const { source, ...other } = props;
    
    let type = "Użytkownik";
    let icon = <UserIcon sx={{color: 'text.secondary'}}/>;
    if (source.hasOwnProperty("file")) {
        type = "Plik";
        icon = <DocumentTextIcon sx={{color: 'text.secondary'}}/>;
    }

    return (
        <Box>
            <div>
                <Typography color="textSecondary"
                            variant="body2"
                            sx={{ mt: 1 }}>
                    { icon }
                    {type}
                </Typography>
            </div>
            <div>
                { source.name }
            </div>
        </Box>
    );
};
