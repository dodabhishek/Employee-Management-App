import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItemButton, ListItemText, Container, useTheme, Tooltip, Stack } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = ({ mode, toggleTheme }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isMobile = useMediaQuery('(max-width:1024px)');
  const isActive = path => currentPath === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { label: 'Intelligence', path: '/dashboard' },
    { label: 'Operatives', path: '/employees' },
    { label: 'Units', path: '/departments' },
    { label: 'Identity', path: '/profile' },
  ];

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: mode === 'dark' ? '#020617' : '#F8FAFC', p: 3 }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" className="gradient-text" sx={{ fontWeight: 800 }}>
          Management
        </Typography>
        <IconButton onClick={toggleTheme} color="primary">
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>
      <List sx={{ p: 0 }}>
        {navItems.map(item => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            onClick={() => setDrawerOpen(false)}
            sx={{
              borderRadius: 3,
              mb: 1,
              color: isActive(item.path) ? 'primary.main' : 'text.secondary',
              '&.Mui-selected': { backgroundColor: 'primary.light', color: 'white', opacity: 0.1 },
            }}
          >
            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ))}
        {isLoggedIn ? (
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 3, mt: 2, color: '#ef4444' }}>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
          </ListItemButton>
        ) : (
          <>
            <ListItemButton component={Link} to="/login" onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 3, mt: 2 }}>
              <ListItemText primary="Login" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
            <ListItemButton component={Link} to="/register" onClick={() => setDrawerOpen(false)} sx={{ borderRadius: 3, bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
              <ListItemText primary="Register" primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: scrolled 
          ? (mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)') 
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled 
          ? (mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)') 
          : 'none',
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: scrolled ? 70 : 100, transition: 'height 0.3s ease' }}>
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 1.5, flexGrow: 1 }}>
            <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: 'linear-gradient(135deg, #A855F7 0%, #06b6d4 100%)' }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: mode === 'dark' ? 'white' : '#0F172A', letterSpacing: '-0.02em', fontSize: '1.4rem' }}>
              EMS<span style={{ color: mode === 'dark' ? '#94a3b8' : '#64748B', fontWeight: 500 }}>PRO</span>
            </Typography>
          </Box>

          {isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleTheme} sx={{ color: mode === 'dark' ? 'white' : '#0F172A', border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: 2 }}>
                {mode === 'dark' ? <LightModeIcon size="small" /> : <DarkModeIcon size="small" />}
              </IconButton>
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: mode === 'dark' ? 'white' : '#0F172A', border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, borderRadius: 2 }}>
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map(item => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    px: 2,
                    color: isActive(item.path) 
                      ? (mode === 'dark' ? 'white' : '#0F172A') 
                      : (mode === 'dark' ? '#94a3b8' : '#64748B'),
                    '&:hover': { color: mode === 'dark' ? 'white' : '#0F172A', backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)' },
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 8,
                      left: '20%',
                      width: isActive(item.path) ? '60%' : '0%',
                      height: '2px',
                      background: 'linear-gradient(90deg, #A855F7, #06b6d4)',
                      transition: 'width 0.3s ease',
                      borderRadius: '2px',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              <Box sx={{ width: '1px', height: 24, bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)', mx: 1.5 }} />
              
              <Tooltip title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}>
                <IconButton 
                  onClick={toggleTheme} 
                  sx={{ 
                    color: mode === 'dark' ? 'primary.light' : 'primary.main', 
                    border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, 
                    borderRadius: 2, 
                    mr: 1.5,
                    transition: 'all 0.3s ease',
                    '&:hover': { bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
                  }}
                >
                  {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
                </IconButton>
              </Tooltip>

              {isLoggedIn ? (
                <Button variant="outlined" onClick={handleLogout} sx={{ borderRadius: 3, textTransform: 'none', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444', '&:hover': { borderColor: '#ef4444', bgcolor: 'rgba(239, 68, 68, 0.05)' } }}>
                  Logout
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button component={Link} to="/login" sx={{ color: mode === 'dark' ? 'white' : '#0F172A', px: 3 }}>
                    Login
                  </Button>
                  <Button component={Link} to="/register" variant="contained" className="gradient-bg" sx={{ borderRadius: 3, fontWeight: 700, px: 3 }}>
                    Register
                  </Button>
                </Stack>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ sx: { border: 'none' } }}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
