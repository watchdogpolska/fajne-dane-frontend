import NextLink from 'next/link';
import PropTypes from 'prop-types';
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';


export const InstitutionsGroupListTable = (props) => {
    const {
        institutionGroups,
        ...other
    } = props;

    const onInstitutionGroupEdit = function(groupId) {
        console.log("groupid: " + groupId);
    }

    return (
        <div {...other}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead sx={{ visibility: 'visible' }}>
                    <TableRow>
                        <TableCell>
                           Typ instytucji
                        </TableCell>
                        <TableCell>
                            Liczba instytucji
                        </TableCell>
                        <TableCell align="right">
                            Akcje
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {institutionGroups.map((group) => {
                        return (
                            <TableRow hover
                                      key={group.id}>
                                <TableCell>
                                    {group.name}
                                </TableCell>
                                <TableCell>
                                    {group.institutions_count}
                                </TableCell>
                                <TableCell align="right">
                                    <Button component="a"
                                            variant="outlined"
                                            size="small"
                                            sx={{ mr: 2 }}
                                            endIcon={(
                                                <PencilAltIcon fontSize="small" />
                                            )}
                                            onClick={() => onInstitutionGroupEdit(group.id)}>
                                        Edytuj
                                    </Button>
                                    <NextLink href={`/dashboard/institutions/${group.id}/`}
                                              passHref>
                                        <Button component="a"
                                                endIcon={(
                                                    <PencilAltIcon fontSize="small" />
                                                )}
                                                size="small"
                                                variant="contained">
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

InstitutionsGroupListTable.propTypes = {
    institutionGroups: PropTypes.array.isRequired,
};
