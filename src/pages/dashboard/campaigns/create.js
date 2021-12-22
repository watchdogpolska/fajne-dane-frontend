import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Grid, Typography} from '@mui/material';
import {withAuthGuard} from '../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../hocs/with-dashboard-layout';
import {gtm} from '../../../lib/gtm';
import {CampaignCreateForm} from '../../../components/dashboard/campaigns/create-form/campaigns-create-from';


const CreateCampaign = () => {
    useEffect(() => {
        gtm.push({ event: 'page_view' });
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard: Overview | Material Kit Pro
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
                            <Grid item>
                                <Typography variant="h4">
                                    Dodaj kampanie
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
