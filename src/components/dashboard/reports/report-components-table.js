import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NextLink from 'next/link';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {Selector as SelectorIcon} from '@/icons/selector';
import getReportLayoutOrder from "@/utils/report-layout-utils";
import ComponentLayout from "@/api/models/layout/component-layout";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#757ce8" : "white",
    ...draggableStyle
});


const getNewLayout = (components) => {
    let layout = {};
    for (let [index, row] of Object.entries(components)) {
        layout[row.name] = new ComponentLayout(parseInt(index), row.width);
    }
    return layout;
};


export const ReportComponentsTable = (props) => {
    const {
        report,
        onLayoutUpdated,
        ...other
    } = props;


    let initialData = new Array(report.components.length).fill(null);
    let layoutOrder = getReportLayoutOrder(report);


    report.components.forEach((c) => {
        let width = 6;
        if (c.name in report.layout)
            width = report.layout[c.name].width;

        initialData[layoutOrder[c.name]] = {
            id: c.id,
            name: c.name,
            type: c.type,
            width: width,
        }
    });
    const [questions, setQuestions] = useState(initialData);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        let movedItems = reorder(
            questions,
            result.source.index,
            result.destination.index
        );
        setQuestions(movedItems);

        let layout = getNewLayout(movedItems);
        onLayoutUpdated(layout);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Nazwa</TableCell>
                        <TableCell>Typ</TableCell>
                        <TableCell>Rozmiar</TableCell>
                        <TableCell align="right">Akcje</TableCell>
                    </TableRow>
                </TableHead>
                {/* <TableBody> */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <TableBody
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {questions.map((component, index) => (
                                    <Draggable
                                        key={component.id}
                                        draggableId={"q-" + component.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <TableRow
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <TableCell>
                                                    <SelectorIcon fontSize="small" />
                                                </TableCell>
                                                <TableCell>
                                                    {component.name}
                                                </TableCell>
                                                <TableCell>
                                                    {component.type}
                                                </TableCell>
                                                <TableCell>
                                                    {component.width}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <NextLink href={`/dashboard/reports/edit/`}
                                                              passHref>
                                                        <Button component="a"
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ mr: 2 }}
                                                                endIcon={(
                                                                    <PencilAltIcon fontSize="small" />
                                                                )}>
                                                            Edytuj
                                                        </Button>
                                                    </NextLink>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </TableBody>
                        )}
                    </Droppable>
                </DragDropContext>
                {/* </TableBody> */}
            </Table>
        </TableContainer>
    );
};
