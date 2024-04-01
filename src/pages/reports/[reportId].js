import {useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Box, Container} from '@mui/material';
import {useAuth} from "@/hooks/use-auth";
import {Loading} from '@/components/dashboard/common/loading';
import Report from "@/components/reports/report";


const ReportPage = () => {
    const router = useRouter();
    const { reportId } = router.query;
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const { repositories } = useAuth();


    useEffect(() => {
        if (reportId != null) {
            fetchReport();
        }

    }, [reportId]);

    async function fetchReport() {
        let result = await repositories.report.renderReport({id: reportId});
        setReport(result);
        setLoading(false);
    }

    if (loading) {
      return <Loading/>;
    }


    return (
        <>
            <Head>
                <title>
                    Raport | Fajne Dane
                </title>
            </Head>
            <Box component="main"
                 sx={{
                     flexGrow: 1,
                     py: 8
                 }}>
                <Container maxWidth="md">
                    <Box sx={{ mb: 4 }}>
                        <Report report={report}/>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ReportPage;
