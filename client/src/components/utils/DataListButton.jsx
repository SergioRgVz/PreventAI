import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataButton } from './DataButton';

export const DataListButton = ({ onItemSelect, children, service, config }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const data = await service.getItems();
                setItems(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, [service]);

    return (
        <Stack spacing={2}>
            {Array.isArray(items) ? (
                items.map((item) => (
                    <DataButton
                        key={item[config.identifierKey]}
                        item={item}
                        config={config}
                        onClick={() => onItemSelect(item)}
                    >
                        {children}
                    </DataButton>
                ))
            ) : (
                <div>Error: La respuesta no es un array.</div>
            )}
        </Stack>
    );
};
