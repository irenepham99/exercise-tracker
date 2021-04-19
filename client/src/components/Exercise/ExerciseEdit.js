import React from "react";
import { connect } from "react-redux";
import { getExercise, updateExercise } from "../../actions/exerciseActions";
import ExerciseForm from "./ExerciseForm";
import _ from "lodash";

class ExerciseEdit extends React.Component {
  componentDidMount() {
    this.props.getExercise(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.updateExercise(formValues, this.props.match.params.id);
  };

  render() {
    if (!this.props.exercise) {
      return <div>Loading</div>;
    }
    return (
      <div style={{ margin: "20px" }}>
        <h3>Edit Exercise {this.props.exercise.name}</h3>
        <ExerciseForm
          initialValues={_.pick(
            this.props.exercise,
            "name",
            "cues",
            "compound",
            "body_group"
          )}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { exercise: state.exercises[props.match.params.id] };
};

export default connect(mapStateToProps, { getExercise, updateExercise })(
  ExerciseEdit
);
