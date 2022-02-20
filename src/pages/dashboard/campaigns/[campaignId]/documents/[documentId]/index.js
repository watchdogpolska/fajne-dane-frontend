import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {documentRepository} from '@/api/repositories/document-repository';
import PdfViewer from '@/components/form/pdf-viewer';
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import NextLink from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {DocumentDataList} from '@/components/dashboard/campaigns/document-details/document-data-list';
import {DocumentQueryStatus} from '@/components/dashboard/common/statuses/document-query-status';


const buttonNameMapping = {
    "CLOSED": "Edytuj",
    "INITIALIZED": "Rozwiąż",
    "VALIDATING": "Rozwiąż",
    "CREATED": "Oznacz",
}


const DocumentDetails = () => {
    const router = useRouter();
    const { campaignId, documentId } = router.query;
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchDocumentData() {
        let result = await documentRepository.details({id: documentId});
        setDocument(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchDocumentData();
    }, []);

    if (loading)
        return <div>Loading</div>;

    return (
        <>
            <Head>
                <title>
                    Fajne Dane - Edycja wpisów
                </title>
            </Head>
            <Box component="main"
                 sx={{
                     flexGrow: 1,
                     py: 8
                 }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 4 }}>
                        <Grid container
                              justifyContent="space-between"
                              spacing={3}>
                            <Grid item md={12}>
                                <ArrowBack link={`/dashboard/campaigns/${campaignId}`}
                                           text={"Dokumenty kampanii"}/>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h4">
                                    Wpis
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejscu możesz rozwiązać konfilkty lub zedytować pytania pojedyńczego wpisu.
                                </Typography>
                            </Grid>

                            <Grid item md={6}>
                                <Box sx={{height: 600}}>
                                    <PdfViewer/>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>
                                            <Box component="span" fontWeight='fontWeightMedium'>
                                                Zbiór danych:
                                            </Box>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{py: 0}}>
                                        <DocumentDataList dataFields={document.data}/>
                                    </AccordionDetails>
                                </Accordion>
                                <Paper sx={{
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0
                                }}>
                                    <Table sx={{ }}>
                                        <TableHead sx={{ visibility: 'visible' }}>
                                            <TableRow>
                                                <TableCell align="left">
                                                    Pytanie
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
                                            {document.documentQueries.map((dq) => {
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
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(DocumentDetails));
