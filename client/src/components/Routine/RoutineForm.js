import React from "react";
import { Field, reduxForm, change } from "redux-form";
import { renderTextField } from "../../Utils/InputUtils";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import ExercisePicker from "./ExercisePicker";

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
        <Field name="name" label="Name" component={renderTextField} />
        <Field
          name="description"
          label="Description"
          component={renderTextField}
        />
        <Field
          name="exercise_ids"
          label="Exercises"
          component={ExercisePicker}
        />

        <button
          className={classes.button}
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  return {};
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
