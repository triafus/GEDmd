import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useNavigate } from "react-router";

// exécuté par Morgan LUCAS fait par IA
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
      <Box sx={{ mb: 8, textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          GEDmd
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto" }}
        >
          L'explorateur intelligent pour vos documents Markdown. Organisez,
          rédigez et réutilisez vos contenus en toute fluidité.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <FolderOpenIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Explorateur
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Parcourez vos fichiers et dossiers. Utilisez le Drag & Drop pour
              réorganiser votre espace de travail instantanément.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <EditNoteIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Édition Live
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Profitez d'un éditeur puissant avec prévisualisation temps réel.
              Exportez vos documents au format .md en un clic.
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-4px)" },
            }}
          >
            <ExtensionIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Bibliothèque
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Gérez vos fragments de texte favoris dans la bibliothèque de blocs
              et insérez-les instantanément dans vos articles.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/blocks")}
              sx={{ mt: "auto", borderRadius: 2 }}
            >
              Gérer les blocs
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor: "action.hover",
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Toutes vos données sont stockées localement pour garantir votre
          confidentialité. Utilisez les icônes en haut à gauche pour commencer à
          créer !
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
