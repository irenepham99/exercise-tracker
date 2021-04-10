import React from "react";
import compose from "lodash/fp/compose";
import { Field, reduxForm } from "redux-form";
import { renderDatePicker, renderTextField } from "../Utils/InputUtils";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import { getExercise, logExercise } from "../actions";

class ExerciseLog extends React.Component {
  componentDidMount() {
    this.props.getExercise(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.logExercise(formValues, this.props.match.params.id);
  };

  renderHeader = () => {
    if (this.props.exercise) {
      return <h3>Record performance for {this.props.exercise.name}</h3>;
    } else {
      return <div>Loading...</div>;
    }
  };

  render() {
    //add date, weight, sets, reps
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    return (
      <div>
        {this.renderHeader()}
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field name="date" label="Date" component={renderDatePicker} />
          <Field
            name="weight"
            label="Weight"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">lb</InputAdornment>,
            }}
            component={renderTextField}
          />
          <Field name="sets" label="Sets" component={renderTextField} />
          <Field name="reps" label="Reps" component={renderTextField} />
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.weight) {
    errors.weight = "You must give a weight";
  } else if (!parseInt(formValues.weight)) {
    errors.weight = "Weight must be an integer";
  }
  if (!formValues.sets) {
    errors.sets = "You must give a sets";
  } else if (!parseInt(formValues.sets)) {
    errors.sets = "Sets must be an integer";
  }
  if (!formValues.reps) {
    errors.reps = "You must give a reps";
  } else if (!parseInt(formValues.reps)) {
    errors.reps = "Reps must be an integer";
  }
  if (!formValues.date) {
    errors.date = "You must choose a date";
  }
  return errors;
};

const mapStateToProps = (state, props) => {
  return { exercise: state.exercises[props.match.params.id] };
};

export default compose(
  connect(mapStateToProps, { getExercise, logExercise }),
  reduxForm({
    form: "exerciseLog", //both components will share the form
    validate,
  })
)(ExerciseLog);
