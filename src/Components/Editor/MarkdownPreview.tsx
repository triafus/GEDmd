import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface MarkdownPreviewProps {
  content: string;
}

export const MarkdownPreview = (props: MarkdownPreviewProps) => {
  const { content } = props;

  return (
    <Box
      sx={{
        height: "100%",
        p: 2,
        overflow: "auto",
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        typography: "body1",
        "& h1": { typography: "h3", mt: 2, mb: 1 },
        "& h2": { typography: "h4", mt: 2, mb: 1 },
        "& h3": { typography: "h5", mt: 2, mb: 1 },
        "& a": { color: "primary.main" },
        "& code": {
          bgcolor: "action.selected",
          p: 0.5,
          borderRadius: 1,
          fontFamily: "monospace",
        },
        "& pre": {
          bgcolor: "action.selected",
          p: 2,
          borderRadius: 1,
          overflowX: "auto",
          "& code": {
            bgcolor: "transparent",
            p: 0,
          }
        },
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </Box>
  );
};
