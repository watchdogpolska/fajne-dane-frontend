import React from 'react';
import {useState} from 'react';
import {useAuth} from "@/hooks/use-auth";
import {Grid} from '@mui/material';
import ComponentFactory from "@/components/reports/component-factory";
import {Loading} from '@/components/dashboard/common/loading';
import getReportLayoutOrder from "@/utils/report-layout-utils";


const Report = (props) => {
    const {
        report,
        ...other
    } = props;
    const { datasets } = useAuth();
    const [loading, setLoading] = useState(true);

    let factory = new ComponentFactory();

    let layoutOrder = getReportLayoutOrder(report);
    let components = new Array(report.components.length).fill(null);

    report.components.forEach((component) => {
        if ("dataUrl" in component) {
          datasets.registerDataset(component.dataUrl);
        }
        let layout = report.layout[component.id];
        components[layoutOrder[component.id]] = factory.create(component, layout);
    });
    
    if (loading && Object.keys(datasets.datasets).length === 0)
        setLoading(false);

    datasets.fetch(() => {
        setLoading(false);
    });

    if (loading) {
        return <Loading/>;
    }

    return (
        <Grid container
              justifyContent="space-between"
              spacing={3}>
            {components}

        </Grid>
    );
};

export default Report;
