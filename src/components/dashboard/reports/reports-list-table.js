import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';


export const ReportsListTable = (props) => {
    const {
        reports,
        ...other
    } = props;

    return (
        <div {...other}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead sx={{ visibility: 'visible' }}>
                    <TableRow>
                        <TableCell>
                           Nazwa raportu
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell align="right">
                            Akcje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => {
                        return (
                            <TableRow hover
                                      key={report.id}>
                                <TableCell>
                                    {report.name}
                                </TableCell>
                                <TableCell>
                                    {report.status}
                                </TableCell>
                                <TableCell align="right">
                                    <NextLink href={`/dashboard/reports/${report.id}/edit/`}
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
                                    <a href={`/reports/${report.id}/`} target="_blank">
                                        <Button component="a"
                                                endIcon={(
                                                    <PencilAltIcon fontSize="small" />
                                                )}
                                                size="small"
                                                variant="contained">
                                            Przejdź
                                        </Button>
                                    </a>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

ReportsListTable.propTypes = {
    reports: PropTypes.array.isRequired,
};
