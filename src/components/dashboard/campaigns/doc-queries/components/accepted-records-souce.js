import {Typography} from '@mui/material';


export const AcceptedRecordsSource = (props) => {
    const {
        acceptedRecords,
        ...other
    } = props;

    if (acceptedRecords.length > 0) {
        let source = acceptedRecords[0].source;
        let sourceName = null;
        if (source.type === "FILE") {
            sourceName = source.name;
        } else {
            sourceName = source.user.email;
        }
        return (
            <Typography color="textSecondary"
                        variant="body2"
                        sx={{
                            mt: 1
                        }}>
                Źródło odpowiedzi: {sourceName}
            </Typography>
        );
    }
    return null;
};
