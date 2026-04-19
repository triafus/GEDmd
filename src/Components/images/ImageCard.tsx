import { Box, Card, CardContent, Typography, Button, TextField, Dialog } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { LibraryImage } from "../../store/images/imagesSlice";
import { removeImage, updateImage } from "../../store/images/imagesSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


type ImageCardProps = {
  image: LibraryImage;
};

export default function ImageCard({ image }: ImageCardProps) {
  //- State***********************************************************************************************
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false); // isEditing : editing name or not
  const [editedName, setEditedName] = useState(image.name); // editedName : Temporary name while the user is typing.
  const [openPreview, setOpenPreview] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //export image
  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const dataStr = JSON.stringify(image, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${image.name}--${Date.now()}.img.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // - function ***********************************************************************************************
  // - Functions del/rename
  const handleDelete = () => {
    dispatch(removeImage(image.id));
  };

  // status rename at title, click Renommer -> Copy the current name into the input field.
  const handleStartRename = () => {
    setIsEditing(true);
    setEditedName(image.name);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => { //Each time type-> update the state
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

  //open/close preview
  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  // - Render***********************************************************************************************
  return (
    // <> fragment/ wrapper for Card et Dialog
    <>
      
      <Card ref={setNodeRef}

        style={style}
        sx={{ width: 220 }}>
        {/* box card Image
      position: relative overlay on image
      position: absolute + inset: 0 cover all
      */}
        <Box
          sx={{
            position: "relative",
            cursor: "pointer",
          }}

          onClick={handleOpenPreview}
        >
          {/* Image for preview */}
          <Box
            component="img"
            src={image.base64}
            alt={image.name}
            sx={{
              width: "100%",
              height: 160,
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Overlay for preview */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "0.2s",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: 500 }}

            >
              Preview
            </Typography>
          </Box>

        </Box>


        <CardContent

          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 140,
          }}
        >

          {/* if editing, show input/ if not show text */}
          {isEditing ? (
            <TextField
              value={editedName}
              onChange={handleChangeName}
              size="small"
              fullWidth
              autoFocus
              // out click = sabve
              onBlur={handleSaveName}
              //enter = save
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
          {/* box for drag n drop */}
          <Box {...attributes} {...listeners}>☰</Box>
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
          <Button
            variant="outlined"
            size="small"
            // sx={{ flex: 1 }}
            onClick={handleExport}
          >
            ↓ export
          </Button>
        </CardContent>


      </Card >
      {/* open preview image */}
      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="md" >
        <Box sx={{ p: 2 }}>
          <Box
            component="img"
            src={image.base64}
            alt={image.name}
            sx={{
              maxWidth: "100%",
              maxHeight: "70vh",
              display: "block",
            }}
          />

          <Typography sx={{ mt: 2 }}>{image.name}</Typography>
        </Box>
      </Dialog>
    </>

  );
}