import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlertDialog({ handleDelete, color="error", aria_label="eliminar compañía"}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteInternal = () => {
        console.log('Elemento eliminado');
        handleDelete();
        handleClose();
    };

    return (
        <React.Fragment>
        <IconButton color={color} aria-label={aria_label} onClick={handleClickOpen}>
            <DeleteIcon />
        </IconButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Confirmar eliminación"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="error">
                Cancelar
            </Button>
            <Button onClick={handleDeleteInternal} color="inherit" autoFocus>
                Confirmar
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}
