import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderTextField, renderSelectField } from "../../Utils/InputUtils";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const styles = {
  button: {
    width: "100%",
  },
  container: {
    margin: 20,
    width: "100%",
  },
  row: {
    width: "100%",
  },
  col: {
    margin: 10,
  },
  input: {
    width: "100%",
  },
};

const muscleGroups = [
  "legs",
  "quads",
  "hamstring",
  "back",
  "chest",
  "abs",
  "shoulders",
  "tricep",
  "bicep",
];

class ExerciseForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Field
              className={classes.input}
              name="name"
              label="Name"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              className={classes.input}
              name="cues"
              label="Cues"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={3}>
            <Field
              className={classes.input}
              name="body_group"
              label="Muscle Group"
              component={renderSelectField}
            >
              {muscleGroups.map((value) => {
                return (
                  <MenuItem value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </MenuItem>
                );
              })}
            </Field>
          </Grid>
          <Grid item xs={3}>
            <Field
              name="compound"
              label="Exercise Type"
              component={renderSelectField}
            >
              <MenuItem value={true}>Compound</MenuItem>
              <MenuItem value={false}>Isolation</MenuItem>
            </Field>
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={4}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
              disabled={pristine || submitting}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              className={classes.button}
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must give a name";
  }

  if (!formValues.description) {
    errors.description = "You must give a description";
  }

  if (!formValues.focus) {
    errors.focus = "You must give a focus";
  }
  return errors;
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: "exerciseForm", //both components will share the form
    validate,
  })
)(ExerciseForm);
