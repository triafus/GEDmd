import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface ActionMenuProps {
  onRename: () => void;
  onDelete: () => void;
}

export const ActionMenu = ({ onRename, onDelete }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (onClick: () => void) => {
    onClick();
    handleClose();
  };

  return (
    <>
      <IconButton 
        size="small" 
        onClick={handleOpen} 
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleClick(onRename)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Renommer
        </MenuItem>
        <MenuItem onClick={() => handleClick(onDelete)}>
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: "error.main" }} />
          Supprimer
        </MenuItem>
      </Menu>
    </>
  );
};
