import {useEffect, useState} from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Box, Button, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {Scrollbar} from '@/components/scrollbar';
import {DeleteConfirmModal} from '@/components/dashboard/common/delete-confirm-modal';


export const InstitutionsListTable = (props) => {
    const {
        groupId,
        institutions,
        onInstitutionsDeleted,
        onDelete,
        institutionsCount,
        onPageChange,
        onRowsPerPageChange,
        page,
        rowsPerPage,
        ...other
    } = props;
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
            if (selectedInstitutions.length) {
                setSelectedInstitutions([]);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [institutions]);

    const handleSelectAllDocuments = (event) => {
        setSelectedInstitutions(event.target.checked
            ? institutions.map((institution) => institution.id)
            : []);
    };

    const handleSelectOneInstitution = (event, institutionId) => {
        if (!selectedInstitutions.includes(institutionId)) {
            setSelectedInstitutions((prevSelected) => [...prevSelected, institutionId]);
        } else {
            setSelectedInstitutions((prevSelected) => prevSelected.filter((id) => id !== institutionId));
        }
    };

    const enableBulkActions = selectedInstitutions.length > 0;
    const selectedSomeInstitutions = selectedInstitutions.length > 0
        && selectedInstitutions.length < institutions.length;
    const selectedAllInstitutions = selectedInstitutions.length === institutions.length;

    const openDelete = () => {setDeleteModalOpen(true)};
    const closeDelete = () => {setDeleteModalOpen(false)};

    const deleteSelectedInstitutions = () => {
        onInstitutionsDeleted(selectedInstitutions);
        closeDelete();
    }

    return (
        <div {...other}>
            <DeleteConfirmModal open={deleteModalOpen} 
                                onClose={closeDelete}
                                onAccept={deleteSelectedInstitutions}/>
            <Box sx={{
                backgroundColor: 'neutral.100',
                display: !enableBulkActions && 'none',
                px: 2,
                py: 0.5
            }}>
                <Checkbox checked={selectedAllInstitutions}
                          indeterminate={selectedSomeInstitutions}
                          onChange={handleSelectAllDocuments}/>
                <Button size="small"
                        onClick={openDelete}
                        sx={{ ml: 2 }}>
                    Delete
                </Button>
            </Box>
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead sx={{ visibility: enableBulkActions ? 'collapse' : 'visible' }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAllInstitutions}
                                    indeterminate={selectedSomeInstitutions}
                                    onChange={handleSelectAllDocuments}
                                />
                            </TableCell>
                            <TableCell>
                                Nazwa
                            </TableCell>
                            <TableCell>
                                Adres
                            </TableCell>
                            <TableCell>
                                Link
                            </TableCell>
                            <TableCell>
                                Identyfikator
                            </TableCell>
                            <TableCell align="right">
                                Akcje
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {institutions.map((institution) => {
                            const isInstitutionSelected = selectedInstitutions.includes(institution.id);

                            return (
                                <TableRow hover
                                          key={institution.id}
                                          selected={isInstitutionSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isInstitutionSelected}
                                            onChange={(event) => handleSelectOneInstitution(event, institution.id)}
                                            value={isInstitutionSelected}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {institution.name}
                                    </TableCell>
                                    <TableCell>
                                        ul. Robotnicza 12, 49-300 Brzeg
                                    </TableCell>
                                    <TableCell>
                                        Link
                                    </TableCell>
                                    <TableCell>
                                        {institution.key}
                                    </TableCell>
                                    <TableCell align="right">
                                        <NextLink href={`/dashboard/institutions/${groupId}/children/${institution.id}`}
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
            </Scrollbar>
            <TablePagination
                component="div"
                count={institutionsCount}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
        </div>
    );
};

InstitutionsListTable.propTypes = {
    institutions: PropTypes.array.isRequired,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
};
