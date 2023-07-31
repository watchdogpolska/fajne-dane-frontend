import {useEffect} from 'react';
import Head from 'next/head';
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import NextLink from 'next/link';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {CampaignCreateForm} from '@/components/dashboard/campaigns/create-form/campaigns-create-from';


const CreateCampaign = () => {
    useEffect(() => {
    }, []);

    return (
        <>
            <Head>
                <title>
                    Utwórz zbiór danych | Fajne Dane
                </title>
            </Head>
            <Box component="main"
                 sx={{
                    flexGrow: 1,
                    py: 8
                 }}>
                <Container maxWidth="md">
                    <Box sx={{ mb: 4 }}>
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
                            <Grid item md={12}>
                                <Typography variant="h4">
                                    Dodaj zbiór
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejscu utworzysz zbiór danych: nadasz nazwę i wczytasz szablon zbioru danych.
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <CampaignCreateForm/>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(CreateCampaign));
