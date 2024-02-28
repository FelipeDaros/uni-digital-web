import React, { useState } from 'react';
import { Alert, Snackbar, SnackbarProps } from '@mui/material';

type Props = SnackbarProps & {
  color: 'success' | 'error' | 'info' | 'warning';
  message: string;
};

export function useToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const showToast = (message: string, color: Props['color'] = 'success') => {
    setMessage(message);
    setColor(color);
    setIsOpen(true);

    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  const Toast: React.FC = () => (
    <Snackbar
      open={isOpen}
      autoHideDuration={4000}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      sx={{
        marginTop: 6,
      }}
      onClose={() => setIsOpen(false)}
    >
      <Alert
        onClose={() => setIsOpen(false)}
        severity={color}
        variant="filled"
        sx={{ width: '100%', color: '#fff' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );

  return { showToast, Toast };
}
