import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Stack, useTheme } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';

import config from '../config';

const AUTH_BASE_URL = config.AUTH_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${AUTH_BASE_URL}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('EMSusername', username);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Please verify your identity.');
      }
    } catch (err) {
      setLoading(false);
      setError('Communication failure with authentication server.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', pt: 8 }}>
      <Card sx={{ width: '100%', p: { xs: 2, md: 4 }, position: 'relative', overflow: 'visible' }}>
        {/* Geometric Accent */}
        <Box sx={{
          position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
          width: 60, height: 60, borderRadius: 3, bgcolor: 'primary.main',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.5)', zIndex: 2
        }}>
          <LockOutlined sx={{ color: 'white' }} />
        </Box>

        <CardContent sx={{ pt: 5 }}>
          <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>
            Access Portal
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Enter your credentials to access EMS PRO.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                IDENTIFIER
              </Typography>
              <TextField
                fullWidth
                placeholder="Unique username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="off"
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                SECURITY TOKEN
              </Typography>
              <TextField
                fullWidth
                placeholder="Access password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress thickness={5} />
              </Box>
            ) : (
              <Button fullWidth variant="contained" className="gradient-bg" type="submit" sx={{ py: 1.8, fontSize: '1rem' }}>
                Authenticate
              </Button>
            )}

            {error && (
              <Typography variant="body2" sx={{ color: '#ef4444', textAlign: 'center', mt: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', py: 1, borderRadius: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Operational Status: <span style={{ color: '#10b981', fontWeight: 700 }}>Online</span>
              </Typography>
              
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 600, '&:hover': { color: 'primary.main' } }}>
                    Create Account
                  </Typography>
                </Link>
                <Box sx={{ width: 1, height: 16, bgcolor: 'divider' }} />
                <Link to="/verify-username" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, '&:hover': { color: 'text.primary' } }}>
                    Lost Access?
                  </Typography>
                </Link>
              </Stack>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
