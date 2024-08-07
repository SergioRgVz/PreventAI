import { Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from './AlertDialog';

const getFieldValue = (field, item) => {
    return field.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : null), item);
};

export const DataCard = ({ item, config, onRemove }) => {

    const handleView = () => {
        config.onView && config.onView(item);
    };

    const handleEdit = () => {
        config.onEdit && config.onEdit(item);
    };

    const handleDelete = async () => {
        try {
            await config.deleteService(item[config.identifierKey]);
            onRemove(item[config.identifierKey]);
        } catch (error) {
            console.error('Error al eliminar: ', error);
        }
    };

    return (
        <Card sx={{ m: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <CardContent sx={{ flex: '1 1 auto' }}>
                {config.fields.map((field) => (
                    <Typography key={field.name} gutterBottom variant="body2" color="text.buttons">
                        {field.label}: {getFieldValue(field.name, item)}
                    </Typography>
                ))}
            </CardContent>
            <CardActions sx={{ flexDirection: 'column' }}>
                {config.viewEnabled && (
                    <IconButton onClick={handleView} color="secondary" aria-label="ver detalle">
                        <VisibilityIcon />
                    </IconButton>
                )}
                {config.editEnabled && (
                    <IconButton onClick={handleEdit} color="secondary" aria-label="editar">
                        <EditIcon />
                    </IconButton>
                )}
                {config.deleteEnabled && (
                    <AlertDialog handleDelete={handleDelete} color="error" aria_label="eliminar">
                        <IconButton color="error" aria-label="eliminar">
                            <DeleteIcon />
                        </IconButton>
                    </AlertDialog>
                )}
            </CardActions>
        </Card>
    );
};
