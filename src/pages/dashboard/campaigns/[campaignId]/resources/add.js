import {useEffect} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box, Link, Container, Grid, Typography} from '@mui/material';
import {withAuthGuard} from '../../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../../hocs/with-dashboard-layout';
import {gtm} from '../../../../../lib/gtm';
import {ResourcesCreateForm} from '../../../../../components/dashboard/campaigns/resources-form/resources-create-form';
import NextLink from 'next/link';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';


const AddDataResourceCampaign = () => {
    const router = useRouter();
    const { campaignId } = router.query;
    
    return (
        <>
            <Head>
                <title>
                    Fajne Dane - Dodaj nowe źródło danych
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
                                <NextLink href={`/dashboard/campaigns/${campaignId}`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            Documenty kampanii
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
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
