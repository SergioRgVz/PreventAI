// LocationSelector.js
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export const LocationSelector = ({ id, name, label, value, onChange, options, error }) => {
  return (
    <FormControl variant="outlined" fullWidth required sx={{ m: 1, mt: 3 }}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        label={label}
        onChange={onChange}

        error={!!error}
      >
        {options.map((option) => (
          <MenuItem key={option.code} value={option.code}>{option.label}</MenuItem>
        ))}
      </Select>
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
};
