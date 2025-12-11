import { Box, Container, Typography } from "@mui/material";
import LeftNav from "./LeftNav";

const OutOfScopePage = ({ pageName = "This page" }) => {
  return (
    <>
    <LeftNav />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          color: "#282828",
          textAlign: "center",
          p: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Feature Out of Scoped
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#282828",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            The <strong>{pageName}</strong> feature is currently out of scope.
            It was not included in the project requirements and has not been
            developed.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default OutOfScopePage;
