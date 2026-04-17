import {
  Box,
  IconButton,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HomeIcon from "@mui/icons-material/Home";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ExplorerTree from "./ExplorerTree";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFolder } from "../../store/folders/foldersSlice";
import { addFile } from "../../store/files/filesSlice";
import { CreateItemDialog } from "../Dialogs/CreateItemDialog";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState<boolean>(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateFolder = (name: string) => {
    dispatch(
      addFolder({
        id: crypto.randomUUID(),
        name,
        parentId: null,
      })
    );
  };

  const handleCreateFile = (name: string) => {
    dispatch(
      addFile({
        id: crypto.randomUUID(),
        name,
        parentId: null,
        content: "",
        updatedAt: Date.now(),
      })
    );
  };

  return (
    <Box
      sx={{
        width: 280,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          GED Explorateur
        </Typography>
        <Box>
          <IconButton
            size="small"
            onClick={() => setIsFileDialogOpen(true)}
            title="Nouveau fichier"
          >
            <NoteAddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setIsFolderDialogOpen(true)}
            title="Nouveau dossier"
          >
            <CreateNewFolderIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />

      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/blocks")}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LibraryBooksIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Bibliothèque" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
        <ExplorerTree />
      </Box>

      <CreateItemDialog
        open={isFolderDialogOpen}
        onClose={() => setIsFolderDialogOpen(false)}
        onSubmit={handleCreateFolder}
        title="Nouveau dossier"
        label="Nom du dossier"
      />
      <CreateItemDialog
        open={isFileDialogOpen}
        onClose={() => setIsFileDialogOpen(false)}
        onSubmit={handleCreateFile}
        title="Nouveau fichier"
        label="Nom du fichier"
      />
    </Box>
  );
};

export default Sidebar;
