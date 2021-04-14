import React from "react";
import { connect } from "react-redux";
import { getExercises } from "../../actions";
import ExerciseCard from "./ExerciseCard";

class ExerciseList extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }
  render() {
    const { exercises } = this.props;
    return exercises.map((exercise) => {
      return <ExerciseCard key={exercise.name} exercise={exercise} />;
    });
  }
}

const mapStateToProps = (state) => {
  return { exercises: Object.values(state.exercises) };
};

export default connect(mapStateToProps, { getExercises })(ExerciseList);
