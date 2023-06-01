import {useEffect, useReducer, useRef} from 'react';
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
    InstitutionEditForm
} from "@/components/dashboard/institutions/institutions/institution-create/institution-edit-form";


const EditInstitution = () => {

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const router = useRouter();
    const { groupId, institutionId } = router.query;
    const { repositories } = useAuth();

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            group: {
                loading: true,
                data: null
            },
            institution: {
                loading: true,
                data: null
            }
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

    async function fetchInstitutionData() {
        let institution = await repositories.institution.details({id:institutionId});
        setState({
            institution: {
                loading: false,
                data: institution
            }
        });
    }

    useEffect(async () => {
        await fetchInstitutionGroupData();
        await fetchInstitutionData();
    }, []);

    const isLoading = () => {
        return state.group.loading || state.institution.loading
    }

    if (isLoading())
        return <Loading/>;

    let group = state.group.data;
    let institution = state.institution.data;

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
                                    Edytuj instytucję
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Uzupełnij poniższe pola, aby dodać instytucję.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <InstitutionEditForm institution={institution}
                                         group={group}/>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(EditInstitution));
