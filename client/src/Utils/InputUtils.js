import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

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
    style={{ width: "100%" }}
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

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <div>
    <InputLabel id="select-label">{label}</InputLabel>
    <Select
      style={{ width: "100%" }}
      labelId="select-label"
      errorText={touched && error}
      {...input}
      onChange={(event) => input.onChange(event.target.value)}
      children={children}
      {...custom}
    />
  </div>
);
