import { Box, Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { LibraryImage } from "../../store/images/imagesSlice";
import { removeImage, updateImage } from "../../store/images/imagesSlice";

type ImageCardProps = {
  image: LibraryImage;
};

export default function ImageCard({ image }: ImageCardProps) {
  //- State
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(image.name);

  // - Functions del/rename
  const handleDelete = () => {
    dispatch(removeImage(image.id));
  };

  const handleStartRename = () => {
    setIsEditing(true);
    setEditedName(image.name);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleSaveName = () => {
    if (!editedName.trim()) {
      setIsEditing(false);
      return;
    }

    dispatch(
      updateImage({
        id: image.id,
        changes: {
          name: editedName,
          updatedAt: Date.now(),
        },
      })
    );

    setIsEditing(false);
  };
  // - Render
  return (
    <Card sx={{ width: 220 }}>
      <Box
        component="img"
        src={image.base64}
        alt={image.name}
        sx={{
          width: "100%",
          height: 160,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: 140,
        }}
      >

        {isEditing ? (
          <TextField
            value={editedName}
            onChange={handleChangeName}
            size="small"
            fullWidth
            autoFocus
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveName();
              }
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{ cursor: "pointer" }}
          >
            {image.name}
          </Typography>
        )}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 1,
          }}
        >
          {/* 2 buttons sur 1 ligne */}
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ flex: 1 }}
            onClick={handleDelete}
          >
            Supprimer
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{ flex: 1 }}
            onClick={handleStartRename}
          >
            Renommer
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}