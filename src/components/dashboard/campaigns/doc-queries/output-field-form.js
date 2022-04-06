import {Typography, Grid, Box, Divider} from '@mui/material';
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import LinearProgress from '@mui/material/LinearProgress';
import WidgetFactory from './widgets/widget-factory';


export const OutputFieldForm = (props) => {
    const {
        value,
        enableEdit,
        setAnswerValue,
        showConflicts,
        docQueryRecords,
        ...other
    } = props;
    
    let query = docQueryRecords.docQuery.query;
    let question = query.data[0];
    let outputField = query.outputField;

    let widgetForm = new WidgetFactory().create(
        outputField, value, docQueryRecords, enableEdit, setAnswerValue, showConflicts);

    return (
        <>
            <Typography variant="subtitle1"
                        color="textSecondary"
                        sx={{
                            paddingTop: "12px",
                            paddingBottom: "20px",
                        }}>
                {question.value}
            </Typography>
            <Divider/>
            <FormControl fullWidth={true}>
                {widgetForm}
            </FormControl>
        </>
    );
};
