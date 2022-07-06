import { TextField, Box, Collapse, Button } from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Collapsible } from "./Collapsible";

const AddNew = ({ addCountdown }) => {
  const [value, setValue] = useState({ title: "", date: new Date() });

  const handleChange = (key, newValue) => {
    setValue((val) => ({ ...val, [key]: newValue }));
  };

  const handleAddCountdown = () => {
    addCountdown(value);
    // setCollapsed(true);
  };

  const { title, date } = value;
  return (
    <Collapsible buttonTexts={{ open: "Add New Timer", closed: "Close" }}>
      {/* <Collapse in={!collapsed}> */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
        border={"1px solid gray"}
        borderRadius={2}
        width="fit-content"
        padding={2}
        mx="auto"
        my={2}
      >
        <div>
          <TextField
            id="timer-name"
            label="Countdown name"
            helperText="What are we counting to?"
            variant="filled"
            value={title}
            onChange={(val) => handleChange("title", val.target.value)}
          />
        </div>
        <div>
          <DateTimePicker
            display="block"
            label="Date/Time picker"
            value={date}
            onChange={(val) => handleChange("date", val)}
            renderInput={(params) => (
              <TextField
                helperText="When is the big day?"
                variant="filled"
                {...params}
              />
            )}
          />
        </div>
        <Button
          variant="contained"
          color={"primary"}
          onClick={handleAddCountdown}
        >
          Save
        </Button>
      </Box>
    </Collapsible>
  );
};

export { AddNew };
