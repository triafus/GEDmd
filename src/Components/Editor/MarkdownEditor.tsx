import { TextField, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { content, onChange } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const blocks = useSelector((state: RootState) => Object.values(state.blocks.entities));

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleInsertBlock = (blockContent: string) => {
    const newContent = content ? `${content}\n\n${blockContent}` : blockContent;
    onChange(newContent);
    handleCloseMenu();
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<LibraryAddIcon />}
          onClick={handleOpenMenu}
        >
          Insérer un bloc
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {blocks.length === 0 ? (
            <MenuItem disabled>Aucun bloc disponible</MenuItem>
          ) : (
            blocks.map((block) => {
              if (!block) return null;
              return (
                <MenuItem key={block.id} onClick={() => handleInsertBlock(block.content)}>
                  <Typography noWrap sx={{ maxWidth: 200 }}>
                    {block.name}
                  </Typography>
                </MenuItem>
              );
            })
          )}
        </Menu>
      </Box>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flexGrow: 1,
          "& .MuiInputBase-root": {
            height: "100%",
            alignItems: "flex-start",
            overflow: "auto",
          },
        }}
      />
    </Box>
  );
};

