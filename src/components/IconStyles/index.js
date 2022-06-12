import React from "react";
import { Card } from "@mui/material";

const IconStyles = ({ icon, onClick, isActive }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <Card
        sx={{
          width: "50px",
          height: "50px",
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: isActive ? "1px solid dodgerblue" : "none",
        }}
      >
        <img src={icon.uri} width={"30px"} height={"30px"} />
      </Card>
      <small>{icon.name}</small>
    </div>
  );
};

export default IconStyles;
