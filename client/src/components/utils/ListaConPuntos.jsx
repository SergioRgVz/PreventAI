import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ListaConPuntos = ({ elementos }) => {
    return (
        <div>
            {elementos && elementos.length > 0 ? (
                <List>
                    {elementos.map((texto, index) => (
                        <ListItem key={index} style={{ padding: 0 }}>
                            <Box component="span" sx={{ display: 'list-item', listStyleType: 'disc', marginLeft: '20px', width: '100%' }}>
                                <ListItemText primary={texto} />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No hay elementos en la lista</Typography>
            )}
        </div>
    );
};

export default ListaConPuntos;
