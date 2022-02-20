import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {formatDate} from "@/utils/date-utils";
import {LinkLabel} from "../common/link-label";
import {FileLinkLabel} from "../common/file-link-label";


export const FileSourcesListTable = (props) => {
    const {
        campaignId,
        fileSources,
        ...other
    } = props;

    return (
        <div {...other}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead sx={{ visibility: 'visible' }}>
                    <TableRow>
                        <TableCell>
                            Nazwa i autor zbioru danych
                        </TableCell>
                        <TableCell>
                            Źródło pozyskania danych
                        </TableCell>
                        <TableCell>
                            Data opracowania źródła
                        </TableCell>
                        <TableCell>
                            Plik źródłowy
                        </TableCell>
                        <TableCell align="right">
                            Akcje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fileSources.map((fileSource) => {
                        return (
                            <TableRow hover
                                      key={fileSource.id}>
                                <TableCell>
                                    {fileSource.name}
                                </TableCell>
                                <TableCell>
                                    <LinkLabel link={fileSource.sourceLink}/>
                                </TableCell>
                                <TableCell>
                                    {formatDate(fileSource.sourceDate)}
                                </TableCell>
                                <TableCell>
                                    <FileLinkLabel link={fileSource.file}/>
                                </TableCell>
                                <TableCell align="right">
                                    <NextLink href={`/dashboard/campaigns/${campaignId}/resources/${fileSource.id}`}
                                              passHref>
                                        <Button component="a"
                                                endIcon={(
                                                    <PencilAltIcon fontSize="small" />
                                                )}
                                                size="small"
                                                variant="outlined">
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

FileSourcesListTable.propTypes = {
    fileSources: PropTypes.array.isRequired,
};
