import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import history from "../history";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ChooseDialog from "./ChooseDialog";

const theme = createMuiTheme({
  spacing: 4,
});

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontSize: "20px",
    flexGrow: 1,
  },
  drawer: {
    backgroundColor: "#3f51b5",
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openMenu: false, openDialog: false };
  }

  menuItems = [
    {
      text: "Exercise",
      icon: <FitnessCenterIcon style={{ color: "white" }} />,
      path: "/exercise",
    },
    {
      text: "Routines",
      icon: <ListIcon style={{ color: "white" }} />,
      path: "/routine",
    },
  ];

  openChooseDialog = () => {
    console.log("in open choose dialog");
    this.setState({ openDialog: true });
  };

  closeChooseDialog = (path) => {
    this.setState({ openDialog: false });
    history.push(path);
  };

  openMenu = (event) => {
    this.setState({ openMenu: true });
  };

  onClose = () => {
    this.setState({ openMenu: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            onClick={this.openMenu}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={this.state.openMenu}
            onClose={this.onClose}
            classes={{ paperAnchorLeft: classes.drawer }}
          >
            <List style={{ color: "white" }}>
              {this.menuItems.map(({ text, icon, path }, index) => (
                <ListItem button onClick={() => history.push(path)} key={text}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Workout Logger
          </Typography>
          <Tooltip title="New exercise / routine">
            <IconButton onClick={this.openChooseDialog} color="inherit">
              <AddIcon style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <ChooseDialog
          open={this.state.openDialog}
          handleClose={this.closeChooseDialog}
        />
      </AppBar>
    );
  }
}

export default compose(withStyles(styles))(Header);
