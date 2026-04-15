import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import ImageCard from "./ImageCard";

export default function ImageList() {
  // -State
  const imagesState = useSelector((state: RootState) => state.images);

  const images = imagesState.ids
    .map((id) => imagesState.entities[id])
    .filter((image) => image !== undefined)
    .sort((a, b) => a.order - b.order);

  // -Render
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </Box>
  );
}