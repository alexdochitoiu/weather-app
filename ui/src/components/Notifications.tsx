import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';

const Notifications: React.FC = () => {
  const { state } = useAppContext();
  const { clearSuccess, clearError } = useCitiesActions();

  return (
    <>
      {/* Success Snackbar */}
      <Snackbar
        open={!!state.success}
        autoHideDuration={4000}
        onClose={clearSuccess}
      >
        <Alert onClose={clearSuccess} severity="success">
          {state.success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!state.error}
        autoHideDuration={6000}
        onClose={clearError}
      >
        <Alert onClose={clearError} severity="error">
          {state.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notifications;
