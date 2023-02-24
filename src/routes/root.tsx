import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Header } from "components/Header";

export const Root = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100vh",
        maxHeight: "100vh",
      }}
    >
      <Header />
      <Box sx={{ flexGrow: 1, padding: "20px", overflow: "auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
