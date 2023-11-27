import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';


export const DataSourcesListTable = (props) => {
    const {
        dataSources,
        ...other
    } = props;

    return (
        <div {...other}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead sx={{ visibility: 'visible' }}>
                    <TableRow>
                        <TableCell>
                           Nazwa kampanii
                        </TableCell>
                        <TableCell>
                           Plik źrodła
                        </TableCell>
                        <TableCell align="right">
                            Akcje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSources.map((source) => {
                        return (
                            <TableRow hover
                                      key={source.id}>
                                <TableCell>
                                    {source.campaign_name}
                                </TableCell>
                                <TableCell>
                                    <a href={source.file_url} target="_blank">
                                        {source.file_url}
                                    </a>
                                </TableCell>
                                <TableCell align="right">
                                    <NextLink href={`/dashboard/sources/${source.id}/edit/`}
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
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

DataSourcesListTable.propTypes = {
    dataSources: PropTypes.array.isRequired,
};
