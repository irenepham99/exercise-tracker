import React from "react";
import { connect } from "react-redux";
import { getExercises, deleteExercise } from "../../actions/exerciseActions";
import ExerciseCard from "./ExerciseCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import compose from "lodash/fp/compose";
import history from "../../history";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import TimelineIcon from "@material-ui/icons/Timeline";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = {
  table: {
    margin: "20px",
    maxWidth: "95%",
  },
};

const rowHeaders = ["Exercise Name", "Cues", "Muscle Group", "Type", "Actions"];

class ExerciseList extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }

  getRowColor = (index) => {
    return index % 2 == 0 ? "white" : "#d7dae0";
  };

  render() {
    const { classes, exercises } = this.props;

    if (!exercises) {
      return <div>Loading...</div>;
    }
    if (exercises.length === 0) {
      return <div>There are no exercises! Please create one!</div>;
    }
    return (
      <div>
        <Typography align="center" style={{ padding: "20px" }} variant="h4">
          All Exercises
        </Typography>
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ backgroundColor: "#d7dae0" }}>
                {rowHeaders.map((headerName, index) => {
                  return (
                    <TableCell align={index === 0 ? "left" : "right"}>
                      <Typography variant="h6">{headerName}</Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.exercises.map((exercise, index) => (
                <TableRow
                  style={{ backgroundColor: this.getRowColor(index) }}
                  key={exercise.id}
                >
                  <TableCell component="th" scope="row">
                    {exercise.name}
                  </TableCell>
                  <TableCell align="right">{exercise.cues}</TableCell>
                  <TableCell align="right">{exercise.body_group}</TableCell>
                  <TableCell align="right">
                    {exercise.compound ? "Compound" : "Isolation"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        history.push(`/exercise/edit/${exercise.id}`)
                      }
                      size="medium"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        history.push(`/exercise/${exercise.id}/chart`)
                      }
                      size="medium"
                    >
                      <TimelineIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        history.push(`/exercise/${exercise.id}/log`)
                      }
                      size="medium"
                    >
                      <FitnessCenterIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      onClick={() => this.props.deleteExercise(exercise.id)}
                      size="medium"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  // render() {
  //   const { exercises } = this.props;
  //   if (!exercises) {
  //     return <div>Loading...</div>;
  //   }
  //   if (exercises.length === 0) {
  //     return <div>There are no exercises! Please create one!</div>;
  //   }
  //   return (
  //     <div>
  //       <h3>All Exercises</h3>
  //       {exercises.map((exercise) => {
  //         return <ExerciseCard key={exercise.name} exercise={exercise} />;
  //       })}
  //     </div>
  //   );
  // }
}

const mapStateToProps = (state) => {
  return { exercises: Object.values(state.exercises) };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getExercises, deleteExercise })
)(ExerciseList);
