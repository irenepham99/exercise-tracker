import React from "react";
import { connect } from "react-redux";
import { getRoutines } from "../../actions";
import RoutineCard from "./RoutineCard";

class RoutineList extends React.Component {
  componentDidMount() {
    this.props.getRoutines();
  }
  render() {
    const { routines } = this.props;
    console.log(routines);
    return routines.map((routine) => {
      return <RoutineCard key={routine.id} routine={routine} />;
    });
  }
}

const mapStateToProps = (state) => {
  return { routines: Object.values(state.routines) };
};

export default connect(mapStateToProps, { getRoutines })(RoutineList);
