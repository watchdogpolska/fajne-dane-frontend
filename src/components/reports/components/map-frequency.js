import React from 'react';
import dynamic from "next/dynamic";
import {Grid} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, });
const Plotly = dynamic(() => import("plotly.js"), { ssr: false, });




const MapFrequencyComponent = (props) => {
    const {
        component,
        ...other
    } = props;
    const { datasets } = useAuth();
    let dataset = datasets.getDataset(component.dataUrl);
    let data = dataset.data;
    let x = data.data.map((row) => row[component.index]);
    let y = data.data.map((row) => row[component.value]);

    return (
        <Grid item md={6} xl={6}>
            {y}
        </Grid>
    );
};

export default MapFrequencyComponent;
