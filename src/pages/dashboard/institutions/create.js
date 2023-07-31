import {useRef, useState} from 'react';
import Head from 'next/head';
import {Loading} from '@/components/dashboard/common/loading';
import {useRouter} from 'next/router'
import {Box, Container, Grid, Link, Typography} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';
import {
    InstitutionGroupCreateForm
} from "@/components/dashboard/institutions/institution-groups/group-create/institution-group-create-form";


const AddInstitutionGroups = () => {

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    if (loading)
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Dodaj nową grupe
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
                                <NextLink href={`/dashboard/institutions`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            Groupy
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    Dodaj typ instytucji
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    W tym miejscu utworzysz typ instytucji i zdecydujesz, jakie pola ją opisują
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <InstitutionGroupCreateForm />
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(AddInstitutionGroups));
