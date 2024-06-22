import { Button, Card, CardContent, Typography } from '@mui/material';

const getFieldValue = (field, item) => {
    return field.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null), item);
};

export const DataButton = ({ item, config, onClick, children }) => {
    return (
        <Card onClick={onClick} sx={{ cursor: 'pointer', m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <CardContent sx={{ flex: '1 1 auto' }}>
                {config.fields.map((field) => (
                    <Typography key={field.name} gutterBottom variant="body2" color="text.secondary">
                        {field.label}: {getFieldValue(field.name, item)}
                    </Typography>
                ))}
            </CardContent>
            {children}
        </Card>
    );
};

export default DataButton;
