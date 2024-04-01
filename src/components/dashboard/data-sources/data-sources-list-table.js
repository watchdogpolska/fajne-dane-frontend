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
                        <TableCell align="right">
                            Plik źrodła
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSources.map((source) => {
                        return (
                            <TableRow hover
                                      key={source.id}>
                                <TableCell>
                                    {source.campaignName}
                                </TableCell>
                                <TableCell align="right">
                                    <a href={source.fileUrl} target="_blank">
                                        {source.fileUrl}
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

DataSourcesListTable.propTypes = {
    dataSources: PropTypes.array.isRequired,
};
