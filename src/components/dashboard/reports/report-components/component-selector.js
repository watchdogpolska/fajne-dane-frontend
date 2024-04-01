import React from "react"
import {Card, CardActions, CardContent, Button, Grid, Typography} from '@mui/material';
import {useState} from 'react';
import {BaseComponentForm} from "@/components/dashboard/reports/report-components/creators/base-component";
import {ComponentConfigs} from "@/components/dashboard/reports/report-components/creators/configs";

export const ReportComponentSelector = (props) => {
    const {
        reportId,
        ...other
    } = props;

    const [selectedType, setSelectedType] = useState(null);


    const createComponentCard = (name, description, typeName, iconType) => {
        let icon = React.createElement(iconType, { sx: {fontSize: 60}});
        return (
            <Grid item xl={3} md={4} key={name}>
                <Card sx={{width: "100%"}}>
                    <CardContent sx={{paddingBottom: "5px"}}>
                        <Typography sx={{textAlign: "center"}}>
                            {icon}
                        </Typography>
                        <Typography variant="h5"
                                    sx={{mb: 1, textAlign: "center"}}>
                            {name}
                        </Typography>
                        <Typography variant="body1" sx={{height: "60px"}}>
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{float: "right"}}>
                        <Button component="a"
                                variant="outlined"
                                onClick={() => {setSelectedType(typeName)}}
                                size="small">
                            Dodaj komponent
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    };
    

    if (selectedType == null) {
        let components = [];
        Object.values(ComponentConfigs).forEach((value) => {
            components.push(createComponentCard(value.name, value.description, value.typeName, value.icon));
        });
        return (
            <Grid container
                  justifyContent="space-between"
                  spacing={2}>
                {components}
            </Grid>
        );
    } else {
        return (
            <BaseComponentForm componentType={selectedType}
                               reportId={reportId}/>
        );
    }
};

ReportComponentSelector.propTypes = {
};
