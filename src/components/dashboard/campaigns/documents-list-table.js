import {useEffect, useState} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Checkbox,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import {ArrowRight as ArrowRightIcon} from '../../../icons/arrow-right';
import {PencilAlt as PencilAltIcon} from '../../../icons/pencil-alt';
import {Scrollbar} from '../../scrollbar';
import {SourceLabel} from './common/source-label';


export const DocumentsListTable = (props) => {
    const {
        documents,
        documentsCount,
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        ...other
    } = props;
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    useEffect(() => {
            if (selectedDocuments.length) {
                setSelectedDocuments([]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [documents]);

    const handleSelectAllDocuments = (event) => {
        setSelectedDocuments(event.target.checked
            ? documents.map((document) => document.id)
            : []);
    };

    const handleSelectOneDocument = (event, documentId) => {
        if (!selectedDocuments.includes(documentId)) {
            setSelectedDocuments((prevSelected) => [...prevSelected, documentId]);
        } else {
            setSelectedDocuments((prevSelected) => prevSelected.filter((id) => id !== documentId));
        }
    };

    const enableBulkActions = selectedDocuments.length > 0;
    const selectedSomeDocuments = selectedDocuments.length > 0
        && selectedDocuments.length < documents.length;
    const selectedAllDocuments = selectedDocuments.length === documents.length;

    return (
        <div {...other}>
            <Box sx={{
                backgroundColor: 'neutral.100',
                display: !enableBulkActions && 'none',
                px: 2,
                py: 0.5
            }}>
                <Checkbox checked={selectedAllDocuments}
                          indeterminate={selectedSomeDocuments}
                          onChange={handleSelectAllDocuments}/>
                <Button size="small"
                        sx={{ ml: 2 }}>
                    Delete
                </Button>
                <Button size="small"
                        sx={{ ml: 2 }}>
                    Edit
                </Button>
            </Box>
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAllDocuments}
                                    indeterminate={selectedSomeDocuments}
                                    onChange={handleSelectAllDocuments}
                                />
                            </TableCell>
                            <TableCell>
                                Nazwa instytucji
                            </TableCell>
                            <TableCell>
                                Źródło danych
                            </TableCell>
                            <TableCell>
                                Status
                            </TableCell>
                            <TableCell>
                                Data dodania
                            </TableCell>
                            <TableCell align="right">
                                Akcje
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document) => {
                            const isDocumentSelected = selectedDocuments.includes(document.id);

                            return (
                                <TableRow hover
                                          key={document.id}
                                          selected={isDocumentSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isDocumentSelected}
                                            onChange={(event) => handleSelectOneDocument(event, document.id)}
                                            value={isDocumentSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {document.institution}
                                    </TableCell>
                                    <TableCell>
                                        <SourceLabel source={document.source}/>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={document.status}
                                            size="small"
                                            sx={{ ml: 1 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {document.created_date}
                                    </TableCell>
                                    <TableCell align="right">
                                        <NextLink href={`/dashboard/campaigns/documents/${document.id}`} 
                                                  passHref>
                                            <Button component="a"
                                                    variant="contained">
                                                Edytuj <PencilAltIcon fontSize="small" />
                                            </Button>
                                        </NextLink>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={documentsCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </div>
    );
};

DocumentsListTable.propTypes = {
    documents: PropTypes.array.isRequired,
    documentsCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
