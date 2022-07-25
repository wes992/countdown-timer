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
  const { menuOpen, setSelectedCountdown, setMenuOpen } = useCountdownContext();

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
        sx={{ paddingLeft: menuOpen ? 2 : 1, transition: "all 500ms ease" }}
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
