import React, { useState, useEffect } from 'react';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ModernLandingPage from './components/ModernLandingPage';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Soft indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#8b5cf6', // Soft purple
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#fafafa', // Very light gray
      paper: '#ffffff',
    },
    text: {
      primary: '#374151', // Dark gray
      secondary: '#6b7280', // Medium gray
    },
    success: {
      main: '#10b981', // Soft emerald
    },
    warning: {
      main: '#f59e0b', // Soft amber
    },
    error: {
      main: '#ef4444', // Soft red
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
  },
});

interface AppState {
  userEmail: string | null;
  chartData: any;
  isExistingUser: boolean;
  showLandingPage: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    userEmail: null,
    chartData: null,
    isExistingUser: false,
    showLandingPage: true,
    isLoading: true,
    error: null,
    lastActivity: Date.now(),
  });

  // Auto-logout after 30 minutes of inactivity
  const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

  // Enhanced email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && 
           email.includes('@') && 
           email.includes('.') && 
           email.length >= 5 && 
           email.length <= 254 &&
           !email.includes('..') &&
           !email.startsWith('.') &&
           !email.endsWith('.');
  };

  // Load user session on app start
  useEffect(() => {
    const initializeApp = async () => {
      console.log('Initializing application...');
      
      try {
        // Check for saved user session
        const savedEmail = localStorage.getItem('userEmail');
        const savedTimestamp = localStorage.getItem('userLoginTime');
        const currentTime = Date.now();
        
        if (savedEmail && savedTimestamp && validateEmail(savedEmail)) {
          const loginTime = Number.parseInt(savedTimestamp);
          const timeElapsed = currentTime - loginTime;
          
          // Check if session is still valid (within 30 minutes)
          if (timeElapsed < AUTO_LOGOUT_TIME) {
            console.log('Valid session found:', savedEmail);
            
            // Load user's chart data
            try {
              const response = await fetch(`https://walnut-folks-frontend-assignment-backend.onrender.com/api/v1/chart-data/${encodeURIComponent(savedEmail)}`);
              if (response.ok) {
                const result = await response.json();
                setState(prev => ({
                  ...prev,
                  userEmail: savedEmail,
                  chartData: result.data,
                  isExistingUser: result.is_existing,
                  showLandingPage: false,
                  isLoading: false,
                  lastActivity: currentTime,
                }));
                
                // Update activity timestamp
                localStorage.setItem('userLoginTime', currentTime.toString());
                console.log('User session restored successfully');
                return;
              }
            } catch (error) {
              console.error('Error loading user data:', error);
            }
          } else {
            console.log('Session expired, logging out');
            handleLogout();
          }
        }
        
        // No valid session, show landing page
        setState(prev => ({
          ...prev,
          showLandingPage: true,
          isLoading: false
        }));
        
      } catch (error) {
        console.error('App initialization failed:', error);
        setState(prev => ({
          ...prev,
          error: 'Failed to initialize app',
          showLandingPage: true,
          isLoading: false
        }));
      }
    };

    initializeApp();
  }, []);

  // Activity tracking for auto-logout
  useEffect(() => {
    const updateActivity = () => {
      const currentTime = Date.now();
      setState(prev => ({ ...prev, lastActivity: currentTime }));
      if (state.userEmail) {
        localStorage.setItem('userLoginTime', currentTime.toString());
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Check for inactivity every minute
    const inactivityChecker = setInterval(() => {
      if (state.userEmail) {
        const currentTime = Date.now();
        const timeInactive = currentTime - state.lastActivity;
        
        if (timeInactive > AUTO_LOGOUT_TIME) {
          console.log('Auto-logout due to inactivity');
          handleLogout();
        }
      }
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(inactivityChecker);
    };
  }, [state.userEmail, state.lastActivity]);

  const handleEmailSubmit = async (email: string) => {
    if (!validateEmail(email)) {
      setState(prev => ({ 
        ...prev, 
        error: 'Please enter a valid email address (e.g., user@example.com)' 
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('Processing login for:', email);
      
      // Save session data
      const currentTime = Date.now();
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userLoginTime', currentTime.toString());
      
      // Load user's chart data
      const response = await fetch(`https://walnut-folks-frontend-assignment-backend.onrender.com/api/v1/chart-data/${encodeURIComponent(email)}`);
      if (response.ok) {
        const result = await response.json();
        
        // If this is a new user, save the default data to the database
        if (!result.is_existing) {
          console.log('New user detected, saving default chart data...');
          try {
            const saveResponse = await fetch(`https://walnut-folks-frontend-assignment-backend.onrender.com/api/v1/chart-data`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                chart_data: result.data
              })
            });
            
            if (saveResponse.ok) {
              await saveResponse.json();
              console.log('Default chart data saved for new user');
            } else {
              console.warn('Failed to save default chart data');
            }
          } catch (saveError) {
            console.error('Error saving default chart data:', saveError);
          }
        }
        
        setState(prev => ({
          ...prev,
          userEmail: email,
          chartData: result.data,
          isExistingUser: result.is_existing,
          showLandingPage: false,
          isLoading: false,
          lastActivity: currentTime,
        }));
        
        console.log('Login successful');
      } else {
        throw new Error('Failed to load user data');
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to load user data. Please try again.',
        isLoading: false
      }));
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userLoginTime');
    setState({
      userEmail: null,
      chartData: null,
      isExistingUser: false,
      showLandingPage: true,
      isLoading: false,
      error: null,
      lastActivity: Date.now(),
    });
  };

  const handleCloseError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  // Loading screen
  if (state.isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <LoadingScreen />
        </Box>
      </ThemeProvider>
    );
  }

  // Landing page
  if (state.showLandingPage) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModernLandingPage 
          onEmailSubmit={handleEmailSubmit}
          isLoading={state.isLoading}
        />
        <Snackbar 
          open={!!state.error} 
          autoHideDuration={6000} 
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {state.error}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }

  // Dashboard
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfessionalDashboard 
        userEmail={state.userEmail!}
        chartData={state.chartData}
        isExistingUser={state.isExistingUser}
        onLogout={handleLogout}
      />
      <Snackbar 
        open={!!state.error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {state.error}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;