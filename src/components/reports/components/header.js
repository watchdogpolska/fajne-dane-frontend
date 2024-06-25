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
    let titleFontSize = component.metadata['titleFontSize'] || 32;
    let subtitleFontSize = component.metadata['subtitleFontSize'] || 14;

    return (
        <Grid item md={width} xl={width}>
            <Typography variant="h5"
                        sx={{fontSize: `${titleFontSize}px !important`}}
                        align="center">
                {component.title}
            </Typography>
            <Typography color="textSecondary"
                        sx={{fontSize: `${subtitleFontSize}px !important`}}
                        align={"center"}
                        variant="h5">
                {component.subtitle}
            </Typography>
        </Grid>
    );
};

export default HeaderComponent;
