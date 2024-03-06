import { ButtonBase, Card, CardContent, Typography } from '@mui/material';

export const CompanyButton = ({ title, CIF, onClick }) => {
  return (
    <ButtonBase
      onClick={() => onClick && onClick(CIF)}
      style={{ display: 'block', textAlign: 'initial', width: '100%' }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            CIF: {CIF}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};
