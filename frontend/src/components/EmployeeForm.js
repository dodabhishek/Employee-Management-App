import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { addEmployee, getEmployeeById, updateEmployee } from '../services/employeeService';
import { getAllDepartments } from '../services/departmentService';
import { TextField, Button, MenuItem, Box, CircularProgress, Card, CardContent, Typography, Container, Stack, Breadcrumbs, Grid, useTheme, alpha } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const EmployeeForm = () => {
  const theme = useTheme();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    hireDate: new Date().toISOString().split('T')[0],
    workMode: 'Onsite',
    satisfactionScore: 5,
    department: { id: '' },
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departmentsData = await getAllDepartments();
        setDepartments(departmentsData || []);

        if (id) {
          const employeeData = await getEmployeeById(id);
          if (employeeData) {
            setEmployee({
              firstName: employeeData.firstName || '',
              lastName: employeeData.lastName || '',
              email: employeeData.email || '',
              age: employeeData.age || '',
              gender: employeeData.gender || '',
              hireDate: employeeData.hireDate || new Date().toISOString().split('T')[0],
              workMode: employeeData.workMode || 'Onsite',
              satisfactionScore: employeeData.satisfactionScore || 5,
              department: {
                id: employeeData.department ? employeeData.department.id : '',
              },
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'department.id') {
      setEmployee({ ...employee, department: { id: value } });
    } else {
      setEmployee({
        ...employee,
        [name]: (name === 'age' || name === 'satisfactionScore') ? (value === '' ? '' : Number(value)) : value,
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        await updateEmployee(id, employee);
      } else {
        await addEmployee(employee);
      }
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          <Link to="/employees" style={{ color: 'inherit', textDecoration: 'none' }}>Operatives</Link>
          <Typography color="text.primary" sx={{ fontWeight: 600 }}>{id ? 'Edit Entry' : 'New Deployment'}</Typography>
        </Breadcrumbs>
        
        <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>
          {id ? 'Modify Operative' : 'Deploy Operative'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
          {id ? 'Update existing personnel parameters and departmental mapping.' : 'Initialize a new personnel record within the system network.'}
        </Typography>
      </Box>

      <Card sx={{ background: alpha(theme.palette.background.paper, 0.6) }}>
        <CardContent sx={{ p: { xs: 4, md: 6 } }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Basic Info */}
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  GIVEN NAME
                </Typography>
                <TextField placeholder="First Name" name="firstName" value={employee.firstName} onChange={handleChange} required fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  FAMILY NAME
                </Typography>
                <TextField placeholder="Last Name" name="lastName" value={employee.lastName} onChange={handleChange} required fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  COMMUNICATION ADDRESS
                </Typography>
                <TextField placeholder="Email Address" name="email" type="email" value={employee.email} onChange={handleChange} required fullWidth />
              </Grid>

              {/* Extended Metrics */}
              <Grid item xs={12} md={4}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  CHRONO AGE
                </Typography>
                <TextField placeholder="Age" name="age" type="number" value={employee.age} onChange={handleChange} required fullWidth inputProps={{ min: 1, max: 150 }} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  GENDER IDENTITY
                </Typography>
                <TextField select name="gender" value={employee.gender} onChange={handleChange} required fullWidth>
                  <MenuItem value="Male Identifying">Male Identifying</MenuItem>
                  <MenuItem value="Female Identifying">Female Identifying</MenuItem>
                  <MenuItem value="Non-Binary">Non-Binary</MenuItem>
                  <MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  DEPLOYMENT DATE
                </Typography>
                <TextField name="hireDate" type="date" value={employee.hireDate} onChange={handleChange} required fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>

              {/* Operational Mapping */}
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  WORK CONFIGURATION
                </Typography>
                <TextField select name="workMode" value={employee.workMode} onChange={handleChange} required fullWidth>
                  <MenuItem value="Onsite">Onsite Operations</MenuItem>
                  <MenuItem value="Remote">Remote Operations</MenuItem>
                  <MenuItem value="Hybrid">Hybrid Configuration</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  SATISFACTION INDEX (1-5)
                </Typography>
                <TextField select name="satisfactionScore" value={employee.satisfactionScore} onChange={handleChange} required fullWidth>
                  <MenuItem value={5}>5 - Optimal</MenuItem>
                  <MenuItem value={4}>4 - High</MenuItem>
                  <MenuItem value={3}>3 - Neutral</MenuItem>
                  <MenuItem value={2}>2 - Marginal</MenuItem>
                  <MenuItem value={1}>1 - Dissatisfied</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, mb: 1.5, display: 'block', ml: 0.5, letterSpacing: '0.1em' }}>
                  UNIT ASSIGNMENT
                </Typography>
                <TextField select name="department.id" value={employee.department.id || ''} onChange={handleChange} required fullWidth>
                  <MenuItem value="">Unassigned Node</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Stack direction="row" spacing={3} sx={{ mt: 8 }}>
              <Button type="submit" variant="contained" className="gradient-bg" sx={{ px: 6, py: 2, fontWeight: 800, borderRadius: 3 }}>
                {id ? 'Commit Modification' : 'Initialize Deployment'}
              </Button>
              <Button component={Link} to="/employees" sx={{ color: 'text.secondary', fontWeight: 700, px: 3 }}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
