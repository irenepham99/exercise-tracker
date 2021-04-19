import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { closeNotification } from "../actions";
import MuiAlert from "@material-ui/lab/Alert";

class Notification extends React.Component {
  handleClose = () => {
    this.props.closeNotification();
  };

  render() {
    return (
      <div>
        <div>{this.props.open}</div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.props.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={this.props.severity}
          >
            {this.props.message}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.notification };
};

export default connect(mapStateToProps, {
  closeNotification,
})(Notification);
