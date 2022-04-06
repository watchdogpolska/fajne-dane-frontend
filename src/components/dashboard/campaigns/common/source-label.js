import {Box, Typography} from '@mui/material';
import {DocumentText as DocumentTextIcon} from '@/icons/document-text';
import {User as UserIcon} from '@/icons/user';


export const SourceLabel = (props) => {
    const { source, ...other } = props;
    
    let type = "Użytkownik";
    let icon = <UserIcon sx={{color: 'text.secondary'}}/>;
    let value = source.name;

    if (source.hasOwnProperty("file")) {
        type = "Plik";
        icon = <DocumentTextIcon sx={{color: 'text.secondary'}}/>;
    }

    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                { icon}
                <Typography variant="subtitle2">
                    {type}
                </Typography>
            </Box>
            <Box>
                { value }
            </Box>
        </Box>
    );
};
