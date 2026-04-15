import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { ChangeEvent } from "react";
import { addImage } from "../../store/images/imagesSlice";
import type { RootState } from "../../store/store";

export default function ImageUploadZone() {
  // - State
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images);

  // - Functions
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const currentCount = images.ids.length;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (!reader.result) {
          return;
        }

        dispatch(
          addImage({
            id: crypto.randomUUID(),
            name: file.name,
            mimeType: file.type,
            base64: reader.result as string,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            order: currentCount + index,
          })
        );
      };

      // - base64
      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  // - Render
  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ mb: 1 }}>Importer une ou plusieurs images</Typography>

      <Button variant="contained" component="label">
        Choisir des images
        <input hidden type="file" accept="image/*" multiple onChange={handleChange} />
      </Button>
    </Box>
  );
}