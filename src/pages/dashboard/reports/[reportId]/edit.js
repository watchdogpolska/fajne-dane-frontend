import {useEffect, useReducer, useRef, useState} from 'react';
import Head from 'next/head';
import {Loading} from '@/components/dashboard/common/loading';
import {useRouter} from 'next/router'
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';

import {DeleteConfirmModal} from "@/components/dashboard/common/delete-confirm-modal";
import {ReportCreateForm} from "@/components/dashboard/reports/report-create/report-create-form";


const ReportEdit = () => {
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


    useEffect(() => {
        fetchReportData();
    }, []);

    if (state.loading)
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Edytuj raport
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{ mb: 4 }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
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
                            <Grid item md={12}>
                                <Typography variant="h4">
                                    Edytuj raport
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Tutaj możesz zaktualizować podstawowe ustawienia raportu
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <ReportCreateForm report={state.report}/>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(ReportEdit));
