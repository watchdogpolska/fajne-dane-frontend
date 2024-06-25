import React from 'react';
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {roundTwoDecimal} from "@/utils/math-utils";

function formatCellValue(value, format) {
    if (format === "percentage") {
        return roundTwoDecimal(value* 100) + "%";
    } else {
        return parseFloat(value).toFixed(2);
    }
}


const TableComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;
    const { datasets } = useAuth();
    let dataset = datasets.datasets[component.dataUrl];
    let data = dataset.data;
    let titleFontSize = component.metadata['titleFontSize'] || 24;
    let valueFormat = component.metadata['formatValue'];

    const mapColumnName = function (column) {
        if (column.includes("_name_"))
            return "Nazwa " + component.dataView.keysLabels[column.replace("_name_", "_key_")];
        if (column === "document_id")
            return "Odpowiedzi";
        if (column === "count")
            return "Liczba";

        return (
            component.dataView.keysLabels[column] ||
            component.dataView.valuesLabels[column] ||
            column
        );
    }


    let columns = [];
    for (const [index, column] of data.meta.fields.entries()) {
        let columnName = mapColumnName(column);
        if (index > 0) {
            columns.push(<TableCell key={`table-${component.id}-header-${index}`} align="right">{columnName}</TableCell>);
        } else {
            columns.push(<TableCell key={`table-${component.id}-header-${index}`}>{columnName}</TableCell>);
        }
    }

    let rows = [];
    for (const [index, row] of data.data.entries()) {
        let cells = [];
        for (const [cellIndex, column] of data.meta.fields.entries()) {
            let value = row[column];
            if (column === "document_id") {
                value = formatCellValue(value, valueFormat);
            }

            if (cellIndex > 0) {
                cells.push(<TableCell key={`table-${component.id}-row-${index}-${cellIndex}`}
                                      align="right">{value}</TableCell>);
            } else {
                cells.push(<TableCell key={`table-${component.id}-row-${index}-${cellIndex}`}>{value}</TableCell>);
            }
        }
        rows.push(
           <TableRow
               key={`table-${component.id}-row-${index}`}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
               {cells}
           </TableRow>
       );
    }

    let width = 6;
    if (layout) {
        width = layout.width;
    }

    return (
        <Grid item md={width} xl={width}>
            <Typography variant="h5"
                        mb={2}
                        sx={{fontSize: `{titleFontSize}px !important`}}
                        align="center">
                {component.title}
            </Typography>
            <TableContainer component={Paper} sx={{maxHeight: "300px"}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};

export default TableComponent;
