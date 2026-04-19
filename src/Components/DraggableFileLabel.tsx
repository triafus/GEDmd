import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { ActionMenu } from "./Explorer/ActionMenu";

interface DraggableFileLabelProps {
  id: string;
  name: string;
  onRename: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

export const DraggableFileLabel = (props: DraggableFileLabelProps) => {
  const { id, name, onRename, onDelete, onDownload } = props;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type: "file" },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: 0.8,
        zIndex: 999,
        position: "relative" as const,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pr: 1,
        touchAction: "none",
        width: "100%",
      }}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
          overflow: "hidden",
        }}
      >
        <Typography noWrap>{name}</Typography>
      </Box>
      <ActionMenu onRename={onRename} onDelete={onDelete} onDownload={onDownload} />
    </Box>

  );
};
