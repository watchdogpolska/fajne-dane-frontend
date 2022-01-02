import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Box, Link, Card, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography, Button} from '@mui/material';
import {withAuthGuard} from '../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../hocs/with-dashboard-layout';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Plus as PlusIcon } from '../../../../icons/plus';
import {gtm} from '../../../../lib/gtm';
import {Search as SearchIcon} from '../../../../icons/search';
import {applyFilters, applySort, applyPagination} from '../../../../utils/filter-utils';
import {documentRepository} from '../../../../api/repositories/document-repository';
import {DocumentsListTable} from '../../../../components/dashboard/campaigns/documents-list-table';
import {PencilAlt as PencilAltIcon} from '../../../../icons/pencil-alt';
import {DocumentText as DocumentTextIcon} from '../../../../icons/document-text';


const tabs = [
    {
        label: 'Wszystko',
        value: 'ALL'
    },
    {
        label: 'Tylko oczekujące',
        value: 'PENDING'
    }
];

const sortOptions = [
    {
        label: 'Ostatni po ID',
        value: 'id|desc'
    },
    {
        label: 'Pierwszy po ID',
        value: 'id|asc'
    }
];

const CampaignDocumentsList = () => {
    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [currentTab, setCurrentTab] = useState('ALL');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({
        query: '',
        hasAcceptedMarketing: null,
        isProspect: null,
        isReturning: null
    });

    const { campaignId } = router.query;

    async function fetchCampaignData() {
        let documents = await documentRepository.list({campaignId: campaignId});
        console.log(documents);
        setDocuments(documents);
    }

    useEffect(() => {
        gtm.push({ event: 'page_view' });
        fetchCampaignData();
    }, []);

    const handleTabsChange = (event, value) => {
        const updatedFilters = {
            ...filters,
            hasAcceptedMarketing: null,
            isProspect: null,
            isReturning: null
        };

        if (value !== 'all') {
            updatedFilters[value] = true;
        }

        setFilters(updatedFilters);
        setCurrentTab(value);
    };

    const handleQueryChange = (event) => {
        event.preventDefault();
        setFilters((prevState) => ({
            ...prevState,
            query: queryRef.current?.value
        }));
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const [deleteModalOpen, setDeleteModalOpen ] = useState(false);

    const handleOpenDelete = () => {setDeleteModalOpen(true)};
    const handleCloseDelete = () => {setDeleteModalOpen(false)};

    // Usually query is done on backend with indexing solutions
    const filteredDocuments = applyFilters(documents, filters);
    const sortedDocuments = applySort(filteredDocuments, sort);
    const paginatedDocuments = applyPagination(sortedDocuments, page, rowsPerPage);

    if (loading)
        return <div>LOADING</div>

    return (
        <>
            <Head>
                <title>
                    Fajne Dane - Dokumenty kampanii
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
                            <NextLink href="/dashboard/campaigns" passHref>
                                <Link color="textPrimary"
                                      component="a"
                                      sx={{
                                          alignItems: 'center',
                                          display: 'flex'
                                      }}>
                                    <ArrowBackIcon fontSize="small"
                                                   sx={{ mr: 1 }}/>
                                    <Typography variant="subtitle2">
                                        Lista zbiorów danych
                                    </Typography>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Typography variant="h4">
                                Lista zbiorów danych
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2"
                                        sx={{ mt: 1 }}>
                                Kampanie Sprawdzamy Jak Jest lub inne, zewnętrze zbiory danych. W tym miejscu dodasz lub usuniesz zbiór danych.
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
                                  value={currentTab}
                                  variant="scrollable"  >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
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
                                        defaultValue=""
                                        fullWidth
                                        inputProps={{ ref: queryRef }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            )
                                        }}
                                        placeholder="Search customers"
                                    />
                                </Box>
                                <TextField label="Sort By"
                                           name="sort"
                                           onChange={handleSortChange}
                                           select
                                           SelectProps={{ native: true }}
                                           sx={{ m: 1.5 }}
                                           value={sort}>
                                    {sortOptions.map((option) => (
                                        <option key={option.value}
                                                value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </Box>
                            <DocumentsListTable documents={paginatedDocuments}
                                                documentsCount={filteredDocuments.length}
                                                onPageChange={handlePageChange}
                                                onRowsPerPageChange={handleRowsPerPageChange}
                                                rowsPerPage={rowsPerPage}
                                                page={page}/>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(CampaignDocumentsList));
