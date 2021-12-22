import { Typography } from '@mui/material';
import { ConfirmModal } from "./confirm-modal";


export const RedirectBackConfirmModal = (props) => {
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
                      header="Czy chcesz wrócić na poprzednią stronę?"
                      cancelText="Nie, chcę tu zostać"
                      acceptText="Tak, wróć">
            <Typography align="center"
                        color="textSecondary"
                        sx={{mt: 1}}
                        variant="body2">
                Wracając na poprzednią stronę utracisz wszystkie dane, które wprowadziłeś dodając zbiór danych.
            </Typography>
        </ConfirmModal>
    )
}
