import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { compose } from "redux";
import { deleteExercise } from "../../actions/exerciseActions";
import history from "../../history";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    margin: "5px",
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
  },
});

//name, cues, compound vs isolation, body group
const ExerciseCard = (props) => {
  const classes = useStyles();
  const { exercise, deleteExercise } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {exercise.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Cues: {exercise.cues}
          <br />
          Body Group: {exercise.body_group}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/exercise/edit/${exercise.id}`)}
        >
          Edit
        </Button>
        <Button
          size="small"
          onClick={() => history.push(`/exercise/${exercise.id}/chart`)}
        >
          History
        </Button>
        <Button
          size="small"
          onClick={() => history.push(`/exercise/${exercise.id}/log`)}
        >
          Log Workout
        </Button>
        <Button size="small" onClick={() => deleteExercise(exercise.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default compose(connect(null, { deleteExercise }))(ExerciseCard);
