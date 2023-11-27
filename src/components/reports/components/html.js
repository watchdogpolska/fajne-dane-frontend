import React from 'react';
import {Grid, Typography} from '@mui/material';


const HTMLComponent = (props) => {
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
            <div dangerouslySetInnerHTML={{__html: component.text}} />
        </Grid>
    );
};

export default HTMLComponent;
