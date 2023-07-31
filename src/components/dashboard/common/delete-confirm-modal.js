import {Typography} from '@mui/material';
import {ConfirmModal} from "./confirm-modal";


export const DeleteConfirmModal = (props) => {
    const {
        open,
        header,
        message1,
        message2,
        onClose,
        onAccept,
        ...other
    } = props;


    return (
        <ConfirmModal open={open}
                      onClose={onClose}
                      onAccept={onAccept}
                      header={header}
                      cancelText="Anuluj"
                      acceptText="Usuń">
            <Typography align="center"
                        color="textSecondary"
                        sx={{mt: 1}}
                        variant="body2">
                {message1}
            </Typography>
            <Typography align="center"
                        color="textSecondary"
                        sx={{mt: 1}}
                        variant="body2">
                {message2}
            </Typography>
        </ConfirmModal>
    )
    //header="Usunać wybrane wpisy?"
    //Czy jesteś pewien, że chcesz usunąć zaznaczone wpisy?
    //Uwaga, operacja usunięcia wpisów jest nieodwracalna.
}
