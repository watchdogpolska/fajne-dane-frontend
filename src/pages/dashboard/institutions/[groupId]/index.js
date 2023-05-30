import {useEffect, useReducer, useRef} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import {Search as SearchIcon} from '@/icons/search';
import {Box, Button, Container, Card, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {ArrowBack} from '@/components/dashboard/common/arrow-back';
import {Loading} from '@/components/dashboard/common/loading';
import {
    InstitutionsListTable
} from '@/components/dashboard/institutions/institutions/institutions-list-table';
import {PencilAlt as PencilAltIcon} from '@/icons/pencil-alt';
import {DocumentText as DocumentTextIcon} from '@/icons/document-text';
import {useAuth} from "@/hooks/use-auth";


const sortOptions = [
    {
        label: 'Nazwa instytucji (A→Z)',
        value: 'name'
    },
    {
        label: 'Nazwa instytucji (Z→A)',
        value: '-name'
    }
];


const InstitutionsList = () => {
    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const { groupId } = router.query;
    const { repositories } = useAuth();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            group: {
                loading: true,
                data: null
            },
            institutions: {
                loading: true,
                data: []
            },
        }
    );

    const [filters, setFilters] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            query: "",
            page: 0,
            rowsPerPage: 10,
            sort: sortOptions[0].value
        }
    );

    const isLoading = () => {
        return state.institutions.loading || state.group.loading
    }

    const getCurrentFilters = () => {
        return {
            query: filters.query,
            order: filters.sort,
            offset: filters.page * filters.rowsPerPage,
            limit: filters.rowsPerPage,
        }
    };

    async function fetchInstitutionGroupData() {
        let group = await repositories.institutionGroup.details({groupId});
        setState({
            group: {
                loading: false,
                data: group
            }
        });
    }

    async function fetchInstitutionsData() {
        let institutions = await repositories.institution.list({
            groupId: groupId,
            params: getCurrentFilters()
        });
        setState({
            institutions: {
                loading: false,
                data: institutions
            }
        });
    }

    useEffect(() => {
        fetchInstitutionGroupData();
        fetchInstitutionsData();
    }, []);

    useEffect(() => {
        if (!isLoading()) fetchInstitutionsData();
    }, [filters]);

    async function deleteInstitutions(institutionsId) {
        // support check if there no dokuments
        //await repositories.document.bulkDelete({campaignId: campaignId, ids: documentIds});
        //fetchDocumentsData();
    }

    const handleInstitutionsDeleted = (institutionsIds) => {
        deleteInstitutions(institutionsIds);
    }

    const handleSortChange = (event) => {
        setFilters({sort: event.target.value});
    };
    console.log(filters);

    const handlePageChange = (event, page) => {
        setFilters({page: page});
    };

    const handleRowsPerPageChange = (event) => {
        setFilters({rowsPerPage: parseInt(event.target.value, 10)});
    };

    const handleQueryChange = (event) => {
        event.preventDefault();
        setFilters({query: queryRef.current?.value, page: 0});
    };

    if (isLoading())
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Typy instytucji | Fajne Dane
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ mb: 4, px: 3 }}>
                        <Grid container
                              justifyContent="space-between"
                              spacing={3}>
                            <Grid item md={12}>

                                <ArrowBack link="/dashboard/institutions/"
                                           text="Typy instytucji"/>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Typography variant="h4">
                                    {state.group.data.name}
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejscu dodasz instytucje z pliku lub ręcznie.
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
                                        <NextLink href={`/dashboard/institutions/${groupId}/add/`} passHref>
                                            <Button component="a"
                                                    startIcon={(
                                                        <PencilAltIcon fontSize="small" />
                                                    )}
                                                    variant="outlined">
                                                Dodaj instytucje ręcznie
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                    <Grid item>
                                        <NextLink href={`/dashboard/institutions/${groupId}/batch`} passHref>
                                            <Button component="a"
                                                    startIcon={(
                                                        <DocumentTextIcon fontSize="small" />
                                                    )}
                                                    variant="contained">
                                                Wgraj plik z instytucjami
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
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
                            <TextField label="Sortowanie"
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
                        <InstitutionsListTable groupId={groupId}
                                               onInstitutionsDeleted={handleInstitutionsDeleted}
                                               institutions={state.institutions.data}
                                               institutionsCount={state.institutions.data.count}
                                               onPageChange={handlePageChange}
                                               onRowsPerPageChange={handleRowsPerPageChange}
                                               rowsPerPage={filters.rowsPerPage}
                                               page={filters.page}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(InstitutionsList));
