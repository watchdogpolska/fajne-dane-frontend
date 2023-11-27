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
import {ReportsListTable} from "@/components/dashboard/reports/reports-list-table";


const ReportsList = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState([]);

    async function fetchReportsData() {
        let _reports = await repositories.report.list();
        setLoading(false);
        setReports(_reports);
    }

    useEffect(() => {
        fetchReportsData();
    }, []);

    if (loading)
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
                            <Grid item md={8} xs={12}>
                                <Typography variant="h4">
                                   Raporty
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    List raportów
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
                                        <NextLink href={`/dashboard/reports/create`} passHref>
                                            <Button component="a"
                                                    startIcon={(
                                                        <PlusIcon fontSize="small" />
                                                    )}
                                                    variant="contained">
                                                Stwórz nowy raport
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <ReportsListTable reports={reports}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(ReportsList));
