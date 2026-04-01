import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert, Container, Avatar, Grid, Card, CardContent, Divider, Stack, useTheme, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [averageAge, setAverageAge] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowSnackbar(true);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employees = await getAllEmployees();
        const departments = await getAllDepartments();
        setEmployeeCount(employees.length);
        setDepartmentCount(departments.length);

        const totalAge = employees.reduce((sum, emp) => sum + emp.age, 0);
        const avgAge = employees.length ? (totalAge / employees.length).toFixed(1) : 0;
        setAverageAge(avgAge);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const username = localStorage.getItem('EMSusername') || 'Administrator';
  const isDark = theme.palette.mode === 'dark';

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 10 }}>
      <Snackbar open={showSnackbar} onClose={() => navigate('/login')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="warning" variant="filled" sx={{ bgcolor: 'background.paper' }}>Access Denied. Please authenticate.</Alert>
      </Snackbar>

      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Avatar 
          sx={{ 
            width: 140, height: 140, mx: 'auto', mb: 4, 
            bgcolor: 'primary.main', fontSize: '3.5rem', fontWeight: 900,
            boxShadow: `0 0 50px ${alpha(theme.palette.primary.main, 0.4)}`,
            border: `6px solid ${alpha(theme.palette.background.paper, 0.8)}`,
            color: 'white'
          }}
        >
          {username[0].toUpperCase()}
        </Avatar>
        <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.03em' }}>
          Personnel Profile
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.25rem', fontWeight: 500 }}>
          Identity: <span style={{ color: theme.palette.text.primary, fontWeight: 700 }}>{username}</span>
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: alpha(theme.palette.background.paper, 0.6) }}>
            <CardContent sx={{ p: 5 }}>
              <Stack spacing={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 3 }}>
                    <PersonOutlineIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>IDENTIFIER</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{username}</Typography>
                  </Box>
                </Box>
                <Divider sx={{ opacity: 0.1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.secondary.main, 0.1), borderRadius: 3 }}>
                    <TrendingUpIcon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>ACCESS LEVEL</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>System Administrator</Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', background: alpha(theme.palette.background.paper, 0.6) }}>
            <CardContent sx={{ p: 5 }}>
              <Stack spacing={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 3 }}>
                    <GroupsIcon sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>ORC CAPACITY</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{employeeCount} Active Records</Typography>
                  </Box>
                </Box>
                <Divider sx={{ opacity: 0.1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ p: 1.5, bgcolor: alpha(theme.palette.secondary.main, 0.1), borderRadius: 3 }}>
                    <BusinessIcon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Box>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>STRUCTURAL NODES</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>{departmentCount} Functional Units</Typography>
                  </Box>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box className="glass" sx={{ 
            p: 5, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: `1px solid ${theme.palette.divider}`,
            background: alpha(theme.palette.background.paper, 0.4)
          }}>
            <Box>
              <Typography sx={{ color: 'text.primary', fontWeight: 800, mb: 0.5 }}>System Node Security</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>System uptime: 99.9% • Last sync: {new Date().toLocaleTimeString()}</Typography>
            </Box>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                borderRadius: 4, px: 3, py: 1.2, fontWeight: 700,
                border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                '&:hover': { border: `1px solid ${theme.palette.error.main}`, bgcolor: alpha(theme.palette.error.main, 0.05) }
              }}
            >
              Terminate Session
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
