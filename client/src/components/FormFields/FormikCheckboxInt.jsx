import { useFormikContext } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useEffect } from 'react';

export const FormikCheckboxInt = ({ name, label }) => {
    const { values, setFieldValue } = useFormikContext();
    useEffect(() => {
        setFieldValue(name, 0);
    }, []);
    const handleChange = (event) => {
        const isChecked = event.target.checked;
        let currentValue = values[name] || 0;

        if (isChecked) {
            setFieldValue(name, currentValue + 1);
        } else {
            if (currentValue > 0) {
                setFieldValue(name, currentValue - 1);
            }
        }
    };

const isChecked = values[name] > 0;

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={isChecked}
                    onChange={handleChange}
                />
            }
            label={label}
        />
    );
};
