import React from 'react';
import {Grid} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';


import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const BarPlotComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;
    const { datasets } = useAuth();
    let dataset = datasets.getDataset(component.dataUrl);

    let titleFontSize = component.metadata['titleFontSize'] || 24;

    let dataView = component.dataView;
    let source = dataset.data;
    let labels = source.data.map((row) => row[component.index]);
    let y = source.data.map((row) => parseFloat(row[component.value]));

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: component.title,
                color: "#121828",
                font: {
                    size: titleFontSize
                }
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: dataView.values[component.index],
                data: y,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    let width = 6;
    if (layout) {
        width = layout.width;
    }

    return (
        <Grid item md={width} xl={width}>
             <Bar options={options} data={data} />
        </Grid>
    );
};

export default BarPlotComponent;
