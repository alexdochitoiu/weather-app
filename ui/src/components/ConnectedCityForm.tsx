import React from 'react';
import { useAppContext } from '@/context/AppContext';
import { useCitiesActions } from '@/hooks/useCitiesActions';
import CityForm from './CityForm';

const ConnectedCityForm: React.FC = () => {
  const { state } = useAppContext();
  const { closeForm, handleFormSuccess } = useCitiesActions();

  return (
    <CityForm
      open={state.formOpen}
      onClose={closeForm}
      city={state.editingCity}
      onSuccess={handleFormSuccess}
    />
  );
};

export default ConnectedCityForm;
