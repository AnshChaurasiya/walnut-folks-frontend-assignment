/**
 * Type definitions for the dashboard components
 */

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'PROCESSING' | 'PROCESSED' | 'FAILED';
  source: string;
  destination: string;
  created_at: string;
  processed_at?: string;
}

export interface ChartData {
  daily_call_volume: number[];
  average_call_duration: number[];
  call_sentiment: { positive: number; neutral: number; negative: number };
  agent_performance: Array<{ name: string; calls: number; rating: number }>;
  conversion_rate: number[];
}

export interface DashboardColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  gradients: {
    primary: string;
    secondary: string;
    success: string;
    warm: string;
    cool: string;
    nature: string;
  };
}

export interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  primary?: boolean;
}