import { Box, Typography } from "@mui/material";
import ImageUploadZone from "../components/images/ImageUploadZone";
import ImageList from "../components/images/ImageList";


export default function ImagesPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Biliotheque d'images</Typography>
      <Typography>Page de gestion des images</Typography>
      <ImageUploadZone />
      <ImageList />
    </Box>
  );
}
