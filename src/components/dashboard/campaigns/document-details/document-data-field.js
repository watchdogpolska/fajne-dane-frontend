import {Typography, Grid, ListItem} from '@mui/material';


export const DocumentDataField = (props) => {
    const {
        label,
        value,
        ...other
    } = props;


    return (
        <ListItem sx={{px: 0, py: 2}}>
            <Grid container>
                <Grid item xs={4}>
                    <Typography fontWeight='fontWeightMedium'
                                variant="body2">
                        {label}
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body2">
                        {value}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    );
};
