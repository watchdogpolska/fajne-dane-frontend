import React from 'react';
import {Grid, Typography} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {useEffect, useState, useRef} from 'react';
import MapChart from "@/components/reports/components/map-chart";


const MapFrequencyComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;
    const { datasets } = useAuth();

    let dataset = datasets.getDataset(component.dataUrl);
    let indexName = component.dataView.keysLabels[component.index.replace("_name_", "_key_")];

    let data = dataset.data;
    let x = data.data.map((row) => row[component.index]);
    let y = data.data.map((row) => parseFloat(row[component.value]));

    let values = {};
    data.data.map((row) => {
        values[row[component.index]] = parseFloat(row[component.value])
    });

    let width = 6;
    if (layout) {
        width = layout.width;
    }

    return (
        <Grid item md={width} xl={width}>
            <Typography color="textSecondary"
                        align={"center"}
                        mb={2}
                        variant="h5">
                {component.title}
            </Typography>
            <MapChart id={component.id}
                      type={indexName}
                      values={values}/>
        </Grid>
    );
};

export default MapFrequencyComponent;
