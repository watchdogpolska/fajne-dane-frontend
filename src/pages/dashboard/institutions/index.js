import {useEffect, useRef, useState, useReducer} from 'react';
import Head from 'next/head';
import {Search as SearchIcon} from '@/icons/search';
import {Loading} from '@/components/dashboard/common/loading';
import {useRouter} from 'next/router'
import {Box, Button, Card, Container, Grid, InputAdornment, TextField, Typography} from '@mui/material';
import {Plus as PlusIcon} from '@/icons/plus';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';
import {useAuth} from "@/hooks/use-auth";
import NextLink from 'next/link';
import {
    InstitutionsGroupListTable
} from "@/components/dashboard/institutions/institution-groups/institution-groups-list-table";



const applyFilters = (data, filters) => data.filter((element) => {

    if (filters['query']) {
        let queryTokens = filters['query'].toLowerCase().split(' ');

        let matchedTokens = 0;
        for (let token of queryTokens) {
            if (element.name.toLowerCase().includes(token))
                matchedTokens+=1;
        }
        if (queryTokens.length !== matchedTokens)
            return false;
    }
    return true;
});


const InstitutionGroups = () => {

    const queryRef = useRef(null);
    const { repositories } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [institutionGroups, setInstitutionGroups] = useState([]);
    const [filters, setFilters] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            query: "",
        }
    );

    async function fetchInstitutionGroupsData() {
        let _institutionGroups = await repositories.institutionGroup.list();
        setLoading(false);
        setInstitutionGroups(_institutionGroups);
    }

    useEffect(() => {
        fetchInstitutionGroupsData();
    }, []);

    if (loading)
        return <Loading/>;

    const handleQueryChange = (event) => {
        event.preventDefault();
        setFilters({
            query: queryRef.current?.value
        });
    };

    const filteredInstitutionGroups = applyFilters(institutionGroups, filters);

    return (
        <>
            <Head>
                <title>
                    Typy instytucji | Fajne Dane
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
                            <Grid item md={8} xs={12}>
                                <Typography variant="h4">
                                   Typy instytucji
                                </Typography>
                                <Typography color="textSecondary"
                                            variant="body2"
                                            sx={{ mt: 1 }}>
                                    Instytucja to organizacja, placówka lub pojedyńcza osoba, która przygotowała wpisy (np. dokumenty). W tym miejscu dodasz lub usuniesz typ instytucji.
                                </Typography>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <Grid container
                                      spacing={1}
                                      sx={{
                                          flexDirection: 'row-reverse',
                                          mt: 2,
                                          pl: 3,
                                          '@media screen and (max-width: 1000px)': {
                                              flexDirection: 'row',
                                          },
                                      }}>
                                    <Grid item>
                                        <NextLink href={`/dashboard/institutions/create`} passHref>
                                            <Button component="a"
                                                    startIcon={(
                                                        <PlusIcon fontSize="small" />
                                                    )}
                                                    variant="contained">
                                                Dodaj nowy typ
                                            </Button>
                                        </NextLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexWrap: 'wrap',
                                m: -1.5,
                                p: 3
                            }}
                        >
                            <Box
                                component="form"
                                onSubmit={handleQueryChange}
                                sx={{
                                    flexGrow: 1,
                                    m: 1.5
                                }}
                            >
                                <TextField
                                    defaultValue=""
                                    fullWidth
                                    inputProps={{ ref: queryRef }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Wyszukaj po nazwie"
                                />
                            </Box>
                        </Box>
                        <InstitutionsGroupListTable institutionGroups={filteredInstitutionGroups}/>
                    </Card>
                </Container>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(InstitutionGroups));
