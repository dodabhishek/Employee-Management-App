import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, Chip, Divider, alpha, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CONTACT_NAME = process.env.REACT_APP_CONTACT_NAME || 'Development Team';
const CONTACT_GITHUB_URL = process.env.REACT_APP_CONTACT_GITHUB_URL || 'https://github.com/dodabhishek/Employee-Management-App';
const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL || 'support@emspro.ai';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'rgba(2, 6, 23, 0.5)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: 'text.secondary',
        pt: 8,
        pb: 4,
        mt: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={8} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: '6px', background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)' }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                EMS<span style={{ color: '#94a3b8', fontWeight: 500 }}>PRO</span>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 4, maxWidth: 320 }}>
              The definitive platform for modern workforce orchestration. 
              Built with precision for teams that demand clarity, speed, and real-time intelligence.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {['SOC2 Type II', 'GDPR Ready', '99.9% Uptime'].map((tag) => (
                <Chip 
                  key={tag} 
                  label={tag} 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.03)', 
                    color: 'text.secondary', 
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    border: '1px solid rgba(255,255,255,0.05)'
                  }} 
                />
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 3, letterSpacing: '0.1em' }}>
              RESOURCES
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Intelligence', path: '/dashboard' },
                { label: 'Operatives', path: '/employees' },
                { label: 'Nodal Units', path: '/departments' },
                { label: 'Identity', path: '/profile' }
              ].map((link) => (
                <Link 
                  key={link.label}
                  component={RouterLink} 
                  to={link.path} 
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: 'primary.light' }, transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 3, letterSpacing: '0.1em' }}>
              ACCESS
            </Typography>
            <Stack spacing={1.5}>
              {[
                { label: 'Authenticate', path: '/login' },
                { label: 'Create Account', path: '/register' },
                { label: 'Documentation', path: '/swagger-ui.html' }
              ].map((link) => (
                <Link 
                  key={link.label}
                  component={link.path.includes('html') ? 'a' : RouterLink} 
                  href={link.path.includes('html') ? link.path : undefined}
                  to={link.path.includes('html') ? undefined : link.path} 
                  color="inherit" 
                  underline="none" 
                  sx={{ '&:hover': { color: 'primary.light' }, transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 3, letterSpacing: '0.1em' }}>
              CONNECTIVITY
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>{CONTACT_NAME} / OSS Division</Typography>
            <Link 
              href={`mailto:${CONTACT_EMAIL}`} 
              sx={{ color: 'primary.light', textDecoration: 'none', display: 'block', mb: 2, fontWeight: 600 }}
            >
              {CONTACT_EMAIL}
            </Link>
            <Link 
              href={CONTACT_GITHUB_URL} 
              target="_blank"
              sx={{ 
                px: 2, py: 1, borderRadius: 2, border: '1px solid rgba(255,255,255,0.05)',
                display: 'inline-flex', alignItems: 'center', gap: 1, color: 'white',
                textDecoration: 'none', bgcolor: 'rgba(255,255,255,0.02)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: 'primary.light' },
                transition: 'all 0.2s'
              }}
            >
              Source Repository
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, opacity: 0.05 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            © {new Date().getFullYear()} EMS PRO Intelligence Systems. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
              <Typography key={item} variant="caption" sx={{ opacity: 0.5, cursor: 'pointer', '&:hover': { opacity: 0.8 } }}>
                {item}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
