import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router'
import {Box, Card, Divider, Grid, InputAdornment, Tab, Tabs, TextField, Typography} from '@mui/material';
import {withAuthGuard} from '../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../hocs/with-dashboard-layout';
import {gtm} from '../../../lib/gtm';
import {Search as SearchIcon} from '../../../icons/search';
import {campaignRepository} from '../../../api/repositories/campaign-repository';
import {CampaignsListTable} from '../../../components/dashboard/campaigns/campaigns-list-table';
import {CampaignDrawer} from '../../../components/dashboard/campaigns/campaigns-list/components/campaign-drawer';
import {DeleteConfirmModal} from '../../../components/dashboard/common/delete-confirm-modal';


const CampaignListInner = styled('div',
    { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        overflow: 'hidden',
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
        zIndex: 1,
        [theme.breakpoints.up('lg')]: {
            marginRight: -500
        },
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            [theme.breakpoints.up('lg')]: {
                marginRight: 0
            },
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        })
    }));

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

const applyFilters = (campaigns, filters) => campaigns.filter((campaign) => {

    return true;
});

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (campaigns, sort) => {
    const [orderBy, order] = sort.split('|');
    const comparator = getComparator(order, orderBy);
    const stabilizedThis = campaigns.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const newOrder = comparator(a[0], b[0]);

        if (newOrder !== 0) {
            return newOrder;
        }

        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (campaigns, page, rowsPerPage) => campaigns.slice(page * rowsPerPage,
    page * rowsPerPage + rowsPerPage);


const Campaigns = () => {
    const [drawer, setDrawer] = useState({
        isOpen: false,
        campaignId: null
    });

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
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

    async function fetchCampaignData() {
        let campaigns = await campaignRepository.list();
        setCampaigns(campaigns);
    }

    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    useEffect(() => {
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
            await campaignRepository.deleteCampaign({id: drawer.campaignId});
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
                    Dashboard: Overview | Material Kit Pro
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
                <CampaignListInner open={drawer.isOpen}>
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
                                            placeholder="Search customers"
                                        />
                                    </Box>
                                    <TextField
                                        label="Sort By"
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
                </CampaignListInner>
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
