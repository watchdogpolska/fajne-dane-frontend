import React, {useEffect} from "react"
import { Chart as ChartJS } from 'chart.js/auto';
import * as ChartGeo from 'chartjs-chart-geo'
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';
import {roundTwoDecimal} from "@/utils/math-utils";


ChartJS.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

const WOJEDOWDZTWA = 'https://raw.githubusercontent.com/jusuff/PolandGeoJson/main/data/poland.voivodeships.json';
const POWIATY = 'https://raw.githubusercontent.com/jusuff/PolandGeoJson/main/data/poland.counties.json';
const GMINY = 'https://raw.githubusercontent.com/jusuff/PolandGeoJson/main/data/poland.municipalities.json';


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

        let sourceData = null;
        if (type === "Województwa") {
            sourceData = WOJEDOWDZTWA;
        } else if (type === "Powiaty") {
            sourceData = POWIATY;
        } else {
            sourceData = GMINY;
        }

        const normalizeName = (name) => {
            if (type === "Powiaty") {
                name = name.replace("powiat ", "");
            } else if (type === "Województwa") {
                name = name.toLowerCase();
            }
            return name;
        }

        fetch(sourceData).then((r) => r.json()).then((pol) => {
            let states = pol.features;

            const chart = new ChartJS(canvas.getContext("2d"), {
                type: 'choropleth',
                data: {
                    labels: states.map((d) => d.properties.name),
                    datasets: [{
                        label: 'States',
                        outline: states,
                        data: states.map((d) => ({
                            feature: d, value: roundTwoDecimal(values[normalizeName(d.properties.name)] * 100)
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
                    tooltip: {
                        callbacks: {
                            label(item) {
                                let value = item.formattedValue;
                                return `${item.chart.data?.labels?.[item.dataIndex]}: ${value + "%"}`;
                            },
                        },
                    },
                  },
                  scales: {
                    projection: {
                      axis: 'xy',
                      projection: 'mercator'
                    },
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
