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
        // transitionDuration: "600ms",
      }}
      timeout={600}
      easing={"ease-in"}
    >
      <Grid
        container
        alignItems="flex-start"
        height={"100%"}
        backgroundColor={
          menuOpen ? "rgba(235,235,235,1)" : "rgba(235,235,235,.5)"
        }
        pt={2}
        borderRadius={"0 7px 7px 0"}
      >
        {/* {menuOpen ? ( */}
        <Grid container height={"100%"} direction={"column"}>
          <Grid item xs={11} sx={{ overflowY: "scroll" }}>
            <AddNew addCountdown={handleAdd} />

            <Countdowns countdowns={countdowns} />
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
        {/* ) : (
          <Grid justifyContent="center" alignItems="center">
            <Button
              type="text"
              color="primary"
              onClick={() => setMenuOpen(true)}
              // sx={{ minWidth: "fit-content" }}
            >
              |||
            </Button>
          </Grid>
        )} */}
      </Grid>
    </Collapse>
  );
};

export { Menu };
