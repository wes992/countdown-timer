import { useEffect, useState } from "react";
import { Collapse, Button, Grid } from "@mui/material";

const Collapsible = ({
  buttonTexts,
  children,
  defaultOpen = false,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(!defaultOpen);

  return (
    <Grid
      container
      item
      justifyContent="center"
      alignItems="center"
      direction={"column"}
      {...props}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          setCollapsed((collapsed) => !collapsed);
        }}
        sx={{ marginBottom: "1rem" }}
      >
        {collapsed ? buttonTexts.open : buttonTexts.closed}
      </Button>
      <Collapse in={!collapsed}>{children}</Collapse>
    </Grid>
  );
};

export { Collapsible };
