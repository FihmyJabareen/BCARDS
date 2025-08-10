import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useCustomTheme } from "../../providers/CustomThemeProvider"; 
import ROUTES from "../../routes/routesModel"; 

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useCurrentUser();
  const { mode, toggleColorMode } = useCustomTheme();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser?.(null);
      navigate(ROUTES.root);
    } catch {
     
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
       
        <Typography
          variant="h6"
          component={Link}
          to={ROUTES.root}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          Business Card App
        </Typography>

      
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
            <IconButton color="inherit" onClick={toggleColorMode} aria-label="toggle color mode">
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

         
          <Button color="inherit" component={Link} to={ROUTES.root}>
            Home
          </Button>

          {user ? (
            <>
              <Button color="inherit" component={Link} to={ROUTES.profileEdit}>
                Edit Profile
              </Button>
              <Button color="inherit" component={Link} to={ROUTES.myCards}>
                My Cards
              </Button>
              <Button color="inherit" component={Link} to={ROUTES.favorite}>
                Favorites
              </Button>
              {user.isBusiness && (
                <Button color="inherit" component={Link} to={ROUTES.createCard}>
                  Create Card
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to={ROUTES.login}>
                Login
              </Button>
              <Button color="inherit" component={Link} to={ROUTES.register}>
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
