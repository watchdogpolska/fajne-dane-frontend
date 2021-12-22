import { Typography } from '@mui/material';
import { ConfirmModal } from "./confirm-modal";


export const DeleteConfirmModal = (props) => {
    const {
        open,
        onClose,
        onAccept,
        ...other
    } = props;


    return (
        <ConfirmModal open={open}
                      onClose={onClose}
                      onAccept={onAccept}
                      header="Usunać wybrane wpisy?"
                      cancelText="Anuluj"
                      acceptText="Usuń">
            <Typography align="center"
                        color="textSecondary"
                        sx={{mt: 1}}
                        variant="body2">
                Czy jesteś pewien, że chcesz usunąć zaznaczone wpisy?
            </Typography>
            <Typography align="center"
                        color="textSecondary"
                        sx={{mt: 1}}
                        variant="body2">
                Uwaga, operacja usunięcia wpisów jest nieodwracalna.
            </Typography>
        </ConfirmModal>
    )
}
