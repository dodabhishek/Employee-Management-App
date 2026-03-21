import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText, Chip } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isMobile = useMediaQuery('(max-width:1000px)');

  const isActive = path => currentPath === path;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Employees', path: '/employees' },
    { label: 'Departments', path: '/departments' },
    { label: 'Profile', path: '/profile' },
  ];

  const drawerContent = (
    <Box sx={{ width: 280, background: 'linear-gradient(180deg, #243385 0%, #1a245f 100%)', height: '100%', color: 'white', p: 2 }} role="presentation">
      <Typography variant="subtitle2" sx={{ opacity: 0.9, letterSpacing: '0.08em', mb: 1.5 }}>
        EMPLOYEE MANAGEMENT
      </Typography>
      <List sx={{ p: 0 }}>
        {navItems.map(item => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.16)' },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
        {isLoggedIn ? (
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, mt: 0.5 }}>
            <ListItemText primary="Logout" sx={{ color: '#ffb4b4' }} />
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to="/login" onClick={handleDrawerToggle} sx={{ borderRadius: 2, mt: 0.5 }}>
            <ListItemText primary="Login" />
          </ListItemButton>
        )}
        <ListItemButton component={Link} to="/register" onClick={handleDrawerToggle} sx={{ borderRadius: 2 }}>
          <ListItemText primary="Register" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'rgba(255,255,255,0.9)',
          color: '#1b265f',
          borderBottom: '1px solid #e7ebff',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ minHeight: 78 }}>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: '#1e2b6f',
              fontSize: '1.25rem',
              fontWeight: 800,
            }}
          >
            Employee Management System
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ color: '#1e2b6f' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map(item => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: '999px',
                    px: 1.6,
                    color: isActive(item.path) ? '#1f2c75' : '#4d577b',
                    fontWeight: isActive(item.path) ? 700 : 600,
                    backgroundColor: isActive(item.path) ? '#eef2ff' : 'transparent',
                    '&:hover': { backgroundColor: '#eef2ff' },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  sx={{
                    borderRadius: '999px',
                    px: 2,
                    color: '#8e1b1b',
                    fontWeight: 700,
                    backgroundColor: '#ffe5e5',
                    '&:hover': { backgroundColor: '#ffd6d6' },
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    borderRadius: '999px',
                    px: 2,
                    color: '#1f2c75',
                    fontWeight: 700,
                    border: '1px solid #d7defc',
                  }}
                >
                  Login
                </Button>
              )}
              <Button
                component={Link}
                to="/register"
                sx={{
                  borderRadius: '999px',
                  px: 2.1,
                  py: 0.8,
                  fontWeight: 700,
                  color: 'white',
                  background: 'linear-gradient(135deg, #2b3d99 0%, #1d2b70 100%)',
                  '&:hover': { background: 'linear-gradient(135deg, #243385 0%, #182255 100%)' },
                }}
              >
                Register
              </Button>
              <Chip label="Live" size="small" sx={{ bgcolor: '#e5fff1', color: '#0a7a3e', fontWeight: 700 }} />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
