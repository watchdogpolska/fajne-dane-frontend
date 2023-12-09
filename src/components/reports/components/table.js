import React from 'react';
import {Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAuth} from "@/hooks/use-auth";



const TableComponent = (props) => {
    const {
        component,
        layout,
        ...other
    } = props;
    const { datasets } = useAuth();
    let dataset = datasets.datasets[component.dataUrl];
    let data = dataset.data;

    let columns = [];
    for (const [index, column] of data.meta.fields.entries()) {
        if (index > 0) {
            columns.push(<TableCell key={`table-${component.id}-header-${index}`} align="right">{column}</TableCell>);
        } else {
            columns.push(<TableCell key={`table-${component.id}-header-${index}`}>{column}</TableCell>);
        }
    }

    let rows = [];
    for (const [index, row] of data.data.entries()) {
        let cells = [];
        for (const [cellIndex, column] of data.meta.fields.entries()) {
            let value = row[column];
            if (parseFloat(value)) {
                value = parseFloat(value).toFixed(2);
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
