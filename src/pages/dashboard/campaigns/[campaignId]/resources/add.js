import {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box, Container, Grid, Typography} from '@mui/material';
import {withAuthGuard} from '../../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../../hocs/with-dashboard-layout';
import {gtm} from '../../../../../lib/gtm';
import {ResourcesCreateForm} from '../../../../../components/dashboard/campaigns/resources-form/resources-create-form';


const AddDataResourceCampaign = () => {
    const router = useRouter();
    const { campaignId } = router.query;
    
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
                                    Dodaj źródło danych
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <ResourcesCreateForm campaignId={campaignId}/>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(AddDataResourceCampaign));
