import React, { useState } from "react";
import {
  Grid,
  Card,
  Container,
  List,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import { useContextApi } from "../../lib/hooks/useContexApi";
import { updateDataBase } from "../../lib/function/dataBaseCRUD";
import { stringRegex } from "../../lib/function/stringRegex";

const MyProfile = () => {
  const { currentUserData } = useContextApi();
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleUpdate = () => {
    updateDataBase(
      "users/" + stringRegex(currentUserData.email) + "/userName",
      newUserName
    );
  };

  return (
    <Container maxWidth="sm" className="auth-layout">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 style={{ textAlign: "center" }}>My Profile</h1>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={currentUserData?.userName} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={currentUserData?.email} />
              </ListItemButton>
              <ListItemButton onClick={handleDialog}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Edite  Profile" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialog}>
        <DialogTitle>Edite Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="new user name"
            type="email"
            fullWidth
            variant="standard"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDialog();
              handleUpdate();
              setNewUserName("")
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyProfile;
