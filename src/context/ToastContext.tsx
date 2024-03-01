import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ToastProps {
  color: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

interface ToastContextProps {
  showToast: (props: ToastProps) => void;
  hideToast: () => void;
  isStateToast: boolean;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

// @ts-ignore
const ToastContextProvider: React.FC = ({ children }) => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);
  const [isStateToast, setIsStateToast] = useState(false);

  const showToast = useCallback((props: ToastProps) => {
    setToastProps(props);
    setIsStateToast(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsStateToast(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      hideToast();
    }, 4000);
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast, isStateToast }}>
      <Snackbar
        open={isStateToast}
        autoHideDuration={4000}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        sx={{
          marginTop: 6,
        }}
        onClose={() => hideToast()}
      >
        <Alert
          onClose={() => hideToast()}
          severity={toastProps?.color}
          variant="filled"
          sx={{ width: '100%', color: '#fff' }}
        >
          {toastProps?.message}
        </Alert>
      </Snackbar>
      {children}
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
}

export { useToast, ToastContextProvider };