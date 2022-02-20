import {Link, Typography} from '@mui/material';
import NextLink from 'next/link';
import {ArrowBack as ArrowBackIcon} from '@mui/icons-material';


export const ArrowBack = (props) => {
    const {
        link,
        text,
        ...other
    } = props;

    return (
        <NextLink href={link} passHref>
            <Link color="textPrimary"
                  component="a"
                  sx={{
                      alignItems: 'center',
                      display: 'flex'
                  }}>
                <ArrowBackIcon fontSize="small"
                               sx={{ mr: 1 }}/>
                <Typography variant="subtitle2">
                    {text}
                </Typography>
            </Link>
        </NextLink>
    );

};
