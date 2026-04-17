import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent } from "react";
import { addImage, addImages } from "../../store/images/imagesSlice";
import type { RootState } from "../../store/store";

export default function ImageUploadZone() {
  // - State
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images);


  // - Functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      //.img.mdlc
      if (file.name.endsWith(".img.mdlc")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const text = reader.result as string;
            const image = JSON.parse(text);
            dispatch(addImage(image));
          } catch (err) {
            console.error("Erreur import image", err);
          }
        };
        reader.readAsText(file);
      }
      // imgs.dmlc
      else if (file.name.endsWith(".imgs.mdlc")) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const text = reader.result as string;
            const images = JSON.parse(text);
            const newImages = images.map((image: any, index: number) => ({
              ...image,
              id: crypto.randomUUID(),
              updatedAt: Date.now(),
              order: Date.now() + index,
            }));
            dispatch(addImages(newImages));
          } catch (err) {
            console.error("Erreur import images", err);
          }
        };
        reader.readAsText(file);
      }

      // normal image
      else if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const newImage = {
            id: crypto.randomUUID(),
            name: file.name,
            mimeType: file.type,
            base64,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            order: Date.now(),
          };
          dispatch(addImage(newImage));
        };

        reader.readAsDataURL(file);
      }
    });
  };



  // - Render
  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 1 }}>Importer une ou plusieurs images</Typography>

      <Button variant="contained" component="label">
        Choisir des images
        <input hidden type="file" accept="image/*,.img.mdlc,.imgs.mdlc" multiple onChange={handleChange} />
      </Button>

    </Box>
  );
}