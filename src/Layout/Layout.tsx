import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Sidebar from "../Components/Explorer/Sidebar";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", width: "100vw", bgcolor: "background.default" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;


