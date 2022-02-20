import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box} from '@mui/material';
import {withAuthGuard} from '@/hocs/with-auth-guard';
import {withDashboardLayout} from '@/hocs/with-dashboard-layout';


const Account = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>
                    Fajne Dane - Konto
                </title>
            </Head>
            <Box component="main"
                 sx={{
                     flexGrow: 1,
                     py: 8
                 }}>
            </Box>
        </>
    );
};


export default withAuthGuard(withDashboardLayout(Account));
