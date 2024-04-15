import { useFormikContext } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';

export const FormikCheckbox = ({ name, label }) => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        const currentList = values[name] || [];

        if (isChecked) {
            const newList = [...currentList, label];
            setFieldValue(name, newList);
        } else {
            const newList = currentList.filter(item => item !== label);
            setFieldValue(name, newList);
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={values[name]?.includes(label) || false}
                    onChange={handleChange}
                />
            }
            label={label}
        />
    );
};
