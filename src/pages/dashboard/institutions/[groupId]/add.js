import {useRef, useReducer, useEffect} from 'react';
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
    InstitutionCreateForm
} from "@/components/dashboard/institutions/institutions/institution-create/institution-create-form";


const AddInstitution = () => {

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const { groupId } = router.query;
    const { repositories } = useAuth();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            group: {
                loading: true,
                data: null
            },
        }
    );

    async function fetchInstitutionGroupData() {
        let group = await repositories.institutionGroup.details({groupId});
        setState({
            group: {
                loading: false,
                data: group
            }
        });
    }

    useEffect(() => {
        fetchInstitutionGroupData();
    }, []);

    const isLoading = () => {
        return state.group.loading
    }

    if (isLoading())
        return <Loading/>;

    let group = state.group.data;

    return (
        <>
            <Head>
                <title>
                    Dodaj nową instytucje
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
                                <NextLink href={`/dashboard/institutions/${group.id}`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            {group.name}
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    Dodaj instytucję ręcznie
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Uzupełnij poniższe pola, aby dodać instytucję.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <InstitutionCreateForm group={group}/>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(AddInstitution));
