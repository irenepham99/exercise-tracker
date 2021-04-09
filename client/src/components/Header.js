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
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import compose from "lodash/fp/compose";
import { withStyles } from "@material-ui/core/styles";
import ListIcon from "@material-ui/icons/List";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

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
    this.state = { openMenu: false };
  }

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
              {[
                {
                  text: "Exercise",
                  icon: <FitnessCenterIcon style={{ color: "white" }} />,
                },
                {
                  text: "Routines",
                  icon: <ListIcon style={{ color: "white" }} />,
                },
              ].map(({ text, icon }, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Typography variant="h6" className={classes.title}>
            Workout Logger
          </Typography>
          <Tooltip title="Add an Exercise">
            <IconButton color="inherit">
              <Link exact to="/exercise/new">
                <AddIcon style={{ color: "white" }} />
              </Link>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(withStyles(styles))(Header);
