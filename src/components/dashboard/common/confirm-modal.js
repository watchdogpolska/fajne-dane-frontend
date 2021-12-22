import { Avatar, Modal, Box, Button, Container, Paper, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Check as CheckIcon } from '../../../icons/check';
import { QuestionMarkCircle as QuestionMarkCircleIcon } from '../../../icons/question-mark-circle';


export const ConfirmModal = (props) => {
    const {
        open,
        onClose,
        onAccept,
        header,
        cancelText,
        acceptText,
        children,
        ...other
    } = props;

    return (
        <Modal open={open}
               onClose={onClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
            <Box sx={{
                marginTop: "15vh",
                backgroundColor: 'rbga(0, 0, 0, 0.6)',
                minHeight: '100%',
                p: 3
            }}>
                <Container maxWidth="sm">
                    <Paper elevation={12}
                           sx={{p: 3}}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <QuestionMarkCircleIcon color="primary"
                                                    sx={{fontSize: 40}}/>
                            <Typography color="textPrimary"
                                        variant="h5">
                                {header}
                            </Typography>
                            {children}
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            mt: 4
                        }}>
                            <Button fullWidth
                                    onClick={onClose}
                                    size="large"
                                    sx={{mr: 2}}
                                    variant="outlined">
                                {cancelText}
                            </Button>
                            <Button fullWidth
                                    onClick={onAccept}
                                    size="large"
                                    variant="contained">
                                {acceptText}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Modal>
    );
};
