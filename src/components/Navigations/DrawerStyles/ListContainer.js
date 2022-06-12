import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const ListIconContainer = ({
  children,
  onClickButton,
  isOpen,
  title,
  isActive,
}) => {
  return (
    <ListItemButton
      onClick={onClickButton}
      sx={{
        minHeight: 60,
        justifyContent: isOpen ? "initial" : "center",
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 3 : "auto",
          backgroundColor: isActive ? "dodgerblue" : "#E4F2FF",
          borderRadius: 30,
          p: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </ListItemIcon>
      <ListItemText
        primary={title}
        sx={{
          opacity: isOpen ? 1 : 0,
          color: isActive ? "dodgerblue" : "black",
        }}
      />
    </ListItemButton>
  );
};

export default ListIconContainer;
