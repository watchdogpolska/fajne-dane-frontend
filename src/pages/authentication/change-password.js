import {useEffect} from 'react';
import {useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {Box, Card, Container, Typography} from '@mui/material';
import {AuthBanner} from '../../components/authentication/auth-banner';
import {Logo} from '../../components/logo';
import {withGuestGuard} from '../../hocs/with-guest-guard';
import {useAuth} from '../../hooks/use-auth';
import {ChangePasswordForm} from '@/components/authentication/change-password-form';
import {getSearchParams} from '@/utils/url';


const ChangePassword = () => {
    let searchParams = getSearchParams();

    let token = searchParams['token'] || null;

    let content = null;
    let header = null;

    if (token !== null) {
        header = (
            <>
                <Typography variant="h4">
                    Utwórz nowe hasło
                </Typography>
                <Typography color="textSecondary"
                            sx={{mt: 2}}
                            variant="body2">
                    Uzupełnij formularz, aby znów korzystać z Fajnych Danych
                </Typography>
            </>
        );

        content = (
            <Box sx={{
                flexGrow: 1,
                mt: 3
            }}>
                <ChangePasswordForm token={token}/>
            </Box>
        );
    } else {
        header = (
            <>
                <Typography variant="h4">
                    Nieprawidłowy link
                </Typography>
                <Typography color="textSecondary"
                            sx={{mt: 2}}
                            variant="body2">
                    Użyty został niepoprawny link resetu hasło. Upewnij się, że używasz linku przesłanego w mailu.
                </Typography>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>
                    Password Recovery | Material Kit Pro
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

export default withGuestGuard(ChangePassword);
