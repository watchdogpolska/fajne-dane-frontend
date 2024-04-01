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
import {BaseComponentForm} from "@/components/dashboard/reports/report-components/creators/base-component";


const EditReportComponent = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const { reportId, componentId } = router.query;

    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            report: {
                value: null,
                loading: true
            },
            component: {
                value: null,
                loading: true,
            }
        }
    );

    async function fetchReportData() {
        let result = await repositories.report.getReport({id: reportId});
        setState({
            report: {
                value: result,
                loading: false
            },
        });
    }

    async function fetchComponentData() {
        let result = await repositories.reportComponent.getComponent(componentId);
        setState({
            component: {
                value: result,
                loading: false
            },
        });
    }

    useEffect(() => {
        fetchReportData();
        fetchComponentData();
    }, []);

    if (state.report.loading || state.component.loading)
        return <Loading/>;

    let component = state.component.value;

    let componentType = null;
    let initialValues = {};

    if (component.type === "HEADER") {
        componentType = "title-block";
        initialValues = {
            name: component.name,
            title: component.title,
            subtitle: component.subtitle
        };
    } else if (component.type === "HTML") {
        componentType = "html-body";
        initialValues = {
            name: component.name,
            text: component.text
        };
    } else if (component.type === "BAR_PLOT") {
        componentType = "frequency-plot";
        initialValues = {
            name: component.name,
            title: component.title,
            dataSourceId: component.dataView.dataSource.id,
            dataSourceColumn: component.dataView.values[0],
        };
    }

    return (
        <>
            <Head>
                <title>
                    Edycja komponentu | Fajne Dane
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}>
                <Container maxWidth="xl">
                    <Box sx={{ mb: 4, px: 3 }}>
                        <Grid container
                              justifyContent="space-between"
                              spacing={3}>
                            <Grid item md={12}>
                                <NextLink href={`/dashboard/reports/${reportId}/details`} passHref>
                                    <Link color="textPrimary"
                                          component="a"
                                          sx={{
                                              alignItems: 'center',
                                              display: 'flex'
                                          }}>
                                        <ArrowBackIcon fontSize="small"
                                                       sx={{ mr: 1 }}/>
                                        <Typography variant="subtitle2">
                                            {state.report.value.name}
                                        </Typography>
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item md={12}>
                                <BaseComponentForm componentType={componentType}
                                                   reportId={reportId}
                                                   componentId={componentId}
                                                   initialValues={initialValues}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(EditReportComponent));
