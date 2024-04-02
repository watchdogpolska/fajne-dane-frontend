import React, {useState} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import NextLink from 'next/link';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {Selector as SelectorIcon} from '@/icons/selector';
import getReportLayoutOrder from "@/utils/report-layout-utils";
import ComponentLayout from "@/api/models/layout/component-layout";
import {deepCopy} from "@/utils/deep-copy";
import {ReportComponentSizeSelect} from "./components/report-component-size-select";
import {ReportComponentType} from "./components/report-component-type";


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "#f8f8f8" : "white",
    ...draggableStyle
});


const getNewLayout = (components) => {
    let layout = {};
    for (let [index, row] of Object.entries(components)) {
        layout[row.id] = new ComponentLayout(parseInt(index), row.width);
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
        if (c.id in report.layout)
            width = report.layout[c.id].width;

        initialData[layoutOrder[c.id]] = {
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

    const onComponentSizeChange = (componentIndex, width) => {
        const newQuestions = deepCopy(questions);
        newQuestions[componentIndex].width = width;
        setQuestions(newQuestions);
        let layout = getNewLayout(newQuestions);
        onLayoutUpdated(layout);
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Id</TableCell>
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
                                                    {component.id}
                                                </TableCell>
                                                <TableCell>
                                                    {component.name}
                                                </TableCell>
                                                <TableCell>
                                                        <ReportComponentType type={component.type}/>
                                                </TableCell>
                                                <TableCell>
                                                    <ReportComponentSizeSelect index={index}
                                                                               value={component.width}
                                                                               onChange={onComponentSizeChange}/>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <NextLink href={`/dashboard/reports/${report.id}/components/${component.id}`}
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
