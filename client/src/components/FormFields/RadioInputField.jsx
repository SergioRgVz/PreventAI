import { useField } from 'formik';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';

export default function RadioInputField(props) {
    const { label, data, row, onChange, ...rest } = props;
    const [field, meta, helpers] = useField(props);

    const handleChange = (event) => {
        helpers.setValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    function _renderHelperText() {
        if (meta.touched && meta.error) {
            return <FormHelperText>{meta.error}</FormHelperText>;
        }
    }

    return (
        <FormControl {...rest} error={meta.touched && !!meta.error}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row={row} {...field} onChange={handleChange}>
                {data.map((item, index) => (
                    <FormControlLabel key={index} value={item.value} control={<Radio />} label={item.label} />
                ))}
            </RadioGroup>
            {_renderHelperText()}
        </FormControl>
    );
}
