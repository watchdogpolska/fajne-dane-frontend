import React from 'react';
import {Grid, Typography} from '@mui/material';


const HeaderComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;

    let width = 12;
    if (layout) {
        width = layout.width;
    }

    return (
        <Grid item md={width} xl={width}>
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
