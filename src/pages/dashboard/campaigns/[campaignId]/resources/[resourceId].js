import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {withAuthGuard} from '../../../../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../../../../hocs/with-dashboard-layout';
import {ResourceEditForm} from '../../../../../components/dashboard/campaigns/resources-form/resources-edit-form';
import {fileSourceRepository} from '../../../../../api/repositories/file-source-repository';
import NextLink from 'next/link';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';


const FileResourceDetails = () => {
    const router = useRouter();
    const { campaignId, resourceId } = router.query;
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchResourceData() {
        let result = await fileSourceRepository.getFileSource({campaignId: campaignId, id: resourceId});
        setResource(result);
        setLoading(false);
    }

    useEffect(() => {
        fetchResourceData();
    }, []);
    
    if (loading)
        return <div>Loading</div>;

    return (
        <>
            <Head>
                <title>
                    Fajne Dane - Utwórz zbiór danych
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
                                <NextLink href={`/dashboard/campaigns/${campaignId}/resources`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            Źródła danych
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item md={12}>
                                <Typography variant="h4">
                                    Edycja źródła danych
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejsciu zmienisz podstawowe informacje o źródle danych.
                                </Typography>
                            </Grid>

                        </Grid>
                    </Box>
                    <ResourceEditForm campaignId={campaignId}
                                      resource={resource}
                                      resourceId={resourceId}/>
                </Container>
            </Box>
        </>
    );
};

export default withAuthGuard(withDashboardLayout(FileResourceDetails));
