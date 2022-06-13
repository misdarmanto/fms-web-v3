import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Divider, Grid, Stack, Tooltip } from "@mui/material";

import CardDrag from "../../components/cardDrag";
import { useContextApi } from "../../lib/hooks/useContexApi";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import GetAppIcon from "@mui/icons-material/GetApp";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import FormNewGroup from "../../components/Form/FormNewGroup";
import FormNewDevice from "../../components/Form/FormNewDevice";

import ListNoResult from "../../components/List/listNoResult";
import ListGroupNested from "../../components/List/ListGroupNested";
import DeviceLayout from "../../components/DeviceLayout";
import FormNewLayout from "../../components/Form/FormNewLayout";

const drawerWidth = 250;

const Home = () => {
  const { devices, groupDevices, layouts } = useContextApi();
  const groupList = groupDevices;
  const dragItems = devices;

  const [openListGroup, setOpenListGroup] = useState(false);
  const [openListGroupNested, setOpenListGroupNested] = useState(null);
  const [openListDevices, setOpenListDevices] = useState(true);
  const [openListLayout, setOpenListLayout] = useState(false);

  const [openPopUpNewGroup, setOpenPopUpNewGroup] = useState(false);
  const [openPopUpNewDevice, setOpenPopUpNewDevice] = useState(false);
  const [openPopUpListGroup, setOpenPopUpListGroup] = useState(false);
  const [openPopUpCreatLayout, setOpenPopUpCreatLayout] = useState(false);

  const [layoutName, setLayoutName] = useState("");
  const [newLayout, setCreatNewLayout] = useState([]);

  const addLayout = () => {
    if (layoutName === "") return;
    setCreatNewLayout([
      ...newLayout,
      { name: layoutName, id: Date.now() },
    ]);
  };

  console.log("hello world")

  useEffect(() => {
    setCreatNewLayout(layouts);
  }, []);

  const handleCreateLayout = () => {
    setOpenPopUpCreatLayout(!openPopUpCreatLayout);
  };

  return (
    <Grid container component="div" onContextMenu={(e) => e.preventDefault()}>
      {/* content */}
      <Grid item xs={9}>
        <Stack direction="row" spacing={4} mb={5}>
          <Tooltip title="add layout" placement="bottom" arrow>
            <IconButton onClick={handleCreateLayout}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="copy" placement="bottom" arrow>
            <IconButton>
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="paste" placement="bottom" arrow>
            <IconButton>
              <ContentPasteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="undo" placement="bottom" arrow>
            <IconButton>
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="redo" placement="bottom" arrow>
            <IconButton>
              <RedoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="delete" placement="bottom" arrow>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="save" placement="bottom" arrow>
            <IconButton>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="import layout" placement="bottom" arrow>
            <IconButton>
              <FileUploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="export layout" placement="bottom" arrow>
            <IconButton>
              <GetAppIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" flexWrap="wrap">
          {newLayout.map((data, index) => (
            <DeviceLayout
              key={index}
              dragItems={dragItems}
              newLayoutData={data}
            />
          ))}
        </Stack>

        {/* form pop up */}
        <FormNewGroup
          openDialog={openPopUpNewGroup}
          setOpenDialog={setOpenPopUpNewGroup}
        />

        <FormNewDevice
          openDialog={openPopUpNewDevice}
          setOpenDialog={setOpenPopUpNewDevice}
        />
        <FormNewLayout
          isOpen={openPopUpCreatLayout}
          value={layoutName}
          onYes={addLayout}
          onClose={handleCreateLayout}
          onChange={(e) => setLayoutName(e.target.value)}
        />
      </Grid>

      {/* right navigations */}
      <Grid item xs={3}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={true}
        >
          <List
            sx={{
              mt: "30%",
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {/* list devices */}
            <ListItemButton
              onClick={() => setOpenListDevices(!openListDevices)}
            >
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Devices" />
              {openListDevices ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListDevices} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Stack direction="row" flexWrap="wrap" pb={5}>
                  {dragItems.length !== 0 ? (
                    dragItems.map((data, index) => (
                      <CardDrag data={data} key={index} />
                    ))
                  ) : (
                    <ListNoResult title={"no devices"} />
                  )}
                </Stack>
              </List>
              <Divider />
            </Collapse>

            {/* list group */}
            <ListItemButton onClick={() => setOpenListGroup(!openListGroup)}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Groups" />
              {openListGroup ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListGroup} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {groupList.length !== 0 ? (
                  groupList.map((data, index) => (
                    //list group nested
                    <ListGroupNested
                      key={index}
                      data={data}
                      isListOpen={index === openListGroupNested}
                      onClick={() => setOpenListGroupNested(index)}
                      onDoubleClick={() => setOpenListGroupNested(null)}
                      isOpenPopUpNestedList={openPopUpListGroup}
                      setIsOpenPopUpNestedList={() =>
                        setOpenPopUpListGroup(!openPopUpListGroup)
                      }
                    />
                  ))
                ) : (
                  <ListNoResult title={"no Group"} />
                )}
              </List>
            </Collapse>

            {/* list Layout */}
            <ListItemButton onClick={() => setOpenListLayout(!openListLayout)}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Layouts" />
              {openListLayout ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListLayout} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 7 }}>
                {layouts.length !== 0 ? (
                  layouts.map((data, index) => (
                    <ListItemButton key={index}>
                      <ListItemText primary={data.name} />
                    </ListItemButton>
                  ))
                ) : (
                  <ListNoResult title="belum ada layout" />
                )}
              </List>
            </Collapse>

            <Divider />
            {/* new devices */}
            <ListItemButton
              onClick={() => setOpenPopUpNewDevice(!openPopUpNewDevice)}
            >
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="New Devices" />
            </ListItemButton>

            {/*  new group */}
            <ListItemButton
              onClick={() => setOpenPopUpNewGroup(!openPopUpNewGroup)}
            >
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="New Group" />
            </ListItemButton>
          </List>
        </Drawer>
      </Grid>
    </Grid>
  );
};

export default Home;
