import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../../store/store";
import {
  removeBlock,
  addBlock,
  updateBlock,
} from "../../store/blocks/blocksSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { BlockDialog } from "./BlockDialog";
import { ConfirmDeleteDialog } from "../Dialogs/ConfirmDeleteDialog";
import type { Block } from "../../types/Explorer";

export const BlockList = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [targetBlock, setTargetBlock] = useState<Block | null>(null);

  const blocks = useSelector((state: RootState) =>
    Object.values(state.blocks.entities)
  );
  const dispatch = useDispatch();

  const handleOpenCreate = () => {
    setTargetBlock(null);
    setDialogOpen(true);
  };

  const handleOpenEdit = (block: Block) => {
    setTargetBlock(block);
    setDialogOpen(true);
  };

  const handleOpenDelete = (block: Block) => {
    setTargetBlock(block);
    setDeleteDialogOpen(true);
  };

  const closeDialogs = () => {
    setDialogOpen(false);
    setDeleteDialogOpen(false);
    setTargetBlock(null);
  };

  const handleSubmit = (name: string, content: string) => {
    if (targetBlock) {
      dispatch(updateBlock({ id: targetBlock.id, name, content }));
    } else {
      dispatch(addBlock({ id: crypto.randomUUID(), name, content }));
    }
    closeDialogs();
  };

  const confirmDelete = () => {
    if (targetBlock) {
      dispatch(removeBlock(targetBlock.id));
    }
    closeDialogs();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Vos Blocs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Nouveau Bloc
        </Button>
      </Box>

      {blocks.length === 0 ? (
        <Typography color="text.secondary">
          Aucun bloc disponible. Créez-en un pour commencer !
        </Typography>
      ) : (
        <List
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            border: 1,
            borderColor: "divider",
          }}
        >
          {blocks.map((block) => {
            if (!block) return null;
            return (
              <ListItem
                key={block.id}
                divider
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenEdit(block)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleOpenDelete(block)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={block.name}
                  secondary={
                    block.content.substring(0, 50) +
                    (block.content.length > 50 ? "..." : "")
                  }
                />
              </ListItem>
            );
          })}
        </List>
      )}

      <BlockDialog
        open={dialogOpen}
        onClose={closeDialogs}
        onSubmit={handleSubmit}
        title={targetBlock ? "Modifier le bloc" : "Créer un nouveau bloc"}
        initialName={targetBlock?.name}
        initialContent={targetBlock?.content}
      />

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        onClose={closeDialogs}
        onConfirm={confirmDelete}
        itemName={targetBlock?.name || ""}
      />
    </Box>
  );
};
