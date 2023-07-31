import {Box, Typography} from '@mui/material';
import NextLink from 'next/link';
import {TextButton} from '../../../common/text-button';
import {Eye as EyeIcon} from "@/icons/eye";
import {EyeOff as EyeOffIcon} from "@/icons/eye-off";


export const EyeButton = (props) => {
    const {
        text,
        toggle,
        onToggleClick,
        ...other
    } = props;

    let icon = null;
    if (toggle)
        icon = <EyeOffIcon fontSize="small" sx={{ mr: 1 }}/>;
    else
        icon = <EyeIcon fontSize="small" sx={{ mr: 1 }}/>;

    return (
        <TextButton onClick={onToggleClick}
                    text={text}
                    icon={icon}/>
    );

};
