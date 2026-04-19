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
import DownloadIcon from "@mui/icons-material/Download";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState, useRef } from "react";
import { BlockDialog } from "./BlockDialog";
import { ConfirmDeleteDialog } from "../Dialogs/ConfirmDeleteDialog";
import type { Block } from "../../types/Explorer";


export const BlockList = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [targetBlock, setTargetBlock] = useState<Block | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportBlock = (block: Block) => {
    const dataStr = JSON.stringify(block, null, 2);
    const blob = new Blob([dataStr], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${block.name}-${Date.now()}.part.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleExportAllBlocks = () => {
    const validBlocks = blocks.filter((block) => block !== undefined);
    const dataStr = JSON.stringify(validBlocks, null, 2);
    const blob = new Blob([dataStr], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `blocks-${Date.now()}.parts.mdlc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleImportBlocks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    // 1 bloc
    if (/\.part(?: \(\d+\))?\.mdlc$/i.test(file.name)) {
      reader.onload = () => {
        try {
          const block = JSON.parse(reader.result as string);
          const newBlock = {
            ...block,
            id: crypto.randomUUID(),
          };

          dispatch(addBlock(newBlock));
        } catch (err) {
          console.error("Erreur import bloc", err);
        }
      };
      reader.readAsText(file);
    }
    // plusieurs blocs
    else if (/\.parts(?: \(\d+\))?\.mdlc$/i.test(file.name)) {
      reader.onload = () => {
        try {
          const blocks = JSON.parse(reader.result as string);
          blocks.forEach((block: any) => {
            const newBlock = {
              ...block,
              id: crypto.randomUUID(),
            };
            dispatch(addBlock(newBlock));
          });
        } catch (err) {
          console.error("Erreur import blocs", err);
        }
      };
      reader.readAsText(file);
    }
    // reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <input
            type="file"
            accept=".part.mdlc,.parts.mdlc"
            hidden
            ref={fileInputRef}
            onChange={handleImportBlocks}
          />
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            Importer
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Nouveau Bloc
          </Button>
        </Box>
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
                      onClick={() => handleExportBlock(block)}
                      sx={{ mr: 1 }}
                    >
                      <DownloadIcon />
                    </IconButton>
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
      {blocks.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={handleExportAllBlocks}>
            Exporter tous les blocs
          </Button>
        </Box>
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
