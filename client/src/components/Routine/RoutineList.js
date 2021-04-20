import React from "react";
import { connect } from "react-redux";
import { getRoutines, deleteRoutine } from "../../actions/routineActions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import RoutineExerciseTable from "./RoutineExerciseTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import history from "../../history";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  description: {
    flexBasis: "57%",
    flexShrink: 0,
  },
};

//name, description, all exercises
class RoutineList extends React.Component {
  componentDidMount() {
    this.props.getRoutines();
  }

  handleEditRoutine = (event, routineId) => {
    event.stopPropagation();
    history.push(`/routine/edit/${routineId}`);
  };

  handleDeleteRoutine = (event, routineId) => {
    event.stopPropagation();
    this.props.deleteRoutine(routineId);
  };

  render() {
    const { routines, classes } = this.props;
    if (!routines) {
      return <div>Loading...</div>;
    }
    if (routines.length === 0) {
      return <div>There are no routines! Please create one!</div>;
    }
    return (
      <Grid container style={{ padding: "20px" }} justify="center" spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            All Routines
          </Typography>
        </Grid>
        <Grid item xs={11}>
          {routines.map((routine) => {
            return (
              <Accordion style={{ backgroundColor: "#D8D8D8" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" className={classes.heading}>
                    {routine.name}
                  </Typography>
                  <Typography
                    className={classes.description}
                    color="textSecondary"
                  >
                    {routine.description}
                  </Typography>
                  <IconButton
                    onClick={(event) =>
                      this.handleDeleteRoutine(event, routine.id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={(event) =>
                      this.handleEditRoutine(event, routine.id)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <RoutineExerciseTable exercises={routine.exercises} />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    routines: Object.values(state.routines),
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { getRoutines, deleteRoutine })
)(RoutineList);
