import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addDepartment, getDepartmentById, updateDepartment } from '../services/departmentService';
import { TextField, Button, CircularProgress, Box, Card, CardContent, Typography, Container, Stack, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const DepartmentForm = () => {
  const [department, setDepartment] = useState({ name: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const departmentData = await getDepartmentById(id);
          setDepartment(departmentData || { name: '' });
        } catch (error) {
          console.error('Error fetching department data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateDepartment(id, department);
      } else {
        await addDepartment(department);
      }
      navigate('/departments');
    } catch (error) {
      console.error('Error saving department:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 14, mb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          <Link to="/departments" style={{ color: 'inherit', textDecoration: 'none' }}>Nodal Units</Link>
          <Typography color="white" sx={{ fontWeight: 600 }}>{id ? 'Modify Unit' : 'New Creation'}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
          {id ? 'Modify Unit' : 'Create Unit'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {id ? 'Update structural parameters for this operational node.' : 'Initialize a new operational unit within the structural hierarchy.'}
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, mb: 1, display: 'block', ml: 1 }}>
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

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" className="gradient-bg" sx={{ px: 4, py: 1.5, fontWeight: 700 }}>
                {id ? 'Confirm Modification' : 'Initialize Unit'}
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

export default DepartmentForm;
