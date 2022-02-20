import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box, Container, Card, Link, Grid, Typography} from '@mui/material';
import {FileSourcesListTable} from '@/components/dashboard/campaigns/resources-list/file-sources-list-table';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {fileSourceRepository} from '@/api/repositories/file-source-repository';
import NextLink from 'next/link';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';


const FileResourcesList = () => {
    const router = useRouter();
    const { campaignId } = router.query;
    const [sources, setSources] = useState([]);

    async function fetchData() {
        let results = await fileSourceRepository.list({campaignId: campaignId});
        setSources(results);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>
                    Dashboard: Customer List | Material Kit Pro
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
                    <Box sx={{ mb: 4 }}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
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
                                    Źródła danych
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Poniżej znajdziesz listę źródeł danych.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <FileSourcesListTable campaignId={campaignId}
                                              fileSources={sources}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(FileResourcesList));
