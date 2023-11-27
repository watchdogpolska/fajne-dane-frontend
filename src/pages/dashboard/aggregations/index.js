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


const AggregationsList = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            dataView: null,
            loading: false,
        }
    );


    async function fetchDataViewData() {
    }

    useEffect(() => {
        fetchDataViewData();
    }, []);

    if (state.loading)
        return <Loading/>;


    return (
        <>
            <Head>
                <title>
                    Agregacje | Fajne Dane
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
                                    Widoki agregacji
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Lista widoków agregacji
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(AggregationsList));
