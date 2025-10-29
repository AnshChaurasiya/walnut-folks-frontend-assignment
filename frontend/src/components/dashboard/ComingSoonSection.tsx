import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { DashboardColors } from './types';

interface ComingSoonSectionProps {
  colors: DashboardColors;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({ 
  colors, 
  activeSection, 
  onNavigate 
}) => {
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'performance': return 'Advanced Performance Metrics Dashboard';
      case 'reports': return 'Detailed Reports & Business Insights';
      case 'security': return 'Security & Compliance Management';
      default: return 'Feature Under Development';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.gradients.cool,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Blur background effect */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          zIndex: 1,
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700,
            mb: 2,
            background: colors.gradients.primary,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            Coming Soon
          </Typography>
          <Typography variant="h6" sx={{ 
            color: colors.text,
            mb: 3,
            maxWidth: 500,
          }}>
            {getSectionTitle()}
          </Typography>
          <Typography variant="body1" sx={{ 
            color: colors.textSecondary,
            mb: 4,
            maxWidth: 400,
          }}>
            This section is under development. We're crafting an amazing experience for you.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate('dashboard')}
            sx={{
              background: colors.gradients.primary,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { 
                transform: 'translateY(-2px)', 
                transition: 'all 0.2s ease' 
              }
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ComingSoonSection;