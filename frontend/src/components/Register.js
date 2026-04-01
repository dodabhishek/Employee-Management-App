import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Stack } from '@mui/material';
import { Visibility, VisibilityOff, PersonAddOutlined } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

import config from '../config';

const AUTH_BASE_URL = config.AUTH_BASE_URL;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password synchronization failure. Please match the sequence.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      setLoading(false);

      if (response.ok) {
        alert('Registration successful. You may now authenticate.');
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration anomaly detected. Please retry.');
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
          width: 60, height: 60, borderRadius: 3, bgcolor: '#06b6d4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)', zIndex: 2
        }}>
          <PersonAddOutlined sx={{ color: 'white' }} />
        </Box>

        <CardContent sx={{ pt: 5 }}>
          <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>
            Identity Creation
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Register your credentials to join the EMS PRO network.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'secondary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                OPERATIVE HANDS
              </Typography>
              <TextField
                fullWidth
                placeholder="Secure username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="off"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'secondary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                ENCRYPTION KEY
              </Typography>
              <TextField
                fullWidth
                placeholder="Create password"
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

            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'secondary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                RE-VERIFICATION
              </Typography>
              <TextField
                fullWidth
                placeholder="Confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress thickness={5} color="secondary" />
              </Box>
            ) : (
              <Button fullWidth variant="contained" className="gradient-bg" type="submit" sx={{ py: 1.8, fontSize: '1rem' }}>
                Join Network
              </Button>
            )}

            {error && (
              <Typography variant="body2" sx={{ color: '#ef4444', textAlign: 'center', mt: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', py: 1, borderRadius: 2 }}>
                {error}
              </Typography>
            )}

            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <Stack direction="row" spacing={2} justifyContent="center" sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', pt: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Already registered?
                </Typography>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ color: 'secondary.light', fontWeight: 600, '&:hover': { color: 'white' } }}>
                    Login Instead
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

export default Register;
