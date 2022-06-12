import React from "react";
import { useDrag } from "react-dnd";
import { Card } from "@mui/material";

const CardDrag = ({ data, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
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
        }}
      >
        <img src={data.icon.uri} width={"30px"} height={"30px"} />
      </Card>
      <small>{data.name}</small>
    </div>
  );
};

export default CardDrag;
