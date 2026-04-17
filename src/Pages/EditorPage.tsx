import { Box, Typography, Grid } from "@mui/material";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { updateFileContent } from "../store/files/filesSlice";
import { MarkdownEditor } from "../Components/Editor/MarkdownEditor";
import { MarkdownPreview } from "../Components/Editor/MarkdownPreview";

const EditorPage = () => {
  const { fileId } = useParams<{ fileId: string }>();
  const dispatch = useDispatch();

  const file = useSelector((state: RootState) =>
    fileId ? state.files.entities[fileId] : undefined
  );

  const handleContentChange = (content: string) => {
    if (fileId) {
      dispatch(updateFileContent({ id: fileId, content }));
    }
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
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }}>
          <MarkdownEditor
            content={file.content}
            onChange={handleContentChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%" }}>
          <MarkdownPreview content={file.content} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditorPage;
