import TextField from "@material-ui/core/TextField";

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderDatePicker = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id="date"
    label={label}
    type="date"
    error={touched && invalid}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
    {...custom}
  />
);
