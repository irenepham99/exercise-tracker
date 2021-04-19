import React from "react";
import { connect } from "react-redux";
import compose from "lodash/fp/compose";
import { createExercise } from "../../actions/exerciseActions";
import { withStyles } from "@material-ui/core/styles";
import ExerciseForm from "./ExerciseForm";

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

class ExerciseCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createExercise(formValues);
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Create a New Exercise</h3>
        <ExerciseForm onSubmit={this.onSubmit}></ExerciseForm>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(null, { createExercise })
)(ExerciseCreate);
