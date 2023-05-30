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
    InstitutionGroupEditForm
} from "@/components/dashboard/institutions/institution-groups/group-create/institution-group-edit-form";


const EditInstitutionGroups = () => {

    const rootRef = useRef(null);
    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const { groupId } = router.query;

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            group: {
                loading: true,
                value: null
            },
        }
    );

    async function fetchInstitutionGroupData() {
        let group = await repositories.institutionGroup.details({groupId});
        setState({
            group: {
                loading: false,
                value: group
            }
        });
    }

    useEffect(async () => {
        await fetchInstitutionGroupData();
    }, []);

    if (state.group.loading)
        return <Loading/>;

    return (
        <>
            <Head>
                <title>
                    Edytuj grupe instytucji
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
                                    Edytuj typ instytucji
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Tutaj możesz zaktualizować ustawienia typu instytucji
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <InstitutionGroupEditForm institutionGroup={state.group.value}/>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(EditInstitutionGroups));
