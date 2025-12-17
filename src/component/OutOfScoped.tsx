import { Box, Button, Container, Typography } from "@mui/material";
import LeftNav from "./LeftNav";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface OutOfScopePageProps {
  pageName?: string;
  showNav?: boolean;
  backPath?: string;
}

const OutOfScopePage = ({ 
  pageName = "This page",
  showNav = true,
  backPath
}: OutOfScopePageProps) => {
  const navigate = useNavigate();

  return (
    <>
    {showNav && <LeftNav />}
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
          ml: showNav ? '240px' : 0,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Feature Out of Scope
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

          {backPath && (
            <Button
              variant="contained" 
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(backPath)}
              sx={{
                borderRadius: '50px',
                textTransform: 'none',
                mt: 2
              }}
            >
              Back to Login
            </Button>
          )}
        </Container>
      </Box>
    </>
  );
};

export default OutOfScopePage;
