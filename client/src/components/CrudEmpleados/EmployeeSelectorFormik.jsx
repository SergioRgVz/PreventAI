import { useField } from 'formik';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const EmployeeSelector = ({ label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    return (
        <FormControl fullWidth sx={props.sx} error={meta.touched && Boolean(meta.error)}>
            <InputLabel id={`${props.id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${props.id}-label`}
                {...field} 
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                displayEmpty
                variant='filled'
                fullWidth
                error={meta.touched && Boolean(meta.error)} 
                helperText={meta.touched && meta.error} 
            >
                {props.options.map((option) => (
                    <MenuItem key={option.DNI} value={option.DNI}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
