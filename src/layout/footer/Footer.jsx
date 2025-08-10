// LAYOUT/Footer.jsx
import React, { useMemo, useEffect, useState } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useNavigate, useLocation } from "react-router-dom";

import ROUTES from "../../routes/routesDict";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function Footer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useCurrentUser();

  const [value, setValue] = useState("home");

  const tabs = useMemo(
    () => [
      { key: "home",      label: "Home",      icon: <HomeOutlinedIcon />,   path: ROUTES.root,      enabled: true },
      { key: "about",     label: "About",     icon: <InfoOutlinedIcon />,    path: ROUTES.about ?? "/about", enabled: true },
      { key: "favorites", label: "Favorites", icon: <FavoriteIcon />,        path: ROUTES.favorite,  enabled: !!user },
      { key: "mycards",   label: "My Cards",  icon: <CreditCardIcon />,      path: ROUTES.myCards,   enabled: !!user },
    ],
    [user]
  );

  useEffect(() => {
    const match = tabs.find((t) => pathname.startsWith(t.path));
    setValue(match?.key || "home");
  }, [pathname, tabs]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    const tab = tabs.find((t) => t.key === newValue);
    if (tab?.enabled && tab?.path) navigate(tab.path);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {tabs.map((t) => (
          <BottomNavigationAction
            key={t.key}
            value={t.key}
            label={t.label}
            icon={t.icon}
            disabled={!t.enabled}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
