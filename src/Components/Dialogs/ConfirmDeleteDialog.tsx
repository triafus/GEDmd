import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export const ConfirmDeleteDialog = (props: ConfirmDeleteDialogProps) => {
  const { open, onClose, onConfirm, itemName } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography>Voulez-vous vraiment supprimer "{itemName}" ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
