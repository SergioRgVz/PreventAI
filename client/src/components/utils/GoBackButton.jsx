import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const GoBackButton = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <IconButton color="secondary" onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );
};
