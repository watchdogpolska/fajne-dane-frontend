import {Box, Typography} from '@mui/material';
import NextLink from 'next/link';
import {TextButton} from '../../../common/text-button';
import SaveIcon from '@mui/icons-material/Save';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';


export const EditButtons = (props) => {
    const {
        toggle,
        onToggleClick,
        onSaveClick,
        disableSave,
        ...other
    } = props;

    if (toggle) {
        return (
            <>
                <TextButton onClick={onToggleClick}
                            sx={{
                                mr: 2
                            }}
                            text="Anuluj"/>
                <TextButton onClick={onSaveClick}
                            disabled={disableSave}
                            text={"Zapisz"}
                            icon={(
                                <SaveIcon fontSize="small" sx={{ mr: 1 }}/>
                            )}/>
            </>
        );
    } else {
        return (
            <TextButton onClick={onToggleClick}
                        text="Edytuj"
                        icon={(
                            <PencilAltIcon fontSize="small" sx={{ mr: 1 }}/>
                        )}/>
        );
    }


};
