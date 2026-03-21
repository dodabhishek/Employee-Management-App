import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack, Chip } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #243385 0%, #1a245f 100%)',
        color: 'white',
        py: 5,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Employee Management
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
              Dashboards, departments, and employee operations in one place for fast decisions and clean reporting.
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Export-ready data" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: 'white' }} />
              <Chip label="Role-based access" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: 'white' }} />
              <Chip label="Insightful dashboards" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: 'white' }} />
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="/" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Home
              </Link>
              <Link href="/dashboard" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Dashboard
              </Link>
              <Link href="/employees" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Employees
              </Link>
              <Link href="/departments" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Departments
              </Link>
              <Link href="/profile" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Profile
              </Link>
              <Link href="/login" color="inherit" underline="none" sx={{ display: 'block', mb: 0.8, opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Login
              </Link>
              <Link href="/register" color="inherit" underline="none" sx={{ display: 'block', opacity: 0.95, '&:hover': { color: '#ffd180' } }}>
                Register
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.8 }}>
              Maintainer:{' '}
              <Link href="https://github.com/hoangsonww" color="inherit" sx={{ textDecoration: 'underline', '&:hover': { color: '#ffd180' } }}>
                Son Nguyen
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.8 }}>
              Email:{' '}
              <Link href="mailto:hoangson091104@gmail.com" color="inherit" sx={{ textDecoration: 'underline', '&:hover': { color: '#ffd180' } }}>
                hoangson091104@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Weekly pulse, exports, and dashboard insights ready for teams and leadership.
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.22)',
            mt: 3,
            pt: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © {new Date().getFullYear()} Employee Management System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
