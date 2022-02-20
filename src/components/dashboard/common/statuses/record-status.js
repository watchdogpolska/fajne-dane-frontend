import {Link, Chip, Typography} from '@mui/material';

const namesMapping = {
    "CREATED": "BRAK DANYCH",
    "INITIALIZED": "OCZEKUJĄCY",
    "CLOSED": "ZAKOŃCZONY"
}

const colorsMapping = {
    "CREATED": "error",
    "INITIALIZED": "warning",
    "CLOSED": "secondary"
}


export const RecordStatus = (props) => {
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
