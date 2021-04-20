import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";

const RoutineExerciseTable = ({ exercises }) => {
  if (!exercises) {
    return <div>There are no exercises for this routine!</div>;
  }
  return (
    <div style={{ width: "100%" }}>
      <Typography align="center" variant="h5" gutterBottom>
        Exercises in this Routine
      </Typography>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Muscle Group</b>
              </TableCell>
              <TableCell align="right">
                <b>Type</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exercises.map((exercise) => (
              <TableRow key={exercise.name}>
                <TableCell component="th" scope="row">
                  {exercise.name}
                </TableCell>
                <TableCell align="right">{exercise.body_group}</TableCell>
                <TableCell align="right">
                  {exercise.compound ? "Compound" : "Isolation"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoutineExerciseTable;
