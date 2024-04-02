import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { MinusOutlined as MinusOutlinedIcon } from '../icons/minus-outlined';
import { Logo } from './logo';


export const Footer = (props) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      borderTopColor: 'divider',
      borderTopStyle: 'solid',
      borderTopWidth: 1,
      pb: 6,
      pt: 6,
      textAlign: 'center'
    }}
    {...props}>
    <Container maxWidth="lg">
      <Typography
          color="textSecondary"
          sx={{ mt: 0 }}
          variant="caption">
        Sieć Obywatelska Watchdog Polska &middot; &copy; {new Date().getFullYear()}
      </Typography>

      <Divider
        sx={{
          borderColor: (theme) => alpha(theme.palette.primary.contrastText, 0.12),
          my: 1
        }}/>
    </Container>
  </Box>
);
