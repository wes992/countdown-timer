import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Collapsible } from "./Collapsible";
import { handleValidation } from "../utils/validation";
import { v4 } from "uuid";
import { addDataToCollection } from "../firebase/firebase";

const AddNew = ({ addCountdown }) => {
  const defaultVal = { title: "", endDate: new Date() };
  const [value, setValue] = useState(defaultVal);
  const [errors, setErrors] = useState({});

  const handleChange = (key, newValue) => {
    setValue((val) => ({ ...val, [key]: newValue }));
  };

  const handleAddCountdown = async () => {
    const { hasErrors, errors } = handleValidation(value);
    setErrors(errors);
    if (!hasErrors) {
      const addedItem = { ...value, id: v4(), createdAt: new Date() };
      const result = await addDataToCollection("countdowns", addedItem);
      if (result.success) {
        addCountdown(addedItem);
      }
      console.log("result", result);
      setValue(defaultVal);
    }
  };

  const { title, endDate } = value;
  return (
    <Collapsible buttonTexts={{ open: "Add New Timer", closed: "Close" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
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
            error={!!errors.title}
            id="timer-name"
            label="Countdown name"
            helperText={
              errors.title ? errors.title : "What are we counting to?"
            }
            variant="filled"
            value={title}
            onChange={(val) => handleChange("title", val.target.value)}
            required
          />
        </div>
        <div>
          <DateTimePicker
            error={!!errors.endDate}
            display="block"
            label="Date/Time picker"
            value={endDate}
            onChange={(val) => handleChange("endDate", val.toDate())}
            renderInput={(params) => (
              <TextField
                helperText={
                  errors.endDate ? errors.endDate : "When is the big day?"
                }
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
