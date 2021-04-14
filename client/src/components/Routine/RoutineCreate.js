import React from "react";
import { connect } from "react-redux";
import { getRoutine, createRoutine } from "../../actions";
import _ from "lodash";
import RoutineForm from "./RoutineForm";

class RoutineCreate extends React.Component {
  componentDidMount() {
    this.props.getRoutine(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.createRoutine(formValues, this.props.match.params.id);
  };

  render() {
    if (!this.props.routine) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h3>Create Routine {this.props.routine.name}</h3>
        <RoutineForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { routine: state.routines[props.match.params.id] };
};

export default connect(mapStateToProps, { getRoutine, createRoutine })(
  RoutineCreate
);
