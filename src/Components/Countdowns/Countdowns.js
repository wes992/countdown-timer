import { List } from "@mui/material";
import React from "react";
import { CountdownListItem } from "./CountdownListItem";

const Countdowns = ({ countdowns = [] }) => {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "transparent",
      }}
    >
      {countdowns.map((countdown) => (
        <CountdownListItem {...countdown} />
      ))}
    </List>
  );
};

export { Countdowns };
