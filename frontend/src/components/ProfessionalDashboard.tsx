import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  LinearProgress,
  Fab,
  Menu,
  MenuItem,
  Tooltip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// Icons
import {
  Menu as MenuIcon,
  Dashboard,
  Analytics,
  Payment,
  Settings,
  Person,
  TrendingUp,
  Schedule,
  Add,
  MoreVert,
  Refresh,
  Download,
  Security,
  Group,
  Assessment,
  DarkMode,
  LightMode,
  ManageAccounts,
} from '@mui/icons-material';

import { AnimatePresence } from 'framer-motion';
import { saveUserChartData } from '../services/api';

// Import dashboard components
import { getColors } from './dashboard/colors';
import { NavigationItem, Transaction, ChartData, SnackbarState } from './dashboard/types';
import DashboardOverview from './dashboard/DashboardOverview';
import CallAnalytics from './dashboard/CallAnalytics';
import AgentManagement from './dashboard/AgentManagement';
import DataManagement from './dashboard/DataManagement';
import SystemSettings from './dashboard/SystemSettings';
import ComingSoonSection from './dashboard/ComingSoonSection';

const drawerWidth = 280;

interface ProfessionalDashboardProps {
  userEmail: string;
  chartData: ChartData | null;
  isExistingUser: boolean;
  onLogout: () => void;
}

