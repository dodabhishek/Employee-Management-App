import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#A855F7', // Cyber Purple (Purple 500)
      light: '#C084FC',
      dark: '#9333EA',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06b6d4', // Cyan 500
      light: '#22d3ee',
      dark: '#0891b2',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'dark' ? '#020617' : '#F8FAFC',
      paper: mode === 'dark' ? 'rgba(15, 23, 42, 0.7)' : 'rgba(255, 255, 255, 0.8)',
    },
    text: {
      primary: mode === 'dark' ? '#f8fafc' : '#0F172A',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748B',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: "'Inter', 'Poppins', sans-serif",
    h1: { fontWeight: 800, letterSpacing: '-0.025em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.55 },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'dark' ? '#020617' : '#F8FAFC',
          backgroundImage: mode === 'dark' 
            ? 'radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.08) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.05) 0px, transparent 50%)' 
            : 'radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.04) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.03) 0px, transparent 50%)',
          minHeight: '100vh',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(16px)',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: mode === 'dark' ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'dark' ? '0 12px 48px rgba(168, 85, 247, 0.15)' : '0 12px 48px rgba(168, 85, 247, 0.1)',
            borderColor: 'rgba(168, 85, 247, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #C084FC 0%, #A855F7 100%)',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
          },
        },
        outlined: {
          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
          '&:hover': {
            borderColor: '#A855F7',
            backgroundColor: 'rgba(168, 85, 247, 0.05)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.5)',
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A855F7',
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.8)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
          padding: '16px',
        },
        head: {
          fontWeight: 700,
          color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
        },
      },
    },
  },
});

export default getTheme;
