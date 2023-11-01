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
            if (cellIndex > 0) {
                cells.push(<TableCell key={`table-${component.id}-row-${index}-${cellIndex}`}
                                      align="right">{row[column]}</TableCell>);
            } else {
                cells.push(<TableCell key={`table-${component.id}-row-${index}-${cellIndex}`}>{row[column]}</TableCell>);
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

    return (
        <Grid item md={6} xl={6}>
            <Grid item md={12}>
                <TableContainer component={Paper}>
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
        </Grid>
    );
};

export default TableComponent;
