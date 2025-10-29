import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Grid,
  Card,
  CardContent,
  Avatar,
  Fab
} from '@mui/material'
import {
  Email,
  Analytics,
  TrendingUp,
  Security,
  Speed,
  CheckCircle,
  ArrowForward,
  Dashboard as DashboardIcon
} from '@mui/icons-material'

interface ModernLandingPageProps {
  onEmailSubmit: (email: string) => void
  isLoading: boolean
}

const ModernLandingPage: React.FC<ModernLandingPageProps> = ({ onEmailSubmit, isLoading }) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)

  // Enhanced email validation
  const validateEmail = (email: string): boolean => {
    // Check for basic email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    // Additional checks
    const hasAtSymbol = email.includes('@')
    const hasDot = email.includes('.')
    const hasValidLength = email.length >= 5 && email.length <= 254
    const hasValidDomain = email.split('@')[1]?.length >= 3
    const noConsecutiveDots = !email.includes('..')
    const noStartEndDots = !email.startsWith('.') && !email.endsWith('.')
    
    return emailRegex.test(email) && 
           hasAtSymbol && 
           hasDot && 
           hasValidLength && 
           hasValidDomain && 
           noConsecutiveDots && 
           noStartEndDots
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().trim()
    setEmail(value)
    
    if (value === '') {
      setEmailError('')
      setIsValidEmail(false)
      return
    }
    
    if (value.length < 3) {
      setEmailError('Email is too short')
      setIsValidEmail(false)
      return
    }
    
    if (!value.includes('@')) {
      setEmailError('Please enter a valid email address with @ symbol')
      setIsValidEmail(false)
      return
    }
    
    if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address (e.g., user@example.com)')
      setIsValidEmail(false)
      return
    }
    
    setEmailError('')
    setIsValidEmail(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidEmail && !isLoading) {
      onEmailSubmit(email)
    }
  }

  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Advanced Analytics',
      description: 'Get deep insights into your call performance with real-time data visualization'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#3b82f6' }} />,
      title: 'Performance Tracking',
      description: 'Monitor agent performance and conversion rates with detailed metrics'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#8b5cf6' }} />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#f59e0b' }} />,
      title: 'Real-time Updates',
      description: 'Get instant notifications and live data updates as they happen'
    }
  ]

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              borderRadius: '50%',
              background: 'white',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ pt: 4, pb: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  background: 'linear-gradient(45deg, #10b981 0%, #059669 100%)',
                  mr: 2
                }}
              >
                <DashboardIcon sx={{ fontSize: 30, color: 'white' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
                VoiceAI Analytics
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, mx: 'auto' }}>
              Professional Voice Agent Analytics Platform
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={6} alignItems="center" sx={{ py: 6 }}>
          {/* Left Side - Hero Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'white', 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Transform Your
                <br />
                <Box component="span" sx={{ color: '#10b981' }}>
                  Voice Analytics
                </Box>
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  mb: 4, 
                  lineHeight: 1.6,
                  maxWidth: 500
                }}
              >
                Get powerful insights from your voice agent interactions with real-time analytics, 
                performance tracking, and intelligent reporting.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <Chip 
                  label="Real-time Analytics" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600 
                  }} 
                />
                <Chip 
                  label="Performance Tracking" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600 
                  }} 
                />
                <Chip 
                  label="Smart Insights" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600 
                  }} 
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Email Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      background: 'linear-gradient(45deg, #10b981 0%, #0d9488 100%)'
                    }}
                  >
                    <Email sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                    Get Started
                  </Typography>
                  
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Enter your email to access your personalized analytics dashboard
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Work Email Address"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError || (isValidEmail ? '✓ Valid email address' : 'Enter your professional email')}
                    placeholder="john@company.com"
                    autoComplete="email"
                    autoFocus
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                      '& .MuiFormHelperText-root': {
                        color: isValidEmail ? '#10b981' : emailError ? '#ef4444' : '#64748b'
                      }
                    }}
                    InputProps={{
                      endAdornment: isValidEmail && (
                        <CheckCircle sx={{ color: '#10b981', mr: 1 }} />
                      )
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!isValidEmail || isLoading}
                    sx={{
                      py: 2,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(45deg, #10b981 0%, #0d9488 100%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #059669 0%, #0f766e 100%)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: '#94a3b8',
                      },
                      transition: 'all 0.3s ease',
                      mb: 3
                    }}
                    endIcon={
                      isLoading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <ArrowForward />
                      )
                    }
                  >
                    {isLoading ? 'Setting up your dashboard...' : 'Access Dashboard'}
                  </Button>
                </Box>

                <Alert 
                  severity="info" 
                  sx={{ 
                    bgcolor: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    '& .MuiAlert-icon': { color: '#10b981' }
                  }}
                >
                  <Typography variant="body2">
                    <strong>New user?</strong> Your account will be created automatically.
                    <br />
                    <strong>Returning user?</strong> Your saved data will be loaded instantly.
                  </Typography>
                </Alert>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography 
              variant="h3" 
              sx={{ 
                textAlign: 'center', 
                color: 'white', 
                fontWeight: 700, 
                mb: 2 
              }}
            >
              Why Choose VoiceAI Analytics?
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                textAlign: 'center', 
                color: 'rgba(255,255,255,0.8)', 
                mb: 6,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Everything you need to optimize your voice agent performance
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: 3,
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Box sx={{ mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Box>
      </Container>

      {/* Floating Action Button */}
      <Fab
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(45deg, #10b981 0%, #0d9488 100%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #059669 0%, #0f766e 100%)',
          }
        }}
        onClick={() => {
          const formElement = document.querySelector('form')
          formElement?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        <ArrowForward sx={{ color: 'white' }} />
      </Fab>
    </Box>
  )
}

export default ModernLandingPage