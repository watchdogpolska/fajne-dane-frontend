import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Grid,
    Divider,
    Paper,
    Typography
} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import PdfViewer from '@/components/form/pdf-viewer';
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import NextLink from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DocumentDataList} from '@/components/dashboard/campaigns/document-details/document-data-list';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {ArrowForward as ArrowForwardIcon} from '@mui/icons-material';
import {DocQueryForm} from '@/components/dashboard/campaigns/doc-queries/doc-query-form';
import DocQueryNavigator from '@/logic/doc-query-form/doc-query-navigator';
import {useAuth} from "@/hooks/use-auth";


const DocumentQueryDetails = () => {
    const router = useRouter();
    const { campaignId, documentId, docQueryId } = router.query;
    const { repositories } = useAuth();
    const [loading, setLoading] = useState(false);
    const [docQueryStatuses, setDocQueryStatuses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let result = await repositories.documentQuery.statusList({documentId: documentId});
            setDocQueryStatuses(result);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading)
        return <div>Loading</div>;

    let docQueryNavigator = new DocQueryNavigator(docQueryStatuses, docQueryId)
    let docQueryPrevId = docQueryNavigator.getPrevId();
    let docQueryNextId = docQueryNavigator.getNextId();

    return (
        <>
            <Head>
                <title>
                    Wpis | Fajne Dane
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
                                    <PdfViewer documentUrl={document.data['document_url']}/>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Accordion defaultExpanded={false}
                                           sx={{
                                               marginBottom: "0 !important"
                                           }}>
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
                                    <DocQueryForm campaignId={campaignId}
                                                  documentId={documentId}
                                                  docQueryId={docQueryId}/>
                                </Paper>
                                <Grid container>
                                    <Grid item xs={6}
                                          sx={{
                                              paddingTop: "24px"
                                          }}>
                                        <NextLink href={`/dashboard/campaigns/${campaignId}/documents/${documentId}/doc-queries/${docQueryPrevId}`}
                                                  passHref>
                                            <Button component="a"
                                                    disabled={docQueryPrevId == null}
                                                    startIcon={(
                                                        <ArrowBackIcon fontSize="small" />
                                                    )}
                                                    size="small"
                                                    variant="contained">
                                                Poprzednie pytanie
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                    <Grid item xs={6}
                                          sx={{
                                              paddingTop: "24px",
                                              display: "flex",
                                              justifyContent: "flex-end"
                                          }}>
                                        <NextLink href={`/dashboard/campaigns/${campaignId}/documents/${documentId}/doc-queries/${docQueryNextId}`}
                                                  passHref>
                                            <Button component="a"
                                                    disabled={docQueryNextId == null}
                                                    endIcon={(
                                                        <ArrowForwardIcon fontSize="small" />
                                                    )}
                                                    size="small"
                                                    variant="contained">
                                                Następne pytanie
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(DocumentQueryDetails));
