import { Button } from "@mui/material";
import React from "react";
import { writeDataBase } from "../../lib/function/dataBaseCRUD";

const TestPage = () => {
  const icons = [
    {
      name: "ultrasonic",
      uri: "https://firebasestorage.googleapis.com/v0/b/fms-tuhita.appspot.com/o/icon%2Fultrasonic.png?alt=media&token=adc5870a-bf0a-4c53-99ab-30fef98defad",
    },
    {
      name: "arus",
      uri: "https://firebasestorage.googleapis.com/v0/b/fms-tuhita.appspot.com/o/icon%2Fcurrent-icon-1.jpg?alt=media&token=d1da24e9-9c80-4cf0-a116-22a51da48fb7",
    },
    {
      name: "suhu",
      uri: "https://firebasestorage.googleapis.com/v0/b/fms-tuhita.appspot.com/o/icon%2FCelsius-icon.png?alt=media&token=d12216fd-7b07-4d02-bd45-0112fdd2d9f7",
    },

    {
      name: "fire",
      uri: "https://firebasestorage.googleapis.com/v0/b/fms-tuhita.appspot.com/o/icon%2Fvecteezy_fire-icon_1188470.png?alt=media&token=f908451d-e6b6-43c6-b4bf-fa06f17cd441",
    },
    {
      name: "location",
      uri: "https://firebasestorage.googleapis.com/v0/b/fms-tuhita.appspot.com/o/icon%2F%E2%80%94Pngtree%E2%80%94vector%20location%20icon_5159127.png?alt=media&token=50077afd-8409-4237-bc4d-71f152104b16",
    },
  ];

  const uploadIcon = () => {
    writeDataBase("icons/", icons);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onClick={uploadIcon}>Add Icon</Button>
    </div>
  );
};

export default TestPage;
