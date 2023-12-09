import {useEffect, useRef, useReducer} from 'react';
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
import {Loading} from '@/components/dashboard/common/loading';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {DocumentDataComponent} from '@/components/dashboard/campaigns/document-details/document-data-component';
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import NextLink from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {DocumentDataList} from '@/components/dashboard/campaigns/document-details/document-data-list';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {ArrowForward as ArrowForwardIcon} from '@mui/icons-material';
import {DocQueryForm} from '@/components/dashboard/campaigns/doc-queries/doc-query-form';
import DocQueryNavigator from '@/logic/doc-query-form/doc-query-navigator';
import {useAuth} from "@/hooks/use-auth";
import {NextDocumentModal} from "@/components/dashboard/campaigns/doc-queries/next-document-modal";


const DocumentQueryDetails = () => {
    const router = useRouter();
    const { campaignId, documentId, docQueryId } = router.query;
    const { repositories } = useAuth();
    let docStatusRef = useRef();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            campaign: {
                loading: true,
                data: null
            },
            document: {
                loading: true,
                data: null
            },
            docQueries: {
                loading: true,
                data: null
            },
            nextDocumentId: null,
            finished: false
        }
    );

    async function checkNextDocument(document) {
        let nextDocumentId = null;
        let finished = false;
        if (document.status !== docStatusRef.current && document.status === "CLOSED") {
            nextDocumentId = await repositories.document.next({campaignId: campaignId}).id;
            finished = true;
        }
        docStatusRef.current = document.status;
        return [finished, nextDocumentId];
    }

    async function fetchData() {
        let docQueries = await repositories.documentQuery.statusList({documentId: documentId});
        let document = await repositories.document.details({id: documentId});
        let campaign = await repositories.campaign.getCampaign({id: campaignId});

        setState({
            docQueries: {
                loading: false,
                data: docQueries
            },
            document: {
                loading: false,
                data: document
            },
            campaign: {
                loading: false,
                data: campaign
            },
        });
    }

    async function fetchSaveData() {
        let document = await repositories.document.details({id: documentId});
        let [finished, nextDocumentId] = await checkNextDocument(document);

        setState({
            document: {
                loading: false,
                data: document
            },
            nextDocumentId: nextDocumentId,
            finished: finished
        });
    }

    const handleSave = () => {
        fetchSaveData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isLoading = () => {
        return state.campaign.loading || state.document.loading || state.docQueries.loading
    }

    if (isLoading())
        return <Loading/>

    let docQueryNavigator = new DocQueryNavigator(state.docQueries.data)
    let docQueryPrev = docQueryNavigator.getPrev(docQueryId);
    let docQueryNext = docQueryNavigator.getNext(docQueryId);
    let docQueryNextId = docQueryNext ? docQueryNext.id : null;
    let docQueryPrevId = docQueryPrev ? docQueryPrev.id : null;

    return (
        <>
            <Head>
                <title>
                    Wpis | Fajne Dane
                </title>
            </Head>
            <NextDocumentModal open={state.finished}
                               nextDocumentId={state.nextDocumentId}
                               campaignId={campaignId}/>
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
                                           text={state.campaign.data.name}/>
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
                                <Box sx={{height: 600, textAlign: "center"}}>
                                    <DocumentDataComponent document={state.document.data}/>
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
                                                Zbiór danych: {state.campaign.data.name}
                                            </Box>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{py: 0}}>
                                        <DocumentDataList document={state.document.data}/>
                                    </AccordionDetails>
                                </Accordion>
                                <Paper sx={{
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0
                                }}>
                                    <DocQueryForm campaignId={campaignId}
                                                  documentId={documentId}
                                                  docQueryId={docQueryId}
                                                  onSave={handleSave}/>
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
