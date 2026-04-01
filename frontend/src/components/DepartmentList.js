import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllDepartments, deleteDepartment } from '../services/departmentService';
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
  Card,
  alpha,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const DepartmentList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState(null);
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
          const data = await getAllDepartments();
          setDepartments(data || []);
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isLoggedIn]);

  const handleDelete = async id => {
    if (!window.confirm('Terminate this operational unit? This action cannot be reversed.')) return;
    setDeletingDepartmentId(id);
    try {
      await deleteDepartment(id);
      setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== id));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
    setDeletingDepartmentId(null);
  };

  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    navigate('/login', { replace: true });
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress thickness={5} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>
      <Snackbar open={showSnackbar} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="info" variant="filled" sx={{ width: '100%', bgcolor: 'background.paper' }}>
          Authentication required to access department structures.
        </Alert>
      </Snackbar>

      <Box sx={{ mb: 6 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
          <Box>
            <Typography variant="h3" className="gradient-text" sx={{ fontWeight: 800, mb: 1 }}>
              Operational Units
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Management of organizational hierarchy and department nodes.
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            component={Link} 
            to="/add-department" 
            startIcon={<AddIcon />}
            className="gradient-bg"
            sx={{ px: 3, py: 1.5 }}
          >
            Create New Unit
          </Button>
        </Stack>
      </Box>

      <Card sx={{ mb: 4 }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchIcon sx={{ color: 'text.secondary' }} />
          <TextField 
            placeholder="Filter units by name or identifier..." 
            variant="standard" 
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ disableUnderline: true, sx: { fontSize: '1.1rem', color: 'text.primary' } }}
          />
        </Box>
      </Card>

      <TableContainer component={Paper} className="glass">
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'primary.main', borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>UNIT NAME</TableCell>
              <TableCell align="right" sx={{ color: 'primary.main', borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDepartments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(department => (
              <TableRow 
                key={department.id}
                sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.05) }, transition: 'background 0.2s' }}
              >
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>{department.name}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Modify Unit">
                      <IconButton 
                        component={Link} 
                        to={`/edit-department/${department.id}`}
                        sx={{ color: 'primary.main', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`, borderRadius: 2 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Dissolve Unit">
                      <IconButton 
                        onClick={() => handleDelete(department.id)}
                        disabled={deletingDepartmentId === department.id}
                        sx={{ color: 'error.main', border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`, borderRadius: 2 }}
                      >
                        {deletingDepartmentId === department.id ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredDepartments.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 10 }}>
                  <Typography sx={{ color: 'text.secondary' }}>No operational units found matching your current parameters.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredDepartments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          sx={{ color: 'text.secondary', borderTop: `1px solid ${theme.palette.divider}` }}
        />
      </TableContainer>
    </Container>
  );
};

export default DepartmentList;
