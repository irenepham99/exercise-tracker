import React from "react";
import { connect } from "react-redux";
import { getRoutines } from "../../actions/routineActions";
import RoutineCard from "./RoutineCard";

class RoutineList extends React.Component {
  componentDidMount() {
    this.props.getRoutines();
  }
  render() {
    const { routines } = this.props;
    if (!routines) {
      return <div>Loading...</div>;
    }
    if (routines.length === 0) {
      return <div>There are no routines! Please create one!</div>;
    }
    return (
      <div>
        <h3>All Routines</h3>
        {routines.map((routine) => {
          return <RoutineCard key={routine.id} routine={routine} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    routines: Object.values(state.routines),
  };
};

export default connect(mapStateToProps, { getRoutines })(RoutineList);
