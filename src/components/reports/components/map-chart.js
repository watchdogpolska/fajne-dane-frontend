import React, {useEffect} from "react"
import { Chart as ChartJS } from 'chart.js/auto';
import * as ChartGeo from 'chartjs-chart-geo'

import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';

ChartJS.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

const WOJEDOWDZTWA = 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/wojewodztwa/wojewodztwa-min.geojson';
const POWIATY = 'https://raw.githubusercontent.com/ppatrzyk/polska-geojson/master/powiaty/powiaty-min.geojson';


const MapChart = (props) => {
//   const chartRef = React.createRef();
//   const myChartRef = this.chartRef.current.getContext("2d");

    const {
        values,
        ...other
    } = props;



    useEffect(()=>{

        let canvas = document.getElementById("canvas-123")
        if(!canvas) return

        let sourceData = WOJEDOWDZTWA;

        fetch(sourceData).then((r) => r.json()).then((pol) => {

            //const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
            //const states = ChartGeo.topojson.feature(us, us.objects.states).features;
            //const states = ChartGeo.topojson.feature(us, us.objects.pol).features;
            let states = pol.features;

            const chart = new ChartJS(canvas.getContext("2d"), {
                type: 'choropleth',
                data: {
                    labels: states.map((d) => d.properties.nazwa),
                    datasets: [{
                        label: 'States',
                        outline: states,
                        data: states.map((d) => ({feature: d, value: values[d.properties.nazwa]})),
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
        <canvas id="canvas-123"></canvas>
    )
}

export default MapChart;
