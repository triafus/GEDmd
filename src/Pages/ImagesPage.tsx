import { Box, Typography } from "@mui/material";
import ImageUploadZone from "../components/images/ImageUploadZone";
import ImageList from "../components/images/ImageList";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Button from "@mui/material/Button";


export default function ImagesPage() {
  const imagesState = useSelector((state: RootState) => state.images);
  const images = imagesState.ids
    .map((id) => imagesState.entities[id])
    .filter((image) => image !== undefined)
    .sort((a, b) => a.order - b.order);
  //export
  const handleExportAllImages = () => {
    const dataStr = JSON.stringify(images, null, 2);

    const blob = new Blob([dataStr], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "images.imgs.mdlc";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Box sx={{ p: 3, overflow: "auto", flexWrap: "wrap", }}>
        <Typography variant="h4">Biliotheque d'images</Typography>
        <Typography>Page de gestion des images</Typography>
        <ImageUploadZone />
        <ImageList />
        <Button
          sx={{ mt: 2 }}
          variant="outlined"

          onClick={handleExportAllImages}
        >
          Exporter toutes les images
        </Button>
      </Box>

    </>

  );
}
