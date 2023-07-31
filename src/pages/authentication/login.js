import {useEffect} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import {Box, Card, Container, Divider, Link, Typography} from '@mui/material';
import {LoginForm} from '../../components/authentication/login-form';
import {ResetPassword} from '../../components/authentication/reset-password-form';
import {Logo} from '../../components/logo';
import {withGuestGuard} from '../../hocs/with-guest-guard';
import {useAuth} from '../../hooks/use-auth';

const Login = () => {
    const router = useRouter();
    const {disableGuard} = router.query;

    return (
        <>
            <Head>
                <title>
                    Logowanie | Fajne Dane
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: '60px',
                            md: '120px'
                        }
                    }}
                >
                    <Card
                        elevation={16}
                        sx={{p: 4}}
                    >
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <NextLink
                                href="/"
                                passHref
                            >
                                <a>
                                    <Logo
                                        sx={{
                                            height: 40,
                                            width: 40
                                        }}
                                    />
                                </a>
                            </NextLink>
                            <Typography variant="h4">
                                Logowanie
                            </Typography>
                            <Typography
                                color="textSecondary"
                                sx={{mt: 2}}
                                variant="body2"
                            >
                                Zaloguj się, aby korzystać z Fajnych Danych
                            </Typography>
                        </Box>
                        <Box sx={{
                                flexGrow: 1,
                                mt: 3
                             }}>
                            <LoginForm/>
                        </Box>
                        <Divider sx={{my: 3}}/>
                        <Box sx={{
                            flexGrow: 1,
                            mt: 3
                        }}>
                            <Typography color="textSecondary"
                                        variant="body2">
                                Nie pamiętasz hasła?
                                <NextLink href={disableGuard
                                    ? `/authentication/reset-password?disableGuard=${disableGuard}`
                                    : '/authentication/reset-password'}
                                          passHref>
                                    <Link color="primary.main"
                                          sx={{mt: 1, ml: 1}}
                                          variant="body2">
                                        Odzyskaj hasło
                                    </Link>
                                </NextLink>
                             </Typography>
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default withGuestGuard(Login);
