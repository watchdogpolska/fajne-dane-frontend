import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading = () => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent:'center',
            marginTop: "100px",
            alignItems:'center'
        }}>
            <CircularProgress />
        </Box>
    );

};
