import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../../Utils/InputUtils";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";

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

class ExerciseForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div class="container" className={classes.container}>
          <div class="row">
            <div class="col">
              <Field name="name" label="Name" component={renderTextField} />
            </div>
            <div class="col">
              <Field
                name="description"
                label="Description"
                component={renderTextField}
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button
                className={classes.button}
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </button>
            </div>
            <div class="col">
              <button
                className={classes.button}
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </div>
        </div>
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

  return errors;
};

export default compose(
  withStyles(styles),
  reduxForm({
    form: "exerciseForm", //both components will share the form
    validate,
  })
)(ExerciseForm);
