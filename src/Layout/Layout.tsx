import { Outlet } from "react-router";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Outlet />
    </Box>
  );
};

export default Layout;

