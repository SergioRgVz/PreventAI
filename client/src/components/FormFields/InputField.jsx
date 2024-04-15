import { at } from 'lodash';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function InputField(props) {
  const { errorText, multiline, rows, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <TextField
      type="text"
      error={meta.touched && meta.error && true}
      helperText={_renderHelperText()}
      multiline={multiline}
      rows={rows} // Added this line
      {...field}
      {...rest}
    />
  );
}
