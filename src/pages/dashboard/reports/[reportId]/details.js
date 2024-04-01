import {useEffect, useRef, useState, useReducer} from 'react';
import Head from 'next/head';
import {Search as SearchIcon} from '@/icons/search';
import {Loading} from '@/components/dashboard/common/loading';
import {useRouter} from 'next/router'
import {Box, Button, Card, Container, Grid, Link, InputAdornment, TextField, Typography} from '@mui/material';
import {Plus as PlusIcon} from '@/icons/plus';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';

import {ReportComponentsTable} from "@/components/dashboard/reports/report-components-table";


const ReportEdit = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const { reportId } = router.query;

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            report: null,
            loading: true,
        }
    );

    async function fetchReportData() {
        let result = await repositories.report.getReport({id: reportId});
        setState({
            report: result,
            loading: false
        });
    }

    async function onLayoutUpdated(layout) {
        await repositories.report.updateReportLayout({id: reportId, layout: layout})
        await fetchReportData();
    }

    useEffect(() => {
        fetchReportData();
    }, []);

    if (state.loading)
        return <Loading/>;


    return (
        <>
            <Head>
                <title>
                    Raporty | Fajne Dane
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
                                <NextLink href={`/dashboard/reports`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            Lista raportów
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <Typography variant="h4">
                                    {state.report.name}
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Tu możesz dodać nowe komponenty raportu oraz zmodyfikować istniejące.
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
                                        <NextLink href={`/dashboard/reports/${reportId}/components`} passHref>
                                            <Button component="a"
                                                    startIcon={(
                                                        <PlusIcon fontSize="small" />
                                                    )}
                                                    variant="contained">
                                                Dodaj nowy komponent
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <ReportComponentsTable report={state.report}
                                               onLayoutUpdated={onLayoutUpdated}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(ReportEdit));
