import React from "react";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const ListGroupNested = ({
  data,
  isListOpen,
  onClick,
  onDoubleClick,
  isOpenPopUpNestedList,
  setIsOpenPopUpNestedList,
}) => {
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton>
          <MoreVertIcon />
        </IconButton>

        {/* list group nested */}
        <ListItemButton onClick={onClick} onDoubleClick={onDoubleClick}>
          <ListItemText primary={data.name} />
          {isListOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Stack>
      <Collapse in={isListOpen} timeout="auto" unmountOnExit>
        <List component="div" sx={{ pl: 8 }}>
          {data.devices.length !== 0 &&
            data.devices.map((list, index) => (
              <ListItemText key={index} primary={list.name} />
            ))}
        </List>
      </Collapse>

      <Dialog
        open={isOpenPopUpNestedList}
        onClose={setIsOpenPopUpNestedList}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemText primary={"edit"} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemText primary={"delete"} />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
};

export default ListGroupNested;
