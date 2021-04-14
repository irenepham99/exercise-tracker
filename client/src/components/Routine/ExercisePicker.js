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
import { getExercises } from "../../actions";

class ExercisePicker extends React.Component {
  componentDidMount() {
    this.props.getExercises();
  }

  handleToggle = (val) => {
    const {
      input: { value },
    } = this.props;
    console.log("VALUE", value);
    const newValue = [...value];
    if (newValue.includes(val)) {
      const idx = newValue.indexOf(val);
      newValue.splice(idx, 1);
    } else {
      newValue.push(val);
    }
    console.log(newValue);
    return newValue;
  };

  render() {
    const {
      exercises,
      input: { value, onChange },
    } = this.props;
    return (
      <List>
        {exercises.map(({ id, name }) => {
          const labelId = `checkbox-list-label-${id}`;

          return (
            <ListItem
              key={id}
              role={undefined}
              dense
              button
              onClick={() => onChange(this.handleToggle(id))}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={value.includes(id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${id}, ${name}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  }
}

const mapStateToProps = (state) => {
  return { exercises: Object.values(state.exercises) };
};

export default connect(mapStateToProps, { getExercises })(ExercisePicker);
