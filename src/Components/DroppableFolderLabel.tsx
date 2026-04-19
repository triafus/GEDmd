import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
import { ActionMenu } from "./Explorer/ActionMenu";


interface DroppableFolderLabelProps {
  id: string;
  name: string;
  onRename: () => void;
  onDelete: () => void;
}

export const DroppableFolderLabel = (props: DroppableFolderLabelProps) => {
  const { id, name, onRename, onDelete } = props;

  // dnd folder
  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
    data: { type: "folder" },
  });
  const { attributes, listeners, setNodeRef: setDragRef, transform } = useDraggable({
    id,
    data: { type: "folder" },
  });
  const setNodeRef = (node: HTMLElement | null) => {
    setDropRef(node);
    setDragRef(node);
  };
  //style drag
  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      opacity: 0.8,
      zIndex: 999,
      position: "relative" as const,
      pointerEvents: "none" as const,
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
        bgcolor: isOver ? "action.hover" : "transparent",
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
      <ActionMenu onRename={onRename} onDelete={onDelete} />
    </Box>

  );
};
