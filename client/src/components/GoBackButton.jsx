import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const GoBackButton = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Esto llevará al usuario a la página anterior en el historial de navegación
  };

  return (
    <IconButton color="info" onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};
