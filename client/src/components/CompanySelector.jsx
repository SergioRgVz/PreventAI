import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const CompanySelector = ({ id, name, label, value, onChange, options, sx }) => {
    return (
        <FormControl fullWidth sx={sx}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                displayEmpty
            >
                {options.map((option) => (
                    <MenuItem key={option.CIF} value={option.CIF}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
