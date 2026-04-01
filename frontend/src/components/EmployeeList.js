import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  TextField,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
  Stack,
  Container,
  IconButton,
  Tooltip,
  alpha,
  Card,
  useTheme,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const EmployeeList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowSnackbar(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await getAllEmployees();
          setEmployees(data || []);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this operative?')) return;
    setDeletingEmployeeId(id);
    try {
      await deleteEmployee(id);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee.id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
    setDeletingEmployeeId(null);
  };

  const filteredEmployees = employees.filter(
    employee =>
      (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.workMode && employee.workMode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  const getModeColor = (mode) => {
    switch (mode) {
      case 'Onsite': return 'info';
      case 'Remote': return 'success';
      case 'Hybrid': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>
      <Snackbar open={showSnackbar} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="info" variant="filled" sx={{ width: '100%', bgcolor: 'background.paper' }}>
          Authentication required to access the operative directory.
        </Alert>
      </Snackbar>

      <Box sx={{ mb: 6 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 900, mb: 1, letterSpacing: '-0.02em' }}>
              Operative Roster
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem', fontWeight: 500 }}>
              Management and deployment of active personnel records within the network.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            component={Link} 
            to="/add-employee" 
            startIcon={<AddIcon />}
            className="gradient-bg"
            sx={{ px: 4, py: 1.8, fontSize: '1rem', fontWeight: 800, borderRadius: 3 }}
          >
            Deploy New Operative
          </Button>
        </Stack>
      </Box>

      <Card sx={{ mb: 4, background: alpha(theme.palette.background.paper, 0.4) }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
          <SearchIcon sx={{ color: 'primary.main', ml: 1 }} />
          <TextField 
            placeholder="Search by name, email, or work configuration..." 
            variant="standard" 
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { fontSize: '1.2rem', color: 'text.primary', fontWeight: 500 } }}
          />
        </Box>
      </Card>

      <TableContainer component={Paper} className="glass" sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>IDENTITY / EMAIL</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>GENDER</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>MODE</TableCell>
              <TableCell sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>JOINED</TableCell>
              <TableCell align="right" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '0.1em' }}>OPERATIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(employee => (
              <TableRow 
                key={employee.id}
                sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }, transition: 'background 0.2s', borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {employee.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    {employee.gender || 'Unknown'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={employee.workMode || 'Unset'} 
                    size="small" 
                    color={getModeColor(employee.workMode)}
                    variant="outlined"
                    icon={<WorkOutlineIcon style={{ fontSize: '1rem' }} />}
                    sx={{ fontWeight: 700, borderRadius: 1.5, px: 0.5 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {employee.hireDate || 'TBD'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                    <Tooltip title="Modify Roster">
                      <IconButton 
                        component={Link} 
                        to={`/edit-employee/${employee.id}`}
                        sx={{ 
                          color: 'primary.main', 
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, 
                          borderRadius: 2,
                          '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Terminate Access">
                      <IconButton 
                        onClick={() => handleDelete(employee.id)}
                        disabled={deletingEmployeeId === employee.id}
                        sx={{ 
                          color: 'error.main', 
                          border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`, 
                          borderRadius: 2,
                          '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) }
                        }}
                      >
                        {deletingEmployeeId === employee.id ? <CircularProgress size={18} color="inherit" /> : <DeleteIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredEmployees.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 12 }}>
                  <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>No operatives found matching your current parameters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmployees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{ color: 'text.secondary', borderTop: `1px solid ${theme.palette.divider}`, bgcolor: alpha(theme.palette.background.paper, 0.1) }}
        />
      </TableContainer>
    </Container>
  );
};

export default EmployeeList;
