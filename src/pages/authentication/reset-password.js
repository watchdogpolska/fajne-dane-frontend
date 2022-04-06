import {useEffect} from 'react';
import {useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {Box, Card, Container, Typography} from '@mui/material';
import {AuthBanner} from '../../components/authentication/auth-banner';
import {Logo} from '../../components/logo';
import {withGuestGuard} from '../../hocs/with-guest-guard';
import {useAuth} from '../../hooks/use-auth';
import {gtm} from '../../lib/gtm';
import {ResetPasswordForm} from '@/components/authentication/reset-password-form';


const ResetPassword = () => {
    const {platform} = useAuth();
    const [messageSentEmail, setMessageSentEmail] = useState(null);

    const onMessageSent = function (mail) {
        setMessageSentEmail(mail);
    }

    let header = null;
    let content = null;
    if (messageSentEmail !== null) {
        header = (
            <>
                <Typography variant="h4">
                    Sprawdź pocztę
                </Typography>
                <Typography color="textSecondary"
                            sx={{mt: 2}}
                            variant="body2">
                    Jeśli w naszym serwisie istnieje konto założone na adres {messageSentEmail}, to właśnie wysłaliśmy na niego link do zmiany hasła.
                </Typography>
            </>
        );
    } else {
        header = (
            <>
                <Typography variant="h4">
                    Odzyskaj hasło
                </Typography>
                <Typography color="textSecondary"
                            sx={{mt: 2}}
                            variant="body2">
                    Podaj adres e-mail, na który założyłeś konto w Fajnych Danych. Wyślemy Ci link do zmiany
                    hasła.
                </Typography>
            </>
        );

        content = (
            <Box sx={{
                     flexGrow: 1,
                     mt: 3
                 }}>
                <ResetPasswordForm onMessageSent={onMessageSent}/>
            </Box>
        );
    }

    return (
        <>
            <Head>
                <title>
                    Zresetuj hasło | Fajne Dane
                </title>
            </Head>
            <Box component="main"
                 sx={{
                     backgroundColor: 'background.default',
                     display: 'flex',
                     flexDirection: 'column',
                     minHeight: '100vh'
                 }}>
                <Container maxWidth="sm"
                           sx={{
                               py: {
                                   xs: '60px',
                                   md: '120px'
                               }
                           }}>
                    <Card elevation={16}
                          sx={{p: 4}}>
                        <Box sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                             }}>
                            <NextLink href="/"
                                      passHref>
                                <a>
                                    <Logo sx={{
                                            height: 40,
                                            width: 40
                                          }}/>
                                </a>
                            </NextLink>
                            {header}
                        </Box>
                        {content}
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default withGuestGuard(ResetPassword);
