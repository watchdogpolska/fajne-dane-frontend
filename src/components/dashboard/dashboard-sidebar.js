import {useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Box, Divider, Drawer, Typography, useMediaQuery} from '@mui/material';
import {OfficeBuilding as OfficeBuildingIcon} from '../../icons/office-building';
import {Database as DatabaseIcon} from '../../icons/database';
import {Reports as ReportsIcon} from '../../icons/reports';
import {ChartPie as ChartPieIcon} from '../../icons/chart-pie';
import {Collection as CollectionIcon} from '../../icons/collection';
import {Scrollbar} from '../scrollbar';
import {DashboardSidebarSection} from './dashboard-sidebar-section';
import {OrganizationPopover} from './organization-popover';


const getSections = (t) => [
  {
    title: t('Dane'),
    items: [
      {
        title: t('Zbiory danych'),
        path: '/dashboard/campaigns',
        icon: <DatabaseIcon fontSize="small" />,
        children: [
          {
            title: t('Lista zbiorów danych'),
            path: '/dashboard/campaigns'
          },
          {
            title: t('Dodaj zbiór'),
            path: '/dashboard/campaigns/create'
          },
        ]
      },
      {
        title: t('Instytucje'),
        path: '/dashboard/institutions',
        icon: <OfficeBuildingIcon fontSize="small" />,
        children: [
          {
            title: t('Typy instytucji'),
            path: '/dashboard/institutions'
          },
          {
            title: t('Dodaj typ'),
            path: '/dashboard/institutions/create'
          },
        ]
      },
    ]
  },
  {
    title: t('Raporty'),
    items: [
      {
        title: t('Źródła danych'),
        path: '/dashboard/sources',
        icon: <CollectionIcon fontSize="small" />,
      },
      {
        title: t('Widoki agregacji'),
        path: '/dashboard/aggregations',
        icon: <ChartPieIcon fontSize="small" />,
      },
      {
        title: t('Raporty'),
        path: '/dashboard/reports',
        icon: <ReportsIcon fontSize="small" />,
        children: [
          {
            title: t('Lista raportów'),
            path: '/dashboard/reports'
          },
          {
            title: t('Dodaj raport'),
            path: '/dashboard/reports/create'
          },
        ]
      },
    ]
  },
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{
            display: 'flex',
            p: 4,
            pb: 0
          }}>
            <Typography variant="h6">
              FAJNE DANE
            </Typography>
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
