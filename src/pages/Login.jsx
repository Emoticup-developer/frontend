import { useState } from "react";
import Cookies from "js-cookie";
import { amber } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import Lottie from "lottie-react";
import successAnimation from "../assets/success.json";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Comment,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [narration, setNarration] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
      navigate("/dashboard");
    }, 3000); // Wait 3s before navigating

    // try {
    //   // const res = await fetch("http://localhost:8000/api/auth/login", {
    //   //   method: "POST",
    //   //   headers: { "Content-Type": "application/json" },
    //   //   body: JSON.stringify({ username, password, narration }),
    //   // });

    //   // const data = await res.json();

    //   if (res.ok) {
    //     // Cookies.set("token", data.token, { expires: 7 }); // expires in 7 days
    //     // Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
    //     toast.success("Login successful!");
    //     setTimeout(() => navigate("/dashboard"), 1000);
    //   } else {
    //     toast.error(data.message || "Invalid credentials!");
    //   }
    // } catch (error) {
    //   toast.error("Server error. Please try again.");
    // }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // FULL SCREEN HEIGHT
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingX: 2,
        backgroundColor: "#f3f4f6",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      {loading ? (
        <Box sx={{ width: 300 }}>
          <Lottie animationData={successAnimation} loop={false} />
          <Typography align="center">Logging in...</Typography>
        </Box>
      ) : (
        <>
          {/* Login Card */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              boxShadow: 6,
              borderRadius: 2,
              padding: 4,
              backgroundColor: "#fff",
            }}
            component={Paper}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Login
              </Typography>

              {/* Username */}
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ mb: 0.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{ mb: 0.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Narration */}
              <TextField
                label="Narration"
                variant="outlined"
                multiline
                minRows={3}
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                placeholder="Write your narration here..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start" }}
                    >
                      <Comment />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ width: "100%", textAlign: "right" }}>
                <Link href="#" underline="hover">
                  forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{
                  backgroundColor: amber[600],
                  color: "black",
                  "&:hover": { backgroundColor: amber[700] },
                }}
              >
                Submit
              </Button>
            </form>
          </Box>

          {/* Footer Links */}
          <Box
            sx={{
              width: "100%",
              maxWidth: 400,
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mr: 3,
              fontSize: "0.875rem",
            }}
          >
            <Link href="#" underline="hover" color="inherit">
              Help
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Terms
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Privacy
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LoginPage;
