import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router'
import {Box, Card, Button, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {Search as SearchIcon} from '@/icons/search';
import {CampaignsListTable} from '@/components/dashboard/campaigns/campaigns-list/campaigns-list-table';
import {CampaignDrawer} from '@/components/dashboard/campaigns/campaigns-list/components/campaign-drawer';
import {DeleteConfirmModal} from '@/components/dashboard/common/delete-confirm-modal';
import { Plus as PlusIcon } from '@/icons/plus';
import {CampaignsListInner} from '@/components/dashboard/campaigns/campaigns-list/components/campaigns-list-inner';
import {applySort, applyPagination} from '@/utils/filter-utils';
import {useAuth} from "@/hooks/use-auth";


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
        label: 'Najnowsze u góry',
        value: 'created|desc'
    },
    {
        label: 'Najstarsze u góry',
        value: 'created|asc'
    }
];


const applyFilters = (data, filters) => data.filter((element) => {

    if (filters['tab'] == "PENDING") {
        if (["CREATED", "INITIALIZED", "VALIDATING"].indexOf(element.status) < 0)
            return false;
    }

    if (filters['query']) {
        let queryTokens = filters['query'].toLowerCase().split(' ');

        let matchedTokens = 0;
        for (let token of queryTokens) {
            if (element.name.toLowerCase().includes(token) ||
                element.status.toLowerCase() === token.toLowerCase() ||
                element.createdDate.includes(token))
                matchedTokens+=1;
        }
        if (queryTokens.length != matchedTokens)
            return false;
    }
    return true;
});


const Campaigns = () => {
    const [drawer, setDrawer] = useState({
        isOpen: false,
        campaignId: null
    });

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    const [currentTab, setCurrentTab] = useState('ALL');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sort, setSort] = useState(sortOptions[0].value);
    const [filters, setFilters] = useState({
        query: '',
        tab: 'ALL'
    });

    async function fetchCampaignData() {
        let campaigns = await repositories.campaign.list();
        setCampaigns(campaigns);
    }

    useEffect(() => {
        fetchCampaignData();
    }, []);

    const handleTabsChange = (event, value) => {
        const updatedFilters = {
            ...filters,
        };
        updatedFilters['tab'] = value;
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

    const handleOpenDrawer = (campaignId) => {
        setDrawer({
            isOpen: true,
            campaignId: campaignId
        });
    };

    const handleCloseDrawer = () => {
        setDrawer({
            isOpen: false,
            campaignId: null
        });
    };

    const [deleteModalOpen, setDeleteModalOpen ] = useState(false);

    const handleOpenDelete = () => {setDeleteModalOpen(true)};
    const handleCloseDelete = () => {setDeleteModalOpen(false)};
    const handleAcceptDelete = (e) => {
        e.preventDefault();

        async function deleteCampaign() {
            setLoading(true);
            await repositories.campaign.deleteCampaign({id: drawer.campaignId});
            await fetchCampaignData();
            handleCloseDrawer();
            setDeleteModalOpen(false);
            setLoading(false);
        }
        deleteCampaign();
    };
    
    const handleCampaignUpdate = () => {
        async function fetchData() {
            await fetchCampaignData();
        }
        setLoading(true);
        fetchData();
        setLoading(false);
    }

    // Usually query is done on backend with indexing solutions
    const filteredCampaigns = applyFilters(campaigns, filters);
    const sortedCampaigns = applySort(filteredCampaigns, sort);
    const paginatedCampaigns = applyPagination(sortedCampaigns, page, rowsPerPage);
    
    if (loading)
        return <div>LOADING</div>

    return (
        <>
            <Head>
                <title>
                    Lista kampanii | Fajne Dane
                </title>
            </Head>
            <Box component="main"
                 ref={rootRef}
                 sx={{
                     backgroundColor: 'background.paper',
                     display: 'flex',
                     flexGrow: 1,
                     overflow: 'hidden'
                 }}>
                <DeleteConfirmModal open={deleteModalOpen}
                                    onClose={handleCloseDelete}
                                    onAccept={handleAcceptDelete}/>
                <CampaignsListInner open={drawer.isOpen}>
                    <Box sx={{ mb: 4, px: 3 }}>
                        <Grid container
                              justifyContent="space-between"
                              spacing={3}>
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
                                        <NextLink href='/dashboard/campaigns/create' passHref>
                                            <Button component="a"
                                                    variant="contained">
                                                <PlusIcon fontSize="small" /> Dodaj zbiór
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
                                <Tabs
                                    indicatorColor="primary"
                                    onChange={handleTabsChange}
                                    scrollButtons="auto"
                                    sx={{ px: 3 }}
                                    textColor="primary"
                                    value={currentTab}
                                    variant="scrollable"
                                >
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
                                            placeholder="Wyszukaj po nazwie"
                                        />
                                    </Box>
                                    <TextField
                                        label="Sortuj"
                                        name="sort"
                                        onChange={handleSortChange}
                                        select
                                        SelectProps={{ native: true }}
                                        sx={{ m: 1.5 }}
                                        value={sort}
                                    >
                                        {sortOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Box>
                                <CampaignsListTable
                                    campaigns={paginatedCampaigns}
                                    onCampaignSelect={handleOpenDrawer}
                                    campaignsCount={filteredCampaigns.length}
                                    onPageChange={handlePageChange}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </CampaignsListInner>
                <CampaignDrawer containerRef={rootRef}
                                onClose={handleCloseDrawer}
                                onCampaignUpdate={handleCampaignUpdate}
                                onDeleteCampaign={handleOpenDelete}
                                open={drawer.isOpen}
                                campaignId={drawer.campaignId}/>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(Campaigns));
