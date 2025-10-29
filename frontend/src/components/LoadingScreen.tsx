import React from 'react'
import { motion } from 'framer-motion'
import { Box, Typography } from '@mui/material'

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        {/* Animated Logo/Icon */}
        <motion.div
          style={{
            width: 64,
            height: 64,
            margin: '0 auto 32px',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #10b981 0%, #0d9488 100%)',
              borderRadius: 1.5,
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              style={{ width: 32, height: 32, color: 'white' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </Box>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              fontWeight: 600, 
              color: 'text.primary',
              mb: 2
            }}
          >
            Call Analytics Dashboard
          </Typography>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Typography 
            variant="body1"
            sx={{ 
              color: 'text.secondary',
              mb: 4
            }}
          >
            Loading your analytics experience...
          </Typography>
        </motion.div>

        {/* Loading Animation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#10b981',
                borderRadius: '50%'
              }}
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default LoadingScreen