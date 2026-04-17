import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useExplorer } from "../../hooks/useExplorer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { renameFolder, removeFolder } from "../../store/folders/foldersSlice";
import { renameFile, removeFile, moveFile } from "../../store/files/filesSlice";
import { CreateItemDialog } from "../Dialogs/CreateItemDialog";
import { ConfirmDeleteDialog } from "../Dialogs/ConfirmDeleteDialog";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { DraggableFileLabel } from "../DraggableFileLabel";
import { DroppableFolderLabel } from "../DroppableFolderLabel";

const ExplorerTree = () => {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [targetItem, setTargetItem] = useState<{
    id: string;
    name: string;
    type: "folder" | "file";
  } | null>(null);

  const { folders, files, selectedFileId, handleFileClick } = useExplorer();
  const dispatch = useDispatch();

  const handleCloseDialogs = () => {
    setRenameDialogOpen(false);
    setDeleteDialogOpen(false);
    setTargetItem(null);
  };

  const openRename = (id: string, name: string, type: "folder" | "file") => {
    setTargetItem({ id, name, type });
    setRenameDialogOpen(true);
  };

  const openDelete = (id: string, name: string, type: "folder" | "file") => {
    setTargetItem({ id, name, type });
    setDeleteDialogOpen(true);
  };

  const handleRenameSubmit = (newName: string) => {
    if (!targetItem) return;
    if (targetItem.type === "folder") {
      dispatch(renameFolder({ id: targetItem.id, name: newName }));
    } else {
      dispatch(renameFile({ id: targetItem.id, name: newName }));
    }
    handleCloseDialogs();
  };

  const handleDeleteConfirm = () => {
    if (!targetItem) return;
    if (targetItem.type === "folder") {
      dispatch(removeFolder(targetItem.id));
    } else {
      dispatch(removeFile(targetItem.id));
    }
    handleCloseDialogs();
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      if (
        active.data.current?.type === "file" &&
        over.data.current?.type === "folder"
      ) {
        dispatch(
          moveFile({ id: active.id as string, newParentId: over.id as string })
        );
      }
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <SimpleTreeView
          selectedItems={selectedFileId}
          defaultExpandedItems={folders.map((f) => f.id)}
        >
          {folders.map((folder) => {
            const childrenFiles = files.filter((f) => f.parentId === folder.id);
            return (
              <TreeItem
                key={folder.id}
                itemId={folder.id}
                label={
                  <DroppableFolderLabel
                    id={folder.id}
                    name={folder.name}
                    onRename={() =>
                      openRename(folder.id, folder.name, "folder")
                    }
                    onDelete={() =>
                      openDelete(folder.id, folder.name, "folder")
                    }
                  />
                }
                slots={{
                  endIcon: FolderIcon,
                  expandIcon: FolderIcon,
                  collapseIcon: FolderIcon,
                }}
              >
                {childrenFiles.map((file) => (
                  <TreeItem
                    key={file.id}
                    itemId={file.id}
                    label={
                      <DraggableFileLabel
                        id={file.id}
                        name={file.name}
                        onRename={() => openRename(file.id, file.name, "file")}
                        onDelete={() => openDelete(file.id, file.name, "file")}
                      />
                    }
                    onClick={() => handleFileClick(file.id)}
                    slots={{ endIcon: InsertDriveFileIcon }}
                  />
                ))}
              </TreeItem>
            );
          })}

          {files
            .filter((f) => !f.parentId)
            .map((file) => (
              <TreeItem
                key={file.id}
                itemId={file.id}
                label={
                  <DraggableFileLabel
                    id={file.id}
                    name={file.name}
                    onRename={() => openRename(file.id, file.name, "file")}
                    onDelete={() => openDelete(file.id, file.name, "file")}
                  />
                }
                onClick={() => handleFileClick(file.id)}
                slots={{ endIcon: InsertDriveFileIcon }}
              />
            ))}
        </SimpleTreeView>
      </DndContext>

      {targetItem && (
        <CreateItemDialog
          open={renameDialogOpen}
          onClose={handleCloseDialogs}
          onSubmit={handleRenameSubmit}
          title={`Renommer le ${targetItem.type === "folder" ? "dossier" : "fichier"}`}
          label="Nouveau nom"
          initialValue={targetItem.name}
        />
      )}

      {targetItem && (
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onClose={handleCloseDialogs}
          onConfirm={handleDeleteConfirm}
          itemName={targetItem.name}
        />
      )}
    </>
  );
};


export default ExplorerTree;
