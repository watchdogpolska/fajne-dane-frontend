import {Box, Typography} from '@mui/material';
import {DocumentText as DocumentTextIcon} from '@/icons/document-text';


export const FileLinkLabel = (props) => {
    const { link, ...other } = props;
    let linkParts = link.split('/');
    let fileName = linkParts[linkParts.length-1];

    return (
        <Box>
            <Box sx={{display: "flex", alignItems: "center"}}>
                <DocumentTextIcon sx={{color: 'text.secondary', mr: 1}}/>
                <Typography variant="subtitle2">
                    Plik
                </Typography>
            </Box>
            <Box>
                <a href={link}>
                    {fileName}
                </a>
            </Box>
        </Box>
    );
};
