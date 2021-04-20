import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { getExercises } from "../../actions/exerciseActions";
import Typography from "@material-ui/core/Typography";

class ExercisePicker extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }

  handleToggle = (val) => {
    const {
      input: { value },
    } = this.props;
    const newValue = [...value];
    if (newValue.includes(val)) {
      const idx = newValue.indexOf(val);
      newValue.splice(idx, 1);
    } else {
      newValue.push(val);
    }
    return newValue;
  };

  //body part, compound vs isolation
  render() {
    const {
      exercises,
      meta: { touched, error },
      input: { value, onChange },
    } = this.props;
    return (
      <div>
        <Typography align="center" variant="h5">
          Choose Exercises in Routine
        </Typography>
        <List>
          {exercises.map(({ id, name, compound, body_group }, index) => {
            const labelId = `checkbox-list-label-${id}`;
            return (
              <ListItem
                style={{
                  backgroundColor: index % 2 == 0 ? "#E0E0E0" : "white",
                }}
                key={id}
                role={undefined}
                dense
                button
                onClick={() => onChange(this.handleToggle(id))}
              >
                <ListItemIcon>
                  <Checkbox
                    color="primary"
                    edge="start"
                    checked={value.includes(id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  {`(${compound ? "Compound" : "Isolation"}, ${body_group})`}
                </Typography>
              </ListItem>
            );
          })}
        </List>
        <Typography align="center" style={{ color: "red" }} variant="body">
          {error}
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { exercises: Object.values(state.exercises) };
};

export default connect(mapStateToProps, { getExercises })(ExercisePicker);
