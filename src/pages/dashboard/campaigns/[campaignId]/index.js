import {useEffect, useRef, useState, useReducer} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Box, Link, Card, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography, Button} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import {CleanButton} from '@/components/dashboard/common/clean-button';
import { Plus as PlusIcon } from '@/icons/plus';
import {Loading} from '@/components/dashboard/common/loading';
import {Search as SearchIcon} from '@/icons/search';
import {applySort, applyPagination} from '../../../../utils/filter-utils';
import {DocumentsListTable} from '@/components/dashboard/campaigns/documents-list-table';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {DocumentText as DocumentTextIcon} from '@/icons/document-text';
import {useAuth} from "@/hooks/use-auth";


const tabs = [
    {
        label: 'Wszystko',
        value: 'ALL'
    },
    {
        label: 'Tylko oczekujące',
        value: 'VALIDATING'
    }
];

const sortOptions = [
    {
        label: 'Najnowsze u góry',
        value: '-created'
    },
    {
        label: 'Najstarsze u góry',
        value: 'created'
    },
    {
        label: 'Nazwa instytucji (A→Z)',
        value: 'institution__name'
    },
    {
        label: 'Nazwa instytucji (Z→A)',
        value: '-institution__name'
    }
];


const CampaignDocumentsList = () => {
    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const { repositories } = useAuth();
    const { campaignId } = router.query;

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            documents: {
                loading: true,
                data: []
            },
            campaign: {
                loading: true,
                data: null
            },
            statuses: {
                loading: true,
                data: null
            }
        }
    );
    const [filters, setFilters] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            query: localStorage.getItem('campaign-documents-query') || '',
            tab:  localStorage.getItem('campaign-documents-tabs') || 'ALL',
            page: localStorage.getItem('campaign-documents-page') || 0,
            rowsPerPage: 10,
            sort: sortOptions[0].value
        }
    );
    const [currentQuery, setCurrentQuery] = useState(filters.query);

    const isLoading = () => {
        return state.documents.loading || state.campaign.loading || state.statuses.loading;
    }

    const getCurrentFilters = () => {
        let filter = {
            query: filters.query,
            order: filters.sort,
            offset: filters.page * filters.rowsPerPage,
            limit: filters.rowsPerPage,
        }
        if (filters.tab !== "ALL")
            filter['status'] = filters.tab;
        return filter;
    };
    
    async function fetchStatusesData() {
        let statuses = await repositories.document.statuses({
            campaignId: campaignId,
            params: {
                query: filters.query
            }
        });
        setState({
            statuses: {
                loading: false,
                data: statuses
            }
        });
    }

    async function fetchDocumentsData() {
        let documents = await repositories.document.list({
            campaignId: campaignId,
            params: getCurrentFilters()
        });
        setState({
            documents: {
                loading: false,
                data: documents
            }
        });
    }

    async function fetchCampaignData() {
        let campaign = await repositories.campaign.getCampaign({id: campaignId});
        setState({
            campaign: {
                loading: false,
                data: campaign
            }
        });
    }

    async function fetchData() {
        await fetchCampaignData();
        await fetchDocumentsData();
        await fetchStatusesData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (!isLoading()) fetchData();
    }, [filters]);

    async function deleteDocuments(documentIds) {
        await repositories.document.bulkDelete({campaignId: campaignId, ids: documentIds});
        fetchDocumentsData();
    }

    const handleDocumentsDeleted = (documentsIds) => {
        setState({
            documents: {
                loading: true
            }
        });
        deleteDocuments(documentsIds);
    }

    const handleTabsChange = (event, value) => {
        localStorage.setItem('campaign-documents-tabs', value);
        localStorage.setItem('campaign-documents-page', 0);
        setFilters({tab: value, page: 0});
    };

    const handleQueryChange = (event) => {
        event.preventDefault();
        let value = queryRef.current?.value;
        localStorage.setItem('campaign-documents-query', value);
        localStorage.setItem('campaign-documents-page', 0);
        setFilters({query: value, page: 0});
    };

    const handleSortChange = (event) => {
        setFilters({sort: event.target.value});
    };

    const handlePageChange = (event, page) => {
        localStorage.setItem('campaign-documents-page', page);
        setFilters({page: page});
    };

    const handleRowsPerPageChange = (event) => {
        setFilters({rowsPerPage: parseInt(event.target.value, 10)});
    };

    const handleCurrentQueryChange = (event) => {
        setCurrentQuery(event.target.value);
    };

    const getStatuesFrequency = (status) => {
        if (status === 'ALL') {
            return Object.values(state.statuses.data).reduce((a, b) => a + b, 0)
        }
        return state.statuses.data[status] || 0;
    };

    let cleanButton = null;
    if (filters.query.length > 0 || currentQuery.length > 0)
        cleanButton = <CleanButton text={"wyczyść"} onClick={() => {
            localStorage.setItem('campaign-documents-query', "");
            localStorage.setItem('campaign-documents-page', 0);
            setFilters({query: "", page: 0});
            setCurrentQuery("");
        }}/>

    if (isLoading())
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Dokumenty kampanii | Fajne Dane
                </title>
            </Head>
            <Box component="main"
                 ref={rootRef}
                 sx={{
                     flexGrow: 1,
                     py: 8
                 }}>
                <Box sx={{ mb: 4, px: 3 }}>
                    <Grid container
                          justifyContent="space-between"
                          spacing={3}>
                        <Grid item md={12}>

                            <ArrowBack link="/dashboard/campaigns/"
                                       text="List zbiorów danych"/>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Typography variant="h4">
                                {state.campaign.data.name}
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2"
                                        sx={{ mt: 1 }}>
                                W tym miejscu dodasz dane z pliku, pojedyńcze wpisy oraz rozstrzygniesz konflikty danych.
                            </Typography>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <Grid container
                                  spacing={1}
                                  sx={{
                                      flexDirection: 'row-reverse',
                                      mt: 2,
                                      pl: 3,
                                      '@media screen and (max-width: 1000px)': {
                                          flexDirection: 'row',
                                      },
                                  }}>
                                <Grid item>
                                    <NextLink href={`/dashboard/campaigns/${campaignId}/resources/add`} passHref>
                                        <Button component="a"
                                                startIcon={(
                                                    <PlusIcon fontSize="small" />
                                                )}
                                                variant="contained">
                                            Dodaj źródło danych
                                        </Button>
                                    </NextLink>
                                </Grid>
                                <Grid item>
                                    <NextLink href={`/dashboard/campaigns/${campaignId}/resources/`} passHref>
                                        <Button component="a"
                                                startIcon={(
                                                    <PencilAltIcon fontSize="small" />
                                                )}
                                                variant="outlined">
                                            Edytuj źródła
                                        </Button>
                                    </NextLink>
                                </Grid>
                                <Grid item>
                                    <NextLink href={`/dashboard/campaigns/${campaignId}/documents/add`} passHref>
                                        <Button component="a"
                                                startIcon={(
                                                    <DocumentTextIcon fontSize="small" />
                                                )}
                                                variant="contained">
                                            Dodaj wpis ręcznie
                                        </Button>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container
                      spacing={4}>
                    <Grid item md={12} xs={12}>
                        <Card>
                            <Tabs indicatorColor="primary"
                                  onChange={handleTabsChange}
                                  scrollButtons="auto"
                                  sx={{ px: 3 }}
                                  textColor="primary"
                                  value={filters.tab}
                                  variant="scrollable"  >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        label={`${tab.label} (${getStatuesFrequency(tab.value)})`}
                                        value={tab.value}
                                    />
                                ))}
                            </Tabs>
                            <Divider />
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    m: -1.5,
                                    p: 3
                                }}
                            >
                                <Box
                                    component="form"
                                    onSubmit={handleQueryChange}
                                    sx={{
                                        flexGrow: 1,
                                        m: 1.5
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        value={currentQuery}
                                        inputProps={{ ref: queryRef }}
                                        onChange={handleCurrentQueryChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                            endAdornment: cleanButton
                                        }}
                                        placeholder="Wyszukaj po nazwie i naciśnij enter"
                                    />
                                </Box>
                                <TextField label="Sort By"
                                           name="sort"
                                           onChange={handleSortChange}
                                           select
                                           SelectProps={{ native: true }}
                                           sx={{ m: 1.5 }}
                                           value={state.sort}>
                                    {sortOptions.map((option) => (
                                        <option key={option.value}
                                                value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>
                            <DocumentsListTable campaignId={campaignId}
                                                onDocumentsDeleted={handleDocumentsDeleted}
                                                documents={state.documents.data.results}
                                                documentsCount={state.documents.data.count}
                                                onPageChange={handlePageChange}
                                                onRowsPerPageChange={handleRowsPerPageChange}
                                                rowsPerPage={filters.rowsPerPage}
                                                page={filters.page}/>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(CampaignDocumentsList));
