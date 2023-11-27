import {useEffect, useRef, useState, useReducer} from 'react';
import Head from 'next/head';
import {Search as SearchIcon} from '@/icons/search';
import {Loading} from '@/components/dashboard/common/loading';
import {useRouter} from 'next/router'
import {Box, Button, Card, Container, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {Plus as PlusIcon} from '@/icons/plus';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {DataSourcesListTable} from "@/components/dashboard/data-sources/data-sources-list-table";


const DataSourcesList = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            dataSources: null,
            loading: true,
        }
    );

    async function fetchDataSourcesData() {
        let _sources = await repositories.dataSource.list();
        setState({
            dataSources: _sources,
            loading: false
        })
    }

    useEffect(() => {
        fetchDataSourcesData();
    }, []);

    if (state.loading)
        return <Loading/>;


    return (
        <>
            <Head>
                <title>
                    Źródła danych | Fajne Dane
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
                            <Grid item md={8} xs={12}>
                                <Typography variant="h4">
                                  Źródła danych
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Lista źródeł danych
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <DataSourcesListTable dataSources={state.dataSources}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(DataSourcesList));
