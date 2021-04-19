import React from "react";
import { connect } from "react-redux";
import { getRoutine, updateRoutine } from "../../actions/routineActions";
import _ from "lodash";
import RoutineForm from "./RoutineForm";

class RoutineEdit extends React.Component {
  componentDidMount() {
    this.props.getRoutine(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.updateRoutine(formValues, this.props.match.params.id);
  };

  render() {
    if (!this.props.routine) {
      return <div>Loading</div>;
    }
    const exercise_ids = this.props.routine.exercises.map(
      (exercise) => exercise.id
    );
    return (
      <div>
        <h3>Edit Routine {this.props.routine.name}</h3>
        <RoutineForm
          initialValues={{
            ..._.pick(this.props.routine, "name", "description"),
            exercise_ids,
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { routine: state.routines[props.match.params.id] };
};

export default connect(mapStateToProps, { getRoutine, updateRoutine })(
  RoutineEdit
);
