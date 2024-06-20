import { useFormikContext } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';

export const FormikCheckbox = ({ name, label, value }) => {
    const { values, setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        const currentList = values[name] || [];

        if (isChecked) {
            const newList = [...currentList, value];
            setFieldValue(name, newList);
        } else {
            const newList = currentList.filter(item => item.ID !== value.ID);
            setFieldValue(name, newList);
        }
    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={values[name]?.some(item => item.ID === value.ID) || false}
                    onChange={handleChange}
                />
            }
            label={label}
        />
    );
};
