import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Stack, Chip, useTheme, alpha } from '@mui/material';
import { Link } from 'react-router-dom';

const statCards = [
  { value: '84.50%', label: 'Systems Uptime' },
  { value: '1.5 min', label: 'Processing Speed' },
  { value: '2.7x', label: 'Manager Efficiency' },
];

const modules = [
  {
    title: 'Operative Matrix',
    desc: 'Full intelligence profiles, quick edits, and smart filters for any slice of your organisation.',
    link: '/employees',
    icon: '👤'
  },
  {
    title: 'Unit Navigation',
    desc: 'Keep teams organised with clean structures and quick pivots between organizational units.',
    link: '/departments',
    icon: '🏢'
  },
  {
    title: 'System Intelligence',
    desc: 'Trend lines, cohorts, and composition charts to see what is moving the needle in real-time.',
    link: '/dashboard',
    icon: '📊'
  },
];

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pt: { xs: 12, md: 24 }, pb: 20 }}>
      {/* Background Orbs */}
      <Box sx={{
        position: 'absolute', top: '10%', left: '-5%', width: '40vw', height: '40vw',
        background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />
      <Box sx={{
        position: 'absolute', bottom: '10%', right: '-5%', width: '35vw', height: '35vw',
        background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: { xs: 10, md: 16 } }}>
          <Chip 
            label="THE NEW STANDARD" 
            sx={{ 
              mb: 4, fontWeight: 700, letterSpacing: '0.2em',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: 'primary.main',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              px: 2, py: 2
            }} 
          />
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '2.8rem', md: '5.5rem' }, 
            lineHeight: 1.05, mb: 3, fontWeight: 900,
            color: 'text.primary',
            letterSpacing: '-0.04em'
          }}>
            Manage your workforce <br />
            <span className="gradient-text">with absolute clarity.</span>
          </Typography>
          <Typography sx={{ maxWidth: 650, mx: 'auto', color: 'text.secondary', fontSize: { xs: '1.1rem', md: '1.25rem' }, mb: 6, lineHeight: 1.6, fontWeight: 500 }}>
            The all-in-one platform for modern people operations. Built for speed, 
            designed for insights, and ready for global intelligence scale.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button component={Link} to="/dashboard" variant="contained" className="gradient-bg" sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 4 }}>
              Launch Intelligence
            </Button>
            <Button component={Link} to="/employees" variant="outlined" sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: 4, borderColor: theme.palette.divider }}>
              Explore Roster
            </Button>
          </Stack>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={4} sx={{ mb: 16 }}>
          {statCards.map((card, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Box className="glass" sx={{ 
                p: 5, borderRadius: 8, textAlign: 'center', 
                border: `1px solid ${theme.palette.divider}`,
                background: alpha(theme.palette.background.paper, 0.4)
              }}>
                <Typography variant="h2" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>{card.value}</Typography>
                <Typography sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>
                  {card.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Features / Modules */}
        <Box sx={{ mb: 16 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 900, letterSpacing: '-0.02em', color: 'text.primary' }}>
            Unified Intelligence Matrix
          </Typography>
          <Grid container spacing={4}>
            {modules.map((module, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: alpha(theme.palette.background.paper, 0.6) }}>
                  <CardContent sx={{ p: 5, flexGrow: 1 }}>
                    <Box sx={{ 
                      fontSize: '2.5rem', mb: 4, width: 64, height: 64, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      bgcolor: alpha(theme.palette.primary.main, 0.1), borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    }}>
                      {module.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>{module.title}</Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8, fontSize: '1rem' }}>{module.desc}</Typography>
                    <Button 
                      component={Link} 
                      to={module.link} 
                      sx={{ 
                        color: 'primary.main', p: 0, fontWeight: 700, fontSize: '1rem',
                        '&:hover': { background: 'transparent', color: 'primary.dark' }
                      }}
                    >
                      Access Module →
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          className="animate-float"
          sx={{ 
            p: { xs: 8, md: 12 }, borderRadius: 10, textAlign: 'center', 
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(32px)',
            boxShadow: isDark ? '0 32px 64px rgba(0,0,0,0.5)' : '0 32px 64px rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, letterSpacing: '-0.03em', color: 'text.primary' }}>
            Ready to transform your org?
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 6, maxWidth: 550, mx: 'auto', fontSize: '1.15rem', lineHeight: 1.6 }}>
            Join 500+ intelligence-driven companies using EMS PRO to manage their most important asset: their people.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button component={Link} to="/register" variant="contained" className="gradient-bg" sx={{ px: 6, py: 2.2, fontSize: '1.1rem', borderRadius: 4, fontWeight: 800 }}>
              Initialize Identity
            </Button>
            <Button component={Link} to="/login" variant="text" sx={{ color: 'text.primary', px: 5, fontWeight: 700 }}>
              Sign in to Network
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
