import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Confirmation = ({ open, handleClose, handleConfirm, title, content, }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='xs'
            sx={{
                textAlign: 'center',
            }}
        >
            <DialogTitle id="alert-dialog-title">{title ? title : "Confirmation!"}</DialogTitle>

            <DialogContent >
                <DialogContentText id="alert-dialog-description" >
                    {content ? content : 'Are you sure you want to proceed?'}
                </DialogContentText>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', padding:'1rem' }}>
                <Button onClick={() => handleClose()} variant="outlined" color="info">
                    Cancel
                </Button>
                <Button onClick={() => handleConfirm()} variant="contained" color="info" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog >
    );
};

export default Confirmation