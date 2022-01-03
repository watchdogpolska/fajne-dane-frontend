import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Grid, Typography} from '@mui/material';
import {withAuthGuard} from '../../hocs/with-auth-guard';
import {withDashboardLayout} from '../../hocs/with-dashboard-layout';
import {gtm} from '../../lib/gtm';

const Overview = () => {

  return (
    <>
      <Head>
        <title>
          Fajne Dane
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
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Witam. Tu może być jakieś wprowadzenie, albo w ogóle tego ekranu może nie być.
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default withAuthGuard(withDashboardLayout(Overview));
