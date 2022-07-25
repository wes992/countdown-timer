import { Button, Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AddNew } from "../AddNew";
import { Grid } from "@mui/material";
import { useFirebase } from "../../firebase";
import { Countdowns } from "../Countdowns";
import { useCountdownContext } from "../../Context/countdownContext";

const Menu = ({}) => {
  const { menuOpen, setMenuOpen, countdowns, setCountdowns } =
    useCountdownContext();
  const { getDataInCollection } = useFirebase();
  const handleAdd = async (addedItem) => {
    setCountdowns((prev) => [...prev, addedItem]);
  };

  useEffect(() => {
    getCountdowns();
  }, []);

  const getCountdowns = async () => {
    try {
      const result = await getDataInCollection("countdowns");
      const results = result.data.map((r) => ({
        ...r,
        endDate: r.endDate.toDate(),
        createdAt: r.createdAt.toDate(),
      }));
      setCountdowns(results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Collapse
      orientation="horizontal"
      in={menuOpen}
      collapsedSize={60}
      sx={{
        height: "100vh",
        padding: 0,
        margin: 0,
        position: "absolute",
        zIndex: "5",
      }}
      timeout={500}
      easing={"ease"}
    >
      <Grid
        container
        alignItems="flex-start"
        height={"100%"}
        flexWrap="nowrap"
        backgroundColor={
          // menuOpen ? "rgba(235,235,235,1)" : "rgba(235,235,235,.5)"
          "rgba(235,235,235,1)"
        }
        pt={2}
        borderRadius={"0 7px 7px 0"}
      >
        <Grid container height={"100%"} direction={"column"}>
          <Grid item xs={11} overflow="scroll">
            <AddNew addCountdown={handleAdd} />
            <Countdowns countdowns={countdowns} pl={menuOpen ? "1rem" : 0} />
          </Grid>
          <Grid justifyContent="center" item xs={1}>
            <Button
              type="text"
              color="primary"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              X
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export { Menu };
