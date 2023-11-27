import {useRef} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router'
import {Box, Card, Container, Link, Grid, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';


const CreateReport = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();


    return (
        <>
            <Head>
                <title>
                    Stwórz nowy raport | Fajne Dane
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
                                   Raporty
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Stwórz nowy raport
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(CreateReport));
