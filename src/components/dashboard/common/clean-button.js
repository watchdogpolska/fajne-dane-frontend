import {Button, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';

export const CleanButton = (props) => {
    const {
        text,
        onClick,
        ...other
    } = props;
    const theme = useTheme();


    return (
        <Button onClick={onClick}
             sx={{
                 color: theme.palette.primary,
                 display: 'flex',
                 alignItems: 'center',
             }}
             component="div">
            <Typography variant="subtitle2"
                        sx={{
                            marginRight: "10px"
                        }}>
                {text}
            </Typography>
            <CancelIcon/>
        </Button>
    );

};
