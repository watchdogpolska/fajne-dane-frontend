import React from 'react';
import {Grid, Typography} from '@mui/material';


const HeaderComponent = (props) => {
    const {
        component,
        ...other
    } = props;

    return (
        <Grid item md={12}>
            <Typography variant="h3"
                        align="center">
                {component.title}
            </Typography>
            <Typography color="textSecondary"
                        align={"center"}
                        variant="h5">
                {component.subtitle}
            </Typography>
        </Grid>
    );
};

export default HeaderComponent;
