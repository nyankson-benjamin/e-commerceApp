import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { dashBoardMenu } from "../../Constants/dashboardMenu";
import Dashboard from "./Components/Dashboard";
export default function Menu() {
  const menuStyle = {
    textAlign: "left",
    fontSize: "16px",
    color: "white",
    textTransform: "Capitalize",
    "&:hover": {
      bgcolor: "#ffc801",
      //   letterSpacing: 3,
      ml: 1,
    },
    "&:focus": {
      bgcolor: "red",
      ml: 1,
      width: "100%",
    },
  };
  const [component, setComponent] = useState(<Dashboard />);
  const clickStyle = { bgcolor: "white" };
  const [style, setStyle] = useState(menuStyle);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Box sx={{ height: "100vh", width: "15%", bgcolor: "#364153", m: 0 }}>
        {dashBoardMenu &&
          dashBoardMenu.map((item, index) => (
            <Box sx={{ p: 3 }} key={index}>
              <Button
                variant="h5"
                sx={style}
                startIcon={item.icon}
                onClick={() => {
                  setComponent(item.component);
                }}
              >
                {item.title}
              </Button>
            </Box>
          ))}
      </Box>

      <Box
        sx={{
          width: "83%",
          height: "100vh",
          //   bgcolor: "#364153"
        }}
      >
        {component}
      </Box>
    </Box>
  );
}
