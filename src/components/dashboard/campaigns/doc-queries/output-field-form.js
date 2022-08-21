import {Divider, Typography} from '@mui/material';
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import WidgetFactory from './widgets/widget-factory';


export const OutputFieldForm = (props) => {
    const {
        values,
        enableEdit,
        setAnswerValues,
        showConflicts,
        docQueryRecords,
        ...other
    } = props;
    
    let query = docQueryRecords.docQuery.query;
    let question = query.data[0];
    let outputField = query.outputField;

    let widgetForm = new WidgetFactory().create(
        outputField, values, docQueryRecords, enableEdit, setAnswerValues, showConflicts);

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
