import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Box, Card, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography, Button} from '@mui/material';
import {withAuthGuard} from '../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../hocs/with-dashboard-layout';
import {gtm} from '../../../../lib/gtm';
import {Search as SearchIcon} from '../../../../icons/search';
import {applyFilters, applyPagination, applySort} from '../utils';
import {documentRepository} from '../../../../api/repositories/document-repository';
import {DocumentsListTable} from '../../../../components/dashboard/campaigns/documents-list-table';


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
                    Dashboard: Overview | Material Kit Pro
                </title>
            </Head>
            <Box component="main"
                 ref={rootRef}
                 sx={{
                     flexGrow: 1,
                     py: 8
                 }}>
                <Box sx={{ mb: 4 }}>
                    <Grid container
                          justifyContent="space-between"
                          spacing={3}>
                        <Grid item>
                            <Typography variant="h6">
                                Lista zbiorów danych
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2"
                                        sx={{ mt: 1 }}>
                                Kampanie Sprawdzamy Jak Jest lub inne, zewnętrze zbiory danych. W tym miejscu dodasz lub usuniesz zbiór danych.
                            </Typography>


                            <NextLink href={`/dashboard/campaigns/${campaignId}/resources/add`}
                                      passHref>
                                <Button component="a"
                                        variant="contained">
                                    Dodaj źródło danych
                                </Button>
                            </NextLink>

                            <Button component="a"
                                    variant="contained">
                                Dodaj wpis ręcznie
                            </Button>
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
