import { Box, Typography } from "@mui/material";
import { BlockList } from "../Components/Blocks/BlockList";

const BlocksPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Gestion de la Bibliothèque
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <BlockList />
      </Box>
    </Box>
  );
};

export default BlocksPage;
