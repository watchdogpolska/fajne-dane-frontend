import {Box, Typography} from '@mui/material';
import NextLink from 'next/link';
import {useTheme} from '@mui/material/styles';

export const TextButton = (props) => {
    const {
        text,
        sx,
        disabled,
        icon,
        onClick,
        ...other
    } = props;
    const theme = useTheme();

    sx = sx || {};

    let handleClick = null;
    if (!disabled) {
        handleClick = onClick;
        sx['cursor'] = 'pointer';
    }

    return (
        <Box onClick={handleClick}
             component="div"
             sx={{...{
                 color: disabled ? theme.palette.text.disabled: theme.palette.primary,
                 display: 'flex',
                 alignItems: 'center',
             }, ...sx}}>
            {icon}
            <Typography variant="subtitle2">
                {text}
            </Typography>
        </Box>
    );

};
