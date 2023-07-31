import {Box, Button, Container, Modal, Paper, Typography} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {useRouter} from 'next/router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export const NextDocumentModal = (props) => {
    const {
        campaignId,
        nextDocumentId,
        open,
        ...other
    } = props;
    const router = useRouter();

    let icon = <ThumbUpIcon color="primary" sx={{fontSize: 40}}/>;
    let header = "Wszystkie dokumenty zostały zamknięte!";
    let description = "Lista dokumentów nie zawiera już nieuzupełnionych dokumentów ani konfliktów.";
    let acceptText = "Przejdź do zbiorów danych";
    let cancelText = "Wróć do listy dokumentów";

    if (nextDocumentId) {
        icon = <CheckCircleIcon color="primary" sx={{fontSize: 40}}/>;
        header = "Sukces! Dokument został zamknięty";
        description = "Co chcesz zrobić teraz?";
        acceptText = "Uzupełnij kolejny dokument";
        cancelText = "Wróć do listy dokumentów";
    }

    const handleAccept = (event) => {
        event.preventDefault();
        if (nextDocumentId) {
            router.push(`/dashboard/campaigns/${campaignId}/documents/${nextDocumentId}`);
        } else {
            router.push(`/dashboard/campaigns`);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        router.push(`/dashboard/campaigns/${campaignId}`);
    };

    return (
        <Modal open={open}
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
                            {icon}
                            <Typography color="textPrimary"
                                        variant="h5">
                                {header}
                            </Typography>
                            <Typography color="textSecondary"
                                        variant="body2">
                                {description}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            mt: 4
                        }}>
                            <Button fullWidth
                                    onClick={handleCancel}
                                    size="large"
                                    sx={{mr: 2, padding: "10px"}}
                                    variant="outlined">
                                {cancelText}
                            </Button>
                            <Button fullWidth
                                    onClick={handleAccept}
                                    sx={{padding: "10px"}}
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
