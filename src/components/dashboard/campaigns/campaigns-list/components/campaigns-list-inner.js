import {styled} from '@mui/material/styles';


export const CampaignsListInner = styled('div',
    { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        overflow: 'hidden',
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
        zIndex: 1,
        [theme.breakpoints.up('lg')]: {
            marginRight: -500
        },
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            [theme.breakpoints.up('lg')]: {
                marginRight: 0
            },
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            })
        })
    }));
