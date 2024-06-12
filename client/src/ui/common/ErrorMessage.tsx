import { Alert } from '@mui/material';
import React from 'react';
import { Snackbar } from 'ui/components';

function ErrorMessage({
  open,
  message,
  handleClose,
}: {
  open: boolean;
  message: string;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
