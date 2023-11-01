import React from 'react';
import {Grid, Typography} from '@mui/material';


const HTMLComponent = (props) => {
    const {
        component,
        ...other
    } = props;

    return (
        <Grid item md={12}>
            <div dangerouslySetInnerHTML={{__html: component.text}} />
        </Grid>
    );
};

export default HTMLComponent;
