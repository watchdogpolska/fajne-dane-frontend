import {Link, Chip, Typography} from '@mui/material';

const namesMapping = {
    "CREATED": "BRAK DANYCH",
    "INITIALIZED": "OCZEKUJĄCY",
    "VALIDATING": "OCZEKUJĄCY",
    "CLOSED": "ZAKOŃCZONY"
}

const colorsMapping = {
    "CREATED": "error",
    "INITIALIZED": "warning",
    "VALIDATING": "warning",
    "CLOSED": "secondary"
}


export const CampaignStatus = (props) => {
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
