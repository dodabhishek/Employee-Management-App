import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Card, CardContent, Typography, Container, Stack, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const NewDepartmentForm = () => {
  const [department, setDepartment] = useState({ name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newDepartment = {
      id: Math.floor(Math.random() * 10000),
      name: department.name,
      employees: [],
    };

    try {
      const response = await fetch('https://employee-management-app-gdm5.onrender.com/api/departments', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDepartment),
      });

      if (!response.ok) {
        throw new Error('Failed to create department');
      }
      navigate('/departments');
    } catch (error) {
      console.error('Error:', error);
      setError('Communication anomaly: structural node initialization failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 14, mb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          <Link to="/departments" style={{ color: 'inherit', textDecoration: 'none' }}>Nodal Units</Link>
          <Typography color="white" sx={{ fontWeight: 600 }}>Legacy Creation</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
          External Initialization
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Initialize a new operational unit via the legacy bridge endpoint.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'secondary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
                UNIT DESIGNATION
              </Typography>
              <TextField 
                placeholder="Department Name" 
                name="name" 
                value={department.name} 
                onChange={handleChange} 
                required 
                fullWidth 
              />
            </Box>

            {error && (
              <Typography variant="body2" sx={{ color: '#ef4444', mb: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', py: 1, px: 2, borderRadius: 2 }}>
                {error}
              </Typography>
            )}

            <Stack direction="row" spacing={2}>
              <Button 
                type="submit" 
                variant="contained" 
                className="gradient-bg" 
                sx={{ px: 4, py: 1.5, fontWeight: 700 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Initialize Unit'}
              </Button>
              <Button component={Link} to="/departments" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewDepartmentForm;
