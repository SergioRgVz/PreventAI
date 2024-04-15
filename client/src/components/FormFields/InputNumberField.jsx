import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function InputNumberField(props) {
    const { errorText, ...rest } = props;
    
    const [field, meta, helpers] = useField(props);

    const handleChange = (event) => {
        const value = event.target.value;
        const numberValue = value === "" ? undefined : Number(value.replace(',', '.'));
        if (!isNaN(numberValue)) {
            helpers.setValue(numberValue);
        } else {
            helpers.setValue(undefined);
        }
    };

    function _renderHelperText() {
        if (meta.touched && meta.error) {
            return meta.error;
        }
    }

    return (
        <TextField
            type="text" 
            error={meta.touched && !!meta.error}
            helperText={_renderHelperText()}
            onChange={handleChange}
            value={field.value === undefined ? '' : field.value}
            {...field}
            {...rest}
        />
    );
}
