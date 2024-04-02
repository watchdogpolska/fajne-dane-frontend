import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '@/icons/arrow-right';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {Reports as ReportsIcon} from '@/icons/reports';


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
                            ID
                        </TableCell>
                        <TableCell>
                           Nazwa raportu
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
                                    {report.id}
                                </TableCell>
                                <TableCell>
                                    {report.name}
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
                                        <Button component="div"
                                                endIcon={(
                                                    <ReportsIcon fontSize="small" />
                                                )}
                                                size="small"
                                                sx={{ mr: 2 }}
                                                variant="outlined">
                                            Wyświetl
                                        </Button>
                                    </a>
                                    <NextLink href={`/dashboard/reports/${report.id}/details/`}
                                              passHref>
                                        <Button component="a"
                                                variant="contained"
                                                size="small"
                                                endIcon={(
                                                    <ArrowRightIcon fontSize="small" />
                                                )}>
                                            Przejdź
                                        </Button>
                                    </NextLink>
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
