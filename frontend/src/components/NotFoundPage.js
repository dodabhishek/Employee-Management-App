import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Box, Typography, Container, Stack } from '@mui/material';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        {/* Decorative background number */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '8rem', md: '15rem' }, 
            fontWeight: 900, 
            opacity: 0.03, 
            position: 'absolute', 
            top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            whiteSpace: 'nowrap'
          }}
        >
          404 ERROR
        </Typography>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" className="gradient-text" sx={{ fontWeight: 800, mb: 2 }}>
            Node Not Found.
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500, mx: 'auto' }}>
            The requested tactical address does not exist within the EMS PRO network.
          </Typography>
          <Box className="glass" sx={{ p: 4, borderRadius: 6, mb: 6, bgcolor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <Typography variant="body1" sx={{ color: '#ef4444', fontWeight: 600 }}>
              Anonymised Error Trace: 0x404_NULL_REFERENCE
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" className="gradient-bg" onClick={() => navigate('/')} sx={{ px: 4, py: 1.5 }}>
              Return to Base
            </Button>
            <Button variant="outlined" component={Link} to="/dashboard" sx={{ px: 4, py: 1.5, borderColor: 'rgba(255,255,255,0.1)' }}>
              Intelligence Terminal
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
