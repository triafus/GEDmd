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
import { DndContext, type DragEndEvent, useDroppable } from "@dnd-kit/core";
import { DraggableFileLabel } from "../DraggableFileLabel";
import { DroppableFolderLabel } from "../DroppableFolderLabel";
import { exportFileAsMarkdown } from "../../utils/fileTransfer";
// import { Box, Typography } from "@mui/material";
import { RootDropZone } from "../RootDropZone"; //dnd fichier et dossier
import { moveFolder } from "../../store/folders/foldersSlice";

const ExplorerTree = () => {
  const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [targetItem, setTargetItem] = useState<{
    id: string;
    name: string;
    type: "folder" | "file";
  } | null>(null);

  const { folders, files, selectedFileId, handleFileClick } = useExplorer();
  const dispatch = useDispatch();

  const handleDownload = (name: string, content: string) => {
    exportFileAsMarkdown(name, content);
  };
  //Whenever the list of folders changes, the tree will open all folders.
  // useEffect(() => {
  //   setExpandedItems(folders.map((folder) => folder.id));
  // }, [folders]);

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

  //eviter deplacer parent folders à child folder
  const isDescendantFolder = (
    sourceFolderId: string,
    targetFolderId: string
  ): boolean => {
    let currentParentId: string | null = targetFolderId;
    while (currentParentId) {
      if (currentParentId === sourceFolderId) {
        return true;
      }
      const currentFolder = folders.find((folder) => folder.id === currentParentId);
      currentParentId = currentFolder ? currentFolder.parentId : null;
    }
    return false;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;
    //dnd file
    if (activeType === "file") {
      if (overType === "folder") {
        dispatch(
          moveFile({
            id: String(active.id),
            newParentId: String(over.id),
          })
        );
        return;
      }
      if (overType === "root") {
        dispatch(
          moveFile({
            id: String(active.id),
            newParentId: null,
          })
        );
      }
    }
    // dnd folder
    if (activeType === "folder") {
      const activeFolderId = String(active.id);
      // éviter de déposer un dossier sur lui-même
      if (active.id === over.id) return;
      if (overType === "folder") {
        const targetFolderId = String(over.id);
        // éviter de déplacer un dossier dans un de ses sous-dossiers
        if (isDescendantFolder(activeFolderId, targetFolderId)) {
          return;
        }
        dispatch(
          moveFolder({
            id: activeFolderId,
            newParentId: targetFolderId,
          })
        );
        return;
      }
      if (overType === "root") {
        dispatch(
          moveFolder({
            id: activeFolderId,
            newParentId: null,
          })
        );
      }
    }
  };

  // detect folder after dnd file
  const renderFolders = (parentId: string | null = null) => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => {
        const childFolders = renderFolders(folder.id);
        const childFiles = files
          .filter((file) => file.parentId === folder.id)
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
                  onDownload={() => handleDownload(file.name, file.content)}
                />
              }
              onClick={() => handleFileClick(file.id)}
              slots={{ endIcon: InsertDriveFileIcon }}
            />
          ));

        return (
          <TreeItem
            key={folder.id}
            itemId={folder.id}
            label={
              <DroppableFolderLabel
                id={folder.id}
                name={folder.name}
                onRename={() => openRename(folder.id, folder.name, "folder")}
                onDelete={() => openDelete(folder.id, folder.name, "folder")}
              />
            }
            slots={{
              endIcon: FolderIcon,
              expandIcon: FolderIcon,
              collapseIcon: FolderIcon,
            }}
          >
            {childFolders}
            {childFiles}
          </TreeItem>
        );
      });
  };

  return (

    <>
      <DndContext onDragEnd={handleDragEnd}>
        <RootDropZone />

        <SimpleTreeView
          selectedItems={selectedFileId}
          defaultExpandedItems={folders.map((folder) => folder.id)}
        // onExpandedItemsChange={(_, itemIds) => setExpandedItems(itemIds)}
        >
          {renderFolders(null)}
          {files
            .filter((f) => f.parentId === null)
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
                    onDownload={() => handleDownload(file.name, file.content)}
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
