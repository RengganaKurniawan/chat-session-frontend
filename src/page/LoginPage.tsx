
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import usersData from "../data/users.json";
//all MUI related imports
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Divider, 
  Box, 
  Stack,
  Link as MuiLink
} from '@mui/material';

const GoogleIcon = () => (
  <img 
    src="src/assets/Google_logo.png" 
    alt="Google" 
    style={{ width: 20, height: 20 }} 
  />
);

const MicrosoftIcon = () => (
  <img 
    src="src/assets/Microsoft_logo.png" 
    alt="Microsoft" 
    style={{ width: 20, height: 20 }} 
  />
);

const SignInCard: React.FC = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //email change handler with validation
    const handleEmailChange = (e: { target: { value: any; }; }) => {
      const val = e.target.value;
      setLoginEmail(val);
      
      // Clear error immediately if user types a valid email
      if (emailError && emailRegex.test(val)) {
        setEmailError(false);
      }
    };

    const handleEmailBlur = () => {
      // Validate on blur (when user clicks away)
      if (loginEmail.length > 0 && !emailRegex.test(loginEmail)) {
        setEmailError(true);
      }
    };

    // Button is enabled only if email format is valid and password is not empty
    const isFormValid = emailRegex.test(loginEmail) && loginPassword.length > 0;
    //login form submit handler
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const userData = usersData.users.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      if (userData) {
        const data = {
          email: userData.email,
          name: userData.name,
        };
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        alert("Wrong email or password.");
      }
    };

    //redirect to dashboard if already logged in
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        navigate("/dashboard");
      }
    }, [navigate]);

  return (  
    //form card container
    <Card 
      elevation={6} 
      sx={{ 
        bgcolor: '#D9D9D9', 
        borderRadius: '24px', 
        width: '100%', 
        maxWidth: 400, 
        border: '1px solid rgba(209, 213, 219, 0.5)' 
      }}
    >
      <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <form onSubmit={handleLogin}>
          <Stack spacing={2}>
              {/* Email Input */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black', ml: 0.5, mb: 0.5 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="example@gmail.com"
                  type="email"
                  value={loginEmail} 
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  error={emailError}
                  helperText={emailError ? "Please enter a valid email address" : ""}
                  variant="outlined"
                  sx={{
                  '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      '& fieldset': { borderColor: '#9ca3af' },
                      '&:hover fieldset': { borderColor: '#9ca3af' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '2px' },
                    },
                    '& input': {
                      padding: '12px 16px',
                      color: '#374151',
                    },
                  '& .MuiFormHelperText-root': {
                    marginLeft: 0.5,
                    fontSize: '0.75rem'
                  }
                  }}
                />
              </Box>

              {/* Password Input */}
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black', ml: 0.5, mb: 0.5 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      '& fieldset': { borderColor: '#9ca3af' },
                      '&:hover fieldset': { borderColor: '#9ca3af' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '2px' },
                    },
                    '& input': {
                      padding: '12px 16px',
                      color: '#374151',
                    }
                  }}
                />
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!isFormValid}
                sx={{
                  bgcolor: '#1E90FF',
                  '&:hover': { bgcolor: '#2563eb' },
                  borderRadius: '50px',
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: 2,
                }}
              >
                Sign In
              </Button>
          </Stack>
        </form>
        {/* Divider */}
        <Divider sx={{ '&::before, &::after': { borderColor: 'black' }, color: 'black' }}>
          <Typography variant="body1" sx={{ px: 1, pb: 0.5 }}>or</Typography>
        </Divider>

        {/* Social Login Buttons */}
        <Stack spacing={2}>
          <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                bgcolor: 'white',
                color: '#4b5563',
                borderColor: '#9ca3af',
                borderRadius: '50px',
                textTransform: 'none',
                py: 1.5,
                fontWeight: 600,
                boxShadow: 1,
                '&:hover': {
                  bgcolor: '#f9fafb',
                  borderColor: '#9ca3af',
                }
              }}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<MicrosoftIcon />}
            sx={{
              bgcolor: 'white',
              color: '#4b5563',
              borderColor: '#9ca3af',
              borderRadius: '50px',
              textTransform: 'none',
              py: 1.5,
              fontWeight: 600,
              boxShadow: 1,
              '&:hover': {
                bgcolor: '#f9fafb',
                borderColor: '#9ca3af',
              }
            }}
          >
            Sign in with Microsoft Account
          </Button>
        </Stack>

        {/* Footer Link */}
        <Typography variant="body2" align="center" sx={{ color: 'black', mt: 1 }}>
          Don't have an account?{' '}
            <MuiLink href="#" underline="hover" sx={{ color: '#4A90E2', fontWeight: 500 }}>
              Sign Up
            </MuiLink>
        </Typography>
      </CardContent>
    </Card>
  );
};

function LoginPageMUI() {
  return (
    <Box sx={{minHeight: '100vh', 
        width: '100%',    
        backgroundColor: 'white',
        display: 'flex',  
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 4,    
        fontFamily: 'sans-serif', 
        }}>   
        {/* Page Heading */}
        <Typography variant="h1" component="h1" align="center" sx={{ fontSize: { xs: '2.25rem', md: '2.5rem' }, fontWeight: 'bold', color: 'black', marginBottom: '2rem', textAlign: 'center', }}>
          Sign in to Chat App
        </Typography>      
      <SignInCard />   
    </Box>    
  );
}

export default LoginPageMUI;