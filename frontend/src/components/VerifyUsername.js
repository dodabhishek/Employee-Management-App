import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, Container, Stack } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { BadgeOutlined } from '@mui/icons-material';
import config from '../config';

const VerifyUsername = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`${config.AUTH_BASE_URL}/verify-username/${username}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/reset-password?username=${username}`);
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Identity not found within the central registry.');
      }
    } catch (err) {
      setLoading(false);
      setError('Global authentication server is unreachable.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', pt: 8 }}>
      <Card sx={{ width: '100%', p: { xs: 2, md: 4 }, position: 'relative', overflow: 'visible' }}>
        {/* Geometric Accent */}
        <Box sx={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 60, borderRadius: 3, bgcolor: '#8b5cf6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)', zIndex: 2
        }}>
          <BadgeOutlined sx={{ color: 'white' }} />
        </Box>

        <CardContent sx={{ pt: 5 }}>
          <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>
            Verify Identity
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Input your unique identifier to begin the recovery sequence.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                IDENTIFIER
              </Typography>
              <TextField 
                fullWidth 
                placeholder="Unique username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                autoComplete="off"
                autoFocus
              />
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress thickness={5} />
              </Box>
            ) : (
              <Button fullWidth variant="contained" className="gradient-bg" type="submit" sx={{ py: 1.8, fontSize: '1rem' }}>
                Verify Identity
              </Button>
            )}

            {error && (
              <Typography variant="body2" sx={{ color: '#ef4444', textAlign: 'center', mt: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', py: 1, borderRadius: 2 }}>
                {error}
              </Typography>
            )}

            {success && (
              <Typography variant="body2" sx={{ color: '#10b981', textAlign: 'center', mt: 3, bgcolor: 'rgba(16, 185, 129, 0.1)', py: 1, borderRadius: 2 }}>
                Identity verified. Initializing recovery sequence...
              </Typography>
            )}

            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, '&:hover': { color: 'white' } }}>
                  Return to Portal
                </Typography>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VerifyUsername;
