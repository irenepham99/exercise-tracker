import React from "react";
import { connect } from "react-redux";
import { scaleLinear } from "d3-scale";
import * as d3 from "d3";
import { max } from "d3-array";
import { select } from "d3-selection";
import Chart from "./Chart";
import { getExercise, getExerciseLog } from "../../actions";

class ExerciseChart extends React.Component {
  //for each data point parse time and print value
  //three lines weight, sets, reps
  componentDidMount() {
    this.props.getExercise(this.props.match.params.id);
    this.props.getExerciseLog(this.props.match.params.id);
  }

  render() {
    if (!this.props.exercise || !this.props.exercise.logs) {
      return <div>Loading</div>;
    } else {
      return <Chart exercise={this.props.exercise} />;
    }
  }
}

const mapStateToProps = (state, props) => {
  return { exercise: state.exercises[props.match.params.id] };
};

export default connect(mapStateToProps, { getExercise, getExerciseLog })(
  ExerciseChart
);
