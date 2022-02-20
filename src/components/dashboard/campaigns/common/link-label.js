import {Box, Typography} from '@mui/material';
import {DocumentText as DocumentTextIcon} from '@/icons/document-text';


export const LinkLabel = (props) => {
    const { link, ...other } = props;

    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <DocumentTextIcon sx={{color: 'text.secondary', mr: 1}}/>
                <Typography variant="subtitle2">
                    Link
                </Typography>
            </Box>
            <Box>
                <a href={link}>
                    {link}
                </a>
            </Box>
        </Box>
    );
};
