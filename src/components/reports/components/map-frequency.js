import React from 'react';
import {Grid} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {useEffect, useState, useRef} from 'react';
import MapChart from "@/components/reports/components/map-chart";


const WOJEDOWDZTWA = 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-min.geojson';
const POWIATY = 'https://unpkg.com/us-atlas/states-10m.json';


const MapFrequencyComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;
    const { datasets } = useAuth();
    const [geojson, setGeojson] = useState(null);

    let dataset = datasets.getDataset(component.dataUrl);


    useEffect(() => {
        async function fetchData() {
            let response= await fetch(POWIATY);
            let mapData = await response.json();
            setGeojson(mapData);
        }
        if (geojson === null) {
            fetchData();
        }
    }, []);

    if (geojson === null) {
        return null;
    }

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
            <MapChart values={values}/>
        </Grid>
    );
};

export default MapFrequencyComponent;
