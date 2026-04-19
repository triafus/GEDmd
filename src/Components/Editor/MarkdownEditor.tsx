import { TextField, Box } from "@mui/material";
import { useRef } from "react";

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
  onCursorChange?: (start: number, end: number) => void;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { content, onChange, onCursorChange } = props;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCursor = () => {
    if (!textareaRef.current || !onCursorChange) {
      return;
    }
    onCursorChange(
      textareaRef.current.selectionStart ?? 0,
      textareaRef.current.selectionEnd ?? 0
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        value={content}
        inputRef={textareaRef}
        onChange={(e) => {
          onChange(e.target.value);
          handleCursor();
        }}
        onClick={() => handleCursor()}
        onKeyUp={() => handleCursor()}
        onSelect={() => handleCursor()}
        sx={{
          flexGrow: 1,
          "& .MuiInputBase-root": {
            height: "100%",
            alignItems: "flex-start",
            overflow: "auto",
          },
          "& textarea": {
            height: "100% !important",
            overflow: "auto !important",
          },
        }}
      />
    </Box>
  );
};