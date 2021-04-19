import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { compose } from "redux";
import { deleteRoutine } from "../../actions/routineActions";
import history from "../../history";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px",
    margin: "5px",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
  },
});

const RoutineCard = (props) => {
  const classes = useStyles();
  const { routine, deleteRoutine } = props;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {routine.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {routine.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteRoutine(routine.id)}>
          Delete
        </Button>
        <Button
          size="small"
          onClick={() => history.push(`/routine/edit/${routine.id}`)}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default compose(connect(null, { deleteRoutine }))(RoutineCard);
