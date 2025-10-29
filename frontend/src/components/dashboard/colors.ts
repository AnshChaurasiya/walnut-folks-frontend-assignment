import { DashboardColors } from './types';

// Elegant color palette - eye-relaxing and professional with dark mode support
export const getColors = (isDark: boolean): DashboardColors => ({
  primary: '#6366f1', // Soft indigo
  secondary: '#8b5cf6', // Soft purple
  success: '#10b981', // Soft emerald
  warning: '#f59e0b', // Soft amber
  error: '#ef4444', // Soft red
  background: isDark ? '#1a1a1a' : '#fafafa', // Very light gray / dark
  surface: isDark ? '#2d2d2d' : '#ffffff',
  text: isDark ? '#e5e7eb' : '#374151',
  textSecondary: isDark ? '#9ca3af' : '#6b7280',
  border: isDark ? '#404040' : '#e5e7eb',
  gradients: {
    primary: isDark 
      ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: isDark
      ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: isDark
      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    warm: isDark
      ? 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)'
      : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    cool: isDark
      ? 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    nature: isDark
      ? 'linear-gradient(135deg, #4b5563 0%, #6b7280 100%)'
      : 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  }
});