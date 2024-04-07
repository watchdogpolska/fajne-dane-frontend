import React, {useEffect} from "react"
import { Chart as ChartJS } from 'chart.js/auto';
import * as ChartGeo from 'chartjs-chart-geo'

import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';

ChartJS.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

const WOJEDOWDZTWA = 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-min.geojson';
const POWIATY = 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-min.geojson';


const MapChart = (props) => {
    const {
        id,
        values,
        type,
        ...other
    } = props;



    useEffect(()=>{

        let canvas = document.getElementById(`canvas-${id}`)
        if(!canvas) return

        let sourceData = type === "Powiaty" ? POWIATY : WOJEDOWDZTWA;

        const normalizeName = (name) => {
            if (type === "Powiaty") {
                name = name.replace("powiat ", "");
            }
            return name;
        }

        fetch(sourceData).then((r) => r.json()).then((pol) => {
            let states = pol.features;

            states.forEach((d) => {
                let value = values[normalizeName(d.properties.nazwa)];
            });

            const chart = new ChartJS(canvas.getContext("2d"), {
                type: 'choropleth',
                data: {
                    labels: states.map((d) => d.properties.nazwa),
                    datasets: [{
                        label: 'States',
                        outline: states,
                        data: states.map((d) => ({
                            feature: d, value: values[normalizeName(d.properties.nazwa)]
                        })),
                    }]
                },
                options: {
                  showOutline: true,
                  showGraticule: false,
                  plugins: {
                    legend: {
                      display: false
                    },
                  },
                  scales: {
                    projection: {
                      axis: 'xy',
                      projection: 'stereographic'
                    }
                  }
                }
            });
        });
    })


    return (
        <canvas id={`canvas-${id}`}></canvas>
    )
}

export default MapChart;
