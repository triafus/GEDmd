import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

interface BlockDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, content: string) => void;
  title: string;
  initialName?: string;
  initialContent?: string;
}

export const BlockDialog = (props: BlockDialogProps) => {
  const {
    open,
    onClose,
    onSubmit,
    title,
    initialName = "",
    initialContent = "",
  } = props;
  const [name, setName] = useState<string>(initialName);
  const [content, setContent] = useState<string>(initialContent);

  useEffect(() => {
    if (open) {
      setName(initialName);
      setContent(initialContent);
    }
  }, [open, initialName, initialContent]);

  const handleClose = () => {
    setName("");
    setContent("");
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onSubmit(name.trim(), content.trim());
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              autoFocus
              label="Nom du bloc"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Contenu Markdown"
              multiline
              rows={8}
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!name.trim() || !content.trim()}
          >
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
