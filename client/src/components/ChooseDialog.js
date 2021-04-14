import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ChooseDialog = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to create a new Exercise or Routine?
      </DialogTitle>
      <DialogContent>
        <Button onClick={() => handleClose("/exercise/new")} color="primary">
          Exercise
        </Button>
        <Button
          onClick={() => handleClose("/routine/new")}
          color="primary"
          autoFocus
        >
          Routine
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseDialog;
