import { createClient } from '@supabase/supabase-js'

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
})

// Database table names (should match backend configuration)
export const TABLES = {
  CHART_DATA: 'chart_data',
} as const

// Type definitions for database records
export interface ChartData {
  id?: string
  email: string
  chart_data: {
    daily_call_volume: number[]
    average_call_duration: number[]
    call_sentiment: {
      positive: number
      neutral: number
      negative: number
    }
    agent_performance: Array<{
      name: string
      calls: number
      rating: number
    }>
    conversion_rate: number[]
  }
  created_at?: string
  updated_at?: string
}

// Default chart data for new users
export const DEFAULT_CHART_DATA = {
  daily_call_volume: [50, 70, 90, 65, 80, 75, 95],
  average_call_duration: [120, 135, 110, 145, 130, 125, 140],
  call_sentiment: {
    positive: 60,
    neutral: 25,
    negative: 15,
  },
  agent_performance: [
    { name: 'Agent A', calls: 45, rating: 4.5 },
    { name: 'Agent B', calls: 38, rating: 4.2 },
    { name: 'Agent C', calls: 52, rating: 4.8 },
    { name: 'Agent D', calls: 41, rating: 4.3 },
  ],
  conversion_rate: [12.5, 15.2, 11.8, 14.7, 13.9, 16.1, 15.8],
}