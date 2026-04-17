import { TextField, Box } from "@mui/material";

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor = (props: MarkdownEditorProps) => {
  const { content, onChange } = props;
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
