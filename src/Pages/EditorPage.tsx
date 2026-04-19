import { Box, Typography, Grid, Button, Menu, MenuItem } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { type RootState } from "../store/store";
import { updateFileContent } from "../store/files/filesSlice";
import { addImage } from "../store/images/imagesSlice";
import { MarkdownEditor } from "../Components/Editor/MarkdownEditor";
import { MarkdownPreview } from "../Components/Editor/MarkdownPreview";
import DownloadIcon from "@mui/icons-material/Download";

const EditorPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const dispatch = useDispatch();

  const blocks = useSelector((state: RootState) =>
    Object.values(state.blocks.entities)
  );
  const [cursorStart, setCursorStart] = useState(0);
  const [cursorEnd, setCursorEnd] = useState(0);
  const file = useSelector((state: RootState) =>
    fileId ? state.files.entities[fileId] : undefined
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenBlockMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseBlockMenu = () => {
    setAnchorEl(null);
  };
  const handleInsertBlock = (blockContent: string) => {
    if (!fileId || !file) {
      return;
    }
    const before = file.content.slice(0, cursorStart);
    const after = file.content.slice(cursorEnd);
    const newContent = before + blockContent + after;
    dispatch(
      updateFileContent({
        id: fileId,
        content: newContent,
      })
    );
    handleCloseBlockMenu();
  };

  const handleContentChange = (content: string) => {
    if (fileId) {
      dispatch(updateFileContent({ id: fileId, content }));
    }
  };

  const handleInsertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,.img.mdlc";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const selectedFile = target.files?.[0];

      if (!selectedFile || !fileId || !file) {
        return;
      }
      const insertMarkdownAtCursor = (markdown: string) => {
        const before = file.content.slice(0, cursorStart);
        const after = file.content.slice(cursorEnd);
        const newContent = before + markdown + after;
        dispatch(
          updateFileContent({
            id: fileId,
            content: newContent,
          })
        );
      };
      // file .img.mdlc
      if (/\.img(?: \(\d+\))?\.mdlc$/i.test(selectedFile.name)) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const importedImage = JSON.parse(reader.result as string);
            const imageToSave = {
              ...importedImage,
              id: crypto.randomUUID(),
              updatedAt: Date.now(),
              order: Date.now(),
            };

            // add bibliothèque
            dispatch(addImage(imageToSave));
            // add markdown
            const markdown = `![${imageToSave.name}](${imageToSave.base64})`;
            insertMarkdownAtCursor(markdown);
          } catch (err) {
            console.error("Erreur import image mdlc", err);
          }
        };

        reader.readAsText(selectedFile);
      }

      // normal format
      else if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          const newImage = {
            id: crypto.randomUUID(),
            name: selectedFile.name,
            mimeType: selectedFile.type,
            base64,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            order: Date.now(),
          };

          // add bibliothèque
          dispatch(addImage(newImage));
          // add markdown
          const markdown = `![${newImage.name}](${newImage.base64})`;
          insertMarkdownAtCursor(markdown);
        };
        reader.readAsDataURL(selectedFile);
      }
    };

    input.click();
  };

  const handleExportMarkdown = () => {
    if (!file) return;
    const blob = new Blob([file.content], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.name}-${Date.now()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!file) {
    return (
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          Fichier introuvable ou non sélectionné.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {file.name}
      </Typography>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ImageIcon />}
          onClick={handleInsertImage}
        >
          Insérer une image
        </Button>

        <Button
          variant="outlined"
          startIcon={<LibraryAddIcon />}
          onClick={handleOpenBlockMenu}
        >
          Insérer un bloc
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleExportMarkdown}
        >
          Exporter
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseBlockMenu}
        >
          {blocks.length === 0 ? (
            <MenuItem disabled>Aucun bloc disponible</MenuItem>
          ) : (
            blocks.map((block) => {
              if (!block) return null;

              return (
                <MenuItem
                  key={block.id}
                  onClick={() => handleInsertBlock(block.content)}
                >
                  {block.name}
                </MenuItem>
              );
            })
          )}
        </Menu>
      </Box>

      <Grid container spacing={2} sx={{ height: "100%", minHeight: 0 }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%", overflow: "auto" }}>
          <MarkdownEditor
            content={file.content}
            onChange={handleContentChange}
            onCursorChange={(start, end) => {
              setCursorStart(start);
              setCursorEnd(end);
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%", minHeight: 0 }}>
          <MarkdownPreview content={file.content} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorPage;