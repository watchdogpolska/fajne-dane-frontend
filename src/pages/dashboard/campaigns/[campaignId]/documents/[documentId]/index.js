import {useEffect, useState, useReducer} from 'react';
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
import {useAuth} from "@/hooks/use-auth";
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import {Loading} from '@/components/dashboard/common/loading';
import NextLink from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {DocumentDataList} from '@/components/dashboard/campaigns/document-details/document-data-list';
import {DocQueriesList} from '@/components/dashboard/campaigns/document-details/doc-queries-list';
import {DocumentDataComponent} from '@/components/dashboard/campaigns/document-details/document-data-component';
import DocQueryNavigator from '@/logic/doc-query-form/doc-query-navigator';


const DocumentDetails = () => {
    const router = useRouter();
    const { campaignId, documentId } = router.query;
    const { repositories } = useAuth();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            document: {
                loading: true,
                data: null
            },
            campaign: {
                loading: true,
                data: null
            }
        }
    );

    async function fetchDocumentData() {
        let document = await repositories.document.details({id: documentId});
        setState({
            document: {
                loading: false,
                data: document
            }
        })
    }

    async function fetchCampaignData() {
        let campaign = await repositories.campaign.getCampaign({id: campaignId});
        setState({
            campaign: {
                loading: false,
                data: campaign
            }
        })
    }

    async function fetchData() {
        await fetchDocumentData();
        await fetchCampaignData();
    }


    useEffect(() => {
        fetchData();
    }, []);

    const isLoading = () => {
        return state.campaign.loading || state.document.loading
    }

    if (isLoading())
        return <Loading/>

    let docQueryNavigator = new DocQueryNavigator(state.document.data.documentQueries);

    return (
        <>
            <Head>
                <title>
                    Edycja wpisów | Fajne Dane
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
                                <Box sx={{height: 600}}>
                                    <DocumentDataComponent document={state.document.data}/>
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
                                    <DocQueriesList documentQueries={docQueryNavigator.openedDocQueries}
                                                    campaignId={campaignId}
                                                    documentId={documentId}
                                                    questionHeader="Pytanie oczekujące na zamkniecie"/>
                                </Paper>
                                <Paper sx={{
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0
                                }}>
                                    <DocQueriesList documentQueries={docQueryNavigator.closedDocQueries}
                                                    campaignId={campaignId}
                                                    documentId={documentId}
                                                    questionHeader="Pytanie"/>
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
