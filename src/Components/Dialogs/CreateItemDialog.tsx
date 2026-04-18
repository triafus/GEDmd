import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface CreateItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  title: string;
  label: string;
  initialValue?: string;
}

export const CreateItemDialog = (props: CreateItemDialogProps) => {
  const {
    open,
    onClose,
    onSubmit,
    title,
    label,
    initialValue = "",
  } = props;
  const [name, setName] = useState<string>(initialValue);


  useEffect(() => {
    if (open) {
      setName(initialValue);
    }
  }, [open, initialValue]);

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={label}
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button type="submit" variant="contained" disabled={!name.trim()}>
            Valider
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
