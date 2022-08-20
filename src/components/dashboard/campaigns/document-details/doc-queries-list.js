import {Typography, Table,
    Button,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {DocumentQueryStatus} from '@/components/dashboard/common/statuses/document-query-status';
import NextLink from 'next/link';


const buttonNameMapping = {
    "CLOSED": "Edytuj",
    "INITIALIZED": "Rozwiąż",
    "VALIDATING": "Rozwiąż",
    "CREATED": "Oznacz",
}



export const DocQueriesList = (props) => {
    const {
        campaignId,
        documentId,
        questionHeader,
        documentQueries,
        ...other
    } = props;


    return (
        <Table sx={{ }}>
            <TableHead sx={{ visibility: 'visible' }}>
                <TableRow>
                    <TableCell align="left">
                        {questionHeader}
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
                {documentQueries.map((dq) => {
                    return (
                        <TableRow hover
                                  key={dq.id}>
                            <TableCell>
                                <Typography fontWeight='fontWeightMedium'
                                            variant="body2">
                                    Pytanie {dq.query.order+1}
                                </Typography>

                                <Typography color="textSecondary"
                                            variant="body2">
                                    {dq.query.data[0]['value']}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <DocumentQueryStatus status={dq.status}/>
                            </TableCell>
                            <TableCell align="right">
                                <NextLink href={`/dashboard/campaigns/${campaignId}/documents/${documentId}/doc-queries/${dq.id}`}
                                          passHref>
                                    <Button component="a"
                                            endIcon={(
                                                <PencilAltIcon fontSize="small" />
                                            )}
                                            variant={dq.status === "CLOSED" ? "outlined" : "contained"}
                                            size="small">
                                        {buttonNameMapping[dq.status]}
                                    </Button>
                                </NextLink>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
