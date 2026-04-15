import { useDroppable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { ActionMenu } from "./Explorer/ActionMenu";

interface DroppableFolderLabelProps {
  id: string;
  name: string;
  onRename: () => void;
  onDelete: () => void;
}

export const DroppableFolderLabel = ({
  id,
  name,
  onRename,
  onDelete,
}: DroppableFolderLabelProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { type: "folder" },
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pr: 1,
        bgcolor: isOver ? "action.hover" : "transparent",
        width: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography noWrap>{name}</Typography>
      </Box>
      <ActionMenu onRename={onRename} onDelete={onDelete} />
    </Box>

  );
};
