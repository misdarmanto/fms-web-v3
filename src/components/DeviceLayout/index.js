import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";

import { useDrop } from "react-dnd";
import CardDrop from "../cardDrop";

import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { writeDataBase } from "../../lib/function/dataBaseCRUD";
import { useContextApi } from "../../lib/hooks/useContexApi";

const DeviceLayout = ({ dragItems, newLayoutData }) => {
  const { currentUserId, layouts, devices } = useContextApi();
  const [zoomSquare, setZoomSquare] = useState(350);
  const [dropItems, setDropItems] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "card",
    drop: (item) => addItemToDropList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToDropList = (id) => {
    const result = dragItems.filter((card) => id === card.id);
    setDropItems((item) => [...item, result[0]]);
  };

  const zoomInSquare = () => {
    if (zoomSquare > 600) return;
    setZoomSquare(zoomSquare + 10);
  };
  const zoomOutSquare = () => {
    if (zoomSquare < 300) return;
    setZoomSquare(zoomSquare - 10);
  };

  const extracData = () => {
    return dropItems.map((value) => {
      const result = {
        id: value.id,
        name: value.name,
        position: value.position,
      };
      return result;
    });
  };

  const saveLayoutToDataBase = () => {
    const path = `users/${currentUserId}/layouts`;
    writeDataBase(path, [
      ...layouts,
      { name: newLayoutData.name, devices: extracData() },
    ]);
  };

  useEffect(() => {
    if (dropItems.length === 0) return;
    saveLayoutToDataBase();
  }, []);

  useEffect(() => {
    const resultFilter = layouts.filter((value) => {
      return value.name === newLayoutData.name;
    })[0];
    if (!resultFilter) return;

    const result = [];
    resultFilter.devices.forEach((value) => {
      const findDevice = devices.filter((device) => device.id === value.id)[0];
      result.push(findDevice);
    });
    setDropItems(result);
  }, []);

  return (
    <>
      <div
        onDoubleClick={() => setIsActive(!isActive)}
        ref={dropRef}
        style={{
          width: `${zoomSquare}px`,
          height: `${zoomSquare}px`,
          position: "relative",
          border: "2px solid gray",
          borderColor: isActive ? "dodgerblue" : "gray",
          borderRadius: "5px",
          margin: "10px",
        }}
      >
        <small
          style={{
            fontWeight: "bold",
            color: "gray",
            paddingLeft: "5px",
            position: "absolute",
            left: 0,
          }}
          onSelect={() => false}
          onMouseDown={() => false}
        >
          {newLayoutData.name}
        </small>
        <Stack direction="row" position="absolute" right={0}>
          <IconButton onMouseDown={zoomInSquare}>
            <ZoomInIcon />
          </IconButton>
          <IconButton onClick={zoomOutSquare}>
            <ZoomOutIcon />
          </IconButton>
        </Stack>
        {dropItems.map((item, index) => (
          <CardDrop key={index} item={item} size={zoomSquare} />
        ))}
      </div>
    </>
  );
};

export default DeviceLayout;
