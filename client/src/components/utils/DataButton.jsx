import { ButtonBase, Card, CardContent, Typography } from '@mui/material';

export const DataButton = ({ item, config, onClick }) => {
    return (
        <ButtonBase
            onClick={() => onClick && onClick(item)}
            style={{ display: 'block', textAlign: 'initial', width: '100%' }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    {config.fields.map((field) => (
                        <Typography key={field.name} gutterBottom={field.gutterBottom} variant={field.variant} component="div">
                            {field.label}: {item[field.name]}
                        </Typography>
                    ))}
                </CardContent>
            </Card>
        </ButtonBase>
    );
};
