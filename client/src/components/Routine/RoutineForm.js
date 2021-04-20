import React from "react";
import { Field, reduxForm, change } from "redux-form";
import { renderTextField } from "../../Utils/InputUtils";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import ExercisePicker from "./ExercisePicker";
import Grid from "@material-ui/core/Grid";
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
};

class RoutineForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={8}>
            <Field
              style={{ width: "100%" }}
              name="name"
              label="Name"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={8}>
            <Field
              style={{ width: "100%" }}
              name="description"
              label="Description"
              component={renderTextField}
            />
          </Grid>
          <Grid item xs={8}>
            <Field
              name="exercise_ids"
              label="Exercises"
              component={ExercisePicker}
            />
          </Grid>
          <Grid container justify="center" spacing={4}>
            <Grid item xs={2}>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </Button>
            </Grid>
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
  if (!formValues.exercise_ids || formValues.exercise_ids.length === 0) {
    errors.exercise_ids = "The routine needs to have exercises";
  }
  return errors;
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: "routineForm",
    validate,
    initialValues: {
      exercise_ids: [],
    },
  })
)(RoutineForm);