const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({ 
  userEmail: propUserEmail, 
  chartData: propChartData, 
  isExistingUser: propIsExistingUser,
  onLogout 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(propChartData);
  const [userEmail, setUserEmail] = useState(propUserEmail);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Handle dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.style.background = '#1a1a1a';
    } else {
      document.body.style.background = '#fafafa';
    }
  }, [darkMode]);

  // Get current color scheme
  const colors = getColors(darkMode);

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Generate sample transactions
      setTransactions([
        {
          id: 'txn_abc123def456',
          amount: 1500,
          currency: 'INR',
          status: 'PROCESSED',
          source: 'acc_user_789',
          destination: 'acc_merchant_456',
          created_at: new Date().toISOString(),
          processed_at: new Date().toISOString(),
        },
        {
          id: 'txn_def456ghi789',
          amount: 750,
          currency: 'USD',
          status: 'PROCESSING',
          source: 'acc_user_123',
          destination: 'acc_merchant_789',
          created_at: new Date().toISOString(),
        },
        {
          id: 'txn_ghi789jkl012',
          amount: 2200,
          currency: 'EUR',
          status: 'PROCESSED',
          source: 'acc_user_456',
          destination: 'acc_merchant_123',
          created_at: new Date().toISOString(),
          processed_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      showSnackbar('Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!userEmail?.includes('@')) {
      showSnackbar('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    try {
      localStorage.setItem('userEmail', userEmail);
      const response = await fetch(`https://walnut-folks-frontend-assignment-backend.onrender.com/api/v1/chart-data/${encodeURIComponent(userEmail)}`);
      if (response.ok) {
        const data = await response.json();
        setChartData(data.data);
        setEmailDialogOpen(false);
        showSnackbar('Welcome! Your dashboard is ready.', 'success');
      }
    } catch (error) {
      console.error('Error saving email:', error);
      showSnackbar('Error setting up your dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChartData = async () => {
    if (!chartData || !userEmail) {
      showSnackbar('No data to save', 'error');
      return;
    }

    setLoading(true);
    try {
      const success = await saveUserChartData(userEmail, chartData);
      if (success) {
        showSnackbar('Chart data saved successfully!', 'success');
      } else {
        showSnackbar('Failed to save chart data', 'error');
      }
    } catch (error) {
      console.error('Error saving chart data:', error);
      showSnackbar('Error saving chart data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateChartData = (newData: ChartData) => {
    setChartData(newData);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Navigation items with professional sections
  const navigationItems: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: Dashboard, primary: true },
    { id: 'analytics', label: 'Call Analytics', icon: Analytics, primary: true },
    { id: 'agents', label: 'Agent Management', icon: Group, primary: true },
    { id: 'datamanagement', label: 'Data Management', icon: ManageAccounts, primary: true },
    { id: 'performance', label: 'Performance Metrics', icon: TrendingUp },
    { id: 'reports', label: 'Reports & Insights', icon: Assessment },
    { id: 'security', label: 'Security & Compliance', icon: Security },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  // Sidebar drawer content
  const drawer = (
    <Box sx={{ height: '100%', background: colors.gradients.cool }}>
      <List sx={{ px: 2, py: 3 }}>
        {navigationItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                background: activeSection === item.id 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'transparent',
                backdropFilter: activeSection === item.id ? 'blur(10px)' : 'none',
                border: activeSection === item.id 
                  ? `1px solid rgba(255, 255, 255, 0.3)` 
                  : '1px solid transparent',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease',
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: item.primary ? colors.primary : colors.textSecondary,
                minWidth: 40,
              }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ 
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                    fontWeight: item.primary ? 600 : 400,
                    color: colors.text,
                  }
                }}
              />
              {item.primary && (
                <Chip 
                  size="small" 
                  label="Core" 
                  sx={{ 
                    background: colors.gradients.primary,
                    color: 'white',
                    fontSize: '0.7rem',
                  }} 
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* User profile section */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        p: 2,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${colors.border}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ 
            width: 40, 
            height: 40, 
            background: colors.gradients.secondary,
            mr: 2,
          }}>
            {userEmail ? userEmail[0].toUpperCase() : 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Tooltip title={userEmail || 'Guest User'} placement="top">
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.text }}>
                {(userEmail || 'Guest User').length > 20 
                  ? (userEmail || 'Guest User').substring(0, 20) + '...' 
                  : (userEmail || 'Guest User')}
              </Typography>
            </Tooltip>
            <Typography variant="caption" sx={{ color: colors.textSecondary }}>
              Premium Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  // Main content based on active section
  const renderMainContent = () => {
    switch (activeSection) {

      case 'analytics':
        return (
          <CallAnalytics 
            colors={colors}
            chartData={chartData}
            loading={loading}
            onSaveChartData={handleSaveChartData}
          />
        );

      case 'agents':
        return (
          <AgentManagement 
            colors={colors}
            chartData={chartData}
            onNavigate={setActiveSection}
            onShowSnackbar={showSnackbar}
          />
        );

      case 'datamanagement':
        return (
          <DataManagement 
            colors={colors}
            chartData={chartData}
            userEmail={userEmail}
            loading={loading}
            onSaveChartData={handleSaveChartData}
            onUpdateChartData={handleUpdateChartData}
            onShowSnackbar={showSnackbar}
          />
        );

      case 'settings':
        return (
          <SystemSettings 
            colors={colors}
            userEmail={userEmail}
            loading={loading}
            onLogout={onLogout}
            onRefreshData={loadDashboardData}
          />
        );

      case 'performance':
      case 'reports':
      case 'security':
        return (
          <ComingSoonSection 
            colors={colors}
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
        );

      default:
        return (
          <DashboardOverview 
            colors={colors}
            transactions={transactions}
            chartData={chartData}
            loading={loading}
            onNavigate={setActiveSection}
            onRefreshData={loadDashboardData}
          />
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: colors.background }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          color: colors.text,
          boxShadow: 'none',
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {navigationItems.find(item => item.id === activeSection)?.label}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {loading && <LinearProgress sx={{ width: 100, mr: 2 }} />}
            
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{ color: colors.primary }}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            
            <IconButton
              onClick={() => setEmailDialogOpen(true)}
              sx={{ color: colors.primary }}
            >
              <Person />
            </IconButton>
            
            <IconButton
              onClick={(e: any) => setAnchorEl(e.currentTarget)}
              sx={{ color: colors.primary }}
            >
              <MoreVert />
            </IconButton>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setEmailDialogOpen(true)}>
                <Person sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={loadDashboardData}>
                <Refresh sx={{ mr: 1 }} /> Refresh
              </MenuItem>
              <MenuItem>
                <Download sx={{ mr: 1 }} /> Export Data
              </MenuItem>
              <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
                <Person sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <AnimatePresence mode="wait">
          {renderMainContent()}
        </AnimatePresence>
      </Box>

      {/* Email Dialog */}
      <Dialog 
        open={emailDialogOpen} 
        onClose={() => setEmailDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          background: colors.gradients.primary,
          color: 'white',
          textAlign: 'center',
        }}>
          User Profile
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 3, color: colors.textSecondary }}>
            Your account information and preferences.
          </Typography>
          <TextField
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={userEmail}
            disabled={true}
            sx={{ 
              mb: 2,
              '& .MuiInputBase-input': {
                color: colors.text,
              },
              '& .MuiInputLabel-root': {
                color: colors.textSecondary,
              }
            }}
          />
          <Typography variant="caption" sx={{ color: colors.textSecondary, mb: 2, display: 'block' }}>
            Email address cannot be changed. To use a different email, please logout and sign in again.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEmailDialogOpen(false)}>Close</Button>
          <Button 
            onClick={onLogout} 
            variant="contained"
            sx={{ 
              background: colors.gradients.primary,
              '&:hover': {
                background: colors.gradients.secondary,
              }
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: colors.gradients.secondary,
          '&:hover': { transform: 'scale(1.1)', transition: 'all 0.2s ease' }
        }}
        onClick={() => setActiveSection('datamanagement')}
      >
        <ManageAccounts />
      </Fab>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfessionalDashboard;