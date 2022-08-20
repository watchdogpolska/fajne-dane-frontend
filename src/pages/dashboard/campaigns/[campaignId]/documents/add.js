import Head from 'next/head';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {ResourcesCreateForm} from '@/components/dashboard/campaigns/resources-form/resources-create-form';
import {AddDocumentForm} from '@/components/dashboard/campaigns/document-form/add-document-form';
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {Loading} from '@/components/dashboard/common/loading';
import {useAuth} from "@/hooks/use-auth";


const AddDocument = () => {
    const router = useRouter();
    const { campaignId } = router.query;
    const { repositories } = useAuth();
    const [loading, setLoading] = useState(true);
    const [campaign, setCampaign] = useState(null);

    async function fetchCampaignData() {
        let campaign = await repositories.campaign.getCampaign({id: campaignId});
        setCampaign(campaign);
        setLoading(false);
    }

    useEffect(() => {
        fetchCampaignData();
    }, []);

    if (loading)
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Dodaj nowy wpis | Fajne Dane
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
                                            Dokumenty kampanii
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    Dodaj nowy wpis
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Uzupełnij poniższe pola, aby dodać wpis. W następnym kroku uzupełnisz odpowiedzi na pytania dotyczące tego wpisu.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <AddDocumentForm campaign={campaign}/>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(AddDocument));
