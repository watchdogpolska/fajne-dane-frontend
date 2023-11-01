import React from 'react';
import {useState} from 'react';
import {useAuth} from "@/hooks/use-auth";
import {Grid} from '@mui/material';
import ComponentFactory from "@/components/reports/component-factory";
import {Loading} from '@/components/dashboard/common/loading';


const Report = (props) => {
    const {
        report,
        ...other
    } = props;
    const { datasets } = useAuth();
    const [loading, setLoading] = useState(true);

    let factory = new ComponentFactory();
    let components = [];

    report.components.forEach((component) => {
        if ("dataUrl" in component) {
          datasets.registerDataset(component.dataUrl);
        }
        components.push(factory.create(component));
    });

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
