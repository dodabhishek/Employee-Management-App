import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress, IconButton, InputAdornment, Container, Stack } from '@mui/material';
import { Visibility, VisibilityOff, RestartAltOutlined } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const usernameFromQuery = queryParams.get('username');
    if (usernameFromQuery) {
      setUsername(usernameFromQuery);
    }
  }, [location]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setLoading(false);
      setError('Password synchronization failure. Please match the sequence.');
      return;
    }

    try {
      const response = await fetch(`${config.AUTH_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword }),
      });

      setLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Credential update rejected by the primary server.');
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
          <RestartAltOutlined sx={{ color: 'white' }} />
        </Box>

        <CardContent sx={{ pt: 5 }}>
          <Typography variant="h4" className="gradient-text" sx={{ fontWeight: 800, textAlign: 'center', mb: 1 }}>
            Reset Credentials
          </Typography>
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            Initialize a new security token for your operative identity.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                IDENTIFIER
              </Typography>
              <TextField fullWidth value={username} onChange={e => setUsername(e.target.value)} disabled sx={{ opacity: 0.7 }} />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                NEW SECURITY TOKEN
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter new password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                CONFIRM TOKEN
              </Typography>
              <TextField
                fullWidth
                placeholder="Re-enter password"
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
                <CircularProgress thickness={5} />
              </Box>
            ) : (
              <Button fullWidth variant="contained" className="gradient-bg" type="submit" sx={{ py: 1.8, fontSize: '1rem' }}>
                Update Token
              </Button>
            )}

            {error && (
              <Typography variant="body2" sx={{ color: '#ef4444', textAlign: 'center', mt: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', py: 1, borderRadius: 2 }}>
                {error}
              </Typography>
            )}

            {success && (
              <Typography variant="body2" sx={{ color: '#10b981', textAlign: 'center', mt: 3, bgcolor: 'rgba(16, 185, 129, 0.1)', py: 1, borderRadius: 2 }}>
                Credential update successful. Establishing redirect to portal...
              </Typography>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPassword;
