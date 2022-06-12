import React, { useState, useRef, useEffect } from "react";
import { writeDataBase, updateDataBase } from "../../lib/function/dataBaseCRUD";
import { stringRegex } from "../../lib/function/stringRegex";
import { useContextApi } from "../../lib/hooks/useContexApi";

const CardDrop = ({ item, size }) => {
  const { currentUserData } = useContextApi();
  const divOverlay = useRef();
  const [offset, setOffset] = useState([100, 100]);
  const [isDown, setIsDown] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = (e) => {
    if (!isActive) return;
    setIsDown(true);
    setOffset([
      divOverlay.current.offsetLeft - e.clientX,
      divOverlay.current.offsetTop - e.clientY,
    ]);
  };

  const handleMouseUp = () => {
    if (!isActive) return;
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isActive) return;

    if (
      e.clientY + offset[1] > size - size / 10 ||
      e.clientX + offset[0] > size - size / 10
    )
      return;
    if (e.clientX + offset[0] < 0 || e.clientY + offset[1] < 0) return;

    if (isDown) {
      divOverlay.current.style.left = e.clientX + offset[0] + "px";
      divOverlay.current.style.top = e.clientY + offset[1] + "px";
    }
  };

  const saveData = async () => {
    const data = {
      ...item,
      position: {
        left: divOverlay.current.style.left,
        top: divOverlay.current.style.top,
      },
    };

    await updateDataBase(
      `users/${stringRegex(currentUserData.email)}/devices/group1/${item.id}`,
      data
    );
  };

  useEffect(() => {
    divOverlay.current.style.left = "100px";
    divOverlay.current.style.top = "100px";
  }, []);
  
  return (
    <div
      ref={divOverlay}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={() => setIsActive(!isActive)}
      style={{
        position: "absolute",
        border: "1px solid",
        borderColor: isActive ? "dodgerblue" : "white",
        minHeight: `${size / 10}px`,
        minWidth: `${size / 10}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        padding: "5px",
      }}
    >
      <small>value : {item.value}</small>
      <img
        src={item?.icon.uri}
        style={{
          height: `${size / 20}px`,
          width: `${size / 20}px`,
        }}
      />
    </div>
  );
};

export default CardDrop;
