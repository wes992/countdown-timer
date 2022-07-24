import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useCountdownContext } from "../../Context/countdownContext";
import { formatDate } from "../../utils/utils";

const CountdownListItem = (countdown) => {
  const { id, title, endDate } = countdown;
  const { setSelectedCountdown, setMenuOpen } = useCountdownContext();

  const handleSelectCountdown = () => {
    setSelectedCountdown(countdown);
    setMenuOpen(false);
  };
  return (
    <>
      <ListItem
        key={id}
        alignItems="flex-start"
        onClick={handleSelectCountdown}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {formatDate(endDate)}
            </Typography>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export { CountdownListItem };
