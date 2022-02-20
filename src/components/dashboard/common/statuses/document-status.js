import {Link, Chip, Typography} from '@mui/material';

const namesMapping = {
    "CREATED": "BRAK DANYCH",
    "INITIALIZED": "OCZEKUJĄCY",
    "VALIDATING": "W TOKU",
    "CLOSED": "ZAKOŃCZONY"
}

const colorsMapping = {
    "CREATED": "error",
    "INITIALIZED": "warning",
    "VALIDATING": "primary",
    "CLOSED": "secondary"
}


export const DocumentStatus = (props) => {
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
