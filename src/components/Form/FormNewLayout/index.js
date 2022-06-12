import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

const FormNewLayout = ({ value, onChange, onClose, isOpen, onYes }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Creat Layout</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="device name"
          label="device name"
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onClose();
            onYes();
          }}
        >
          Creat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormNewLayout;
