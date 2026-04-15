import { Box, Typography } from "@mui/material";

const EditorPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Éditeur de document</Typography>
      <Typography>Sélectionnez un fichier pour commencer l'édition.</Typography>
    </Box>
  );
};

export default EditorPage;
