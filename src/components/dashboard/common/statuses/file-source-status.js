import {Link, Chip, Typography} from '@mui/material';


const namesMapping = {
    "CREATED": "UTWORZONY",
    "PROCESSING": "PRZETWARZANY",
    "FINISHED": "ZAŁADOWANY",
    "FAILED": "BŁĄD"
}

const colorsMapping = {
    "CREATED": "primary",
    "PROCESSING": "warning",
    "FINISHED": "secondary",
    "FAILED": "error"
}



export const FileSourceStatus = (props) => {
    const {
        status,
        ...other
    } = props;

    return (
        <Chip label={namesMapping[status]}
              color={colorsMapping[status]}
              size="small"
              sx={{ ml: 0 }}/>
    );
};
