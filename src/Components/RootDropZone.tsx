import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";

export const RootDropZone = () => {
  const { setNodeRef, isOver } = useDroppable({
    id: "root-drop-zone",
    data: { type: "root" },
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        mb: 1,
        px: 1.5,
        py: 1,
        border: "1px dashed",
        borderColor: isOver ? "primary.main" : "divider",
        borderRadius: 1,
        bgcolor: isOver ? "action.hover" : "transparent",
      }}
    >
      <Typography variant="body2">
        Racine — déposer ici pour sortir le fichier/dossier au root
      </Typography>
    </Box>
  );
};