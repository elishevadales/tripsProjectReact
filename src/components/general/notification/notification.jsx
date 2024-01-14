import React, { useState, useEffect } from 'react';
import { Snackbar, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import notificationSound from '../../../sounds/notification.wav';

const Notification = ({ message, onClose }) => {
    const [open, setOpen] = useState(true);
    const [audio] = useState(new Audio(notificationSound));

    useEffect(() => {
        audio.play()
        const timer = setTimeout(() => {
            handleClose();
        }, 20000); // Automatically close after 20 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        onClose();
    };

    return (
        <Snackbar style={{marginTop:"90px"}}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={20000}
            onClose={handleClose}
            action={
                <Stack direction="row"  alignItems="center">
                     <IconButton size="small" color="inherit" onClick={handleClose} className='ms-0'>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    <span style={{ marginLeft: 'auto' }}>{message}</span>
                   
                </Stack>
            }
        />
    );
}

export default Notification;
