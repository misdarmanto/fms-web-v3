import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { updateDataBase } from "../../../lib/function/dataBaseCRUD";
import { useContextApi } from "../../../lib/hooks/useContexApi";
import { Stack, Typography } from "@mui/material";
import IconStyles from "../../IconStyles";

export default function FormNewDevice({ openDialog, setOpenDialog }) {
  const { currentUserId, devices, icons } = useContextApi();
  const [deviceName, setDeviceName] = useState("");
  const [macAddress, setMacAddress] = useState("");

  const [indexIcon, setIndexicon] = useState(null);
  const [iconSelect, setIconSelect] = useState({});

  const handleSubmit = () => {
    const oldDevices = devices;
    const path = `users/${currentUserId}/devices`;
    const data = {
      name: deviceName,
      id: Date.now(),
      macAddress: macAddress,
      value : 0,
      position: { top: "", left: "" },
      icon: iconSelect,
    };
    updateDataBase(path, [...oldDevices, data]).then(() => {
      setOpenDialog(!openDialog);
      setDeviceName("");
      setMacAddress("");
    });
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent="space-between"
        >
          <DialogTitle>Add Device</DialogTitle>
        </Stack>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="device name"
            label="device name"
            type="text"
            fullWidth
            variant="standard"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Mac Address"
            label="Mac Address"
            type="text"
            fullWidth
            variant="standard"
            value={macAddress}
            onChange={(e) => setMacAddress(e.target.value)}
          />
          <Typography sx={{ mt: 5, fontWeight: "bold" }}>
            Sensor Icon
          </Typography>

          <Stack direction="row" flexWrap="wrap">
            {icons.map((item, index) => (
              <IconStyles
                icon={item}
                key={index}
                isActive={index === indexIcon}
                onClick={() => {
                  setIndexicon(index);
                  setIconSelect(item);
                }}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
