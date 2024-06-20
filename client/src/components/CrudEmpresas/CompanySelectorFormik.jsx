import { useField } from 'formik';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const CompanySelector = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    
    return (
        <FormControl fullWidth sx={props.sx} error={meta.touched && Boolean(meta.error)}>
            <InputLabel id={`${props.id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${props.id}-label`}
                {...field}
                value={field.value}  // Asegúrate de usar field.value para controlar el valor
                onChange={(event) => {
                    setValue(event.target.value);
                    if (props.onChange) {
                        props.onChange(event);  // Si quieres mantener el onChange externo
                    }
                }}
                displayEmpty
                variant='filled'
                fullWidth
                error={meta.touched && Boolean(meta.error)} 
            >
                {props.options.map((option) => (
                    <MenuItem key={option.ID} value={option.ID}>
                        {option.Nombre}
                    </MenuItem>
                ))}
            </Select>
            {meta.touched && meta.error ? <div>{meta.error}</div> : null}
        </FormControl>
    );
};
