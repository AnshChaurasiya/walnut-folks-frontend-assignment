
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- USERS TABLE
-- =============================================================================
-- Stores user information and registration data
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- =============================================================================
-- CHART_DATA TABLE
-- =============================================================================
-- Stores user's customized chart data and dashboard preferences
CREATE TABLE IF NOT EXISTS public.chart_data (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    chart_data JSONB NOT NULL DEFAULT '{
        "daily_call_volume": [120, 132, 101, 134, 90, 230, 210],
        "call_sentiment": {
            "positive": 65,
            "neutral": 25,
            "negative": 10
        },
        "agent_performance": [
            {"name": "Agent A", "calls": 45, "satisfaction": 4.8},
            {"name": "Agent B", "calls": 38, "satisfaction": 4.6},
            {"name": "Agent C", "calls": 52, "satisfaction": 4.9},
            {"name": "Agent D", "calls": 41, "satisfaction": 4.7}
        ],
        "average_call_duration": [185, 190, 175, 188, 195, 182, 178],
        "conversion_rate": [68, 72, 65, 78, 81, 75, 73],
        "call_types": {
            "inbound": 60,
            "outbound": 40
        },
        "peak_hours": [
            {"hour": "9 AM", "calls": 45},
            {"hour": "10 AM", "calls": 38},
            {"hour": "11 AM", "calls": 52},
            {"hour": "2 PM", "calls": 41},
            {"hour": "3 PM", "calls": 49},
            {"hour": "4 PM", "calls": 35}
        ]
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chart_data_email ON public.chart_data(email);
CREATE INDEX IF NOT EXISTS idx_chart_data_updated_at ON public.chart_data(updated_at);

-- =============================================================================
-- TRANSACTIONS TABLE - REMOVED
-- =============================================================================
-- This table has been removed as transaction/webhook functionality is no longer needed
-- Keeping only users and chart_data tables for the chart data service

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================
-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_chart_data_updated_at BEFORE UPDATE ON public.chart_data
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Enable RLS on tables for security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chart_data ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON public.users
    FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update own data" ON public.users
    FOR UPDATE USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Chart data policies
CREATE POLICY "Users can view own chart data" ON public.chart_data
    FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can insert own chart data" ON public.chart_data
    FOR INSERT WITH CHECK (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update own chart data" ON public.chart_data
    FOR UPDATE USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Allow service role to access all data (for backend operations)
CREATE POLICY "Service role can access all users" ON public.users
    FOR ALL USING (current_setting('role') = 'service_role');

CREATE POLICY "Service role can access all chart data" ON public.chart_data
    FOR ALL USING (current_setting('role') = 'service_role');

-- =============================================================================
-- INSERT SAMPLE DATA
-- =============================================================================
-- Insert some sample data for testing
INSERT INTO public.users (email, first_name, last_name) VALUES
    ('demo@example.com', 'Demo', 'User'),
    ('test@walnut.com', 'Test', 'User')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.chart_data (email) VALUES
    ('demo@example.com'),
    ('test@walnut.com')
ON CONFLICT DO NOTHING;

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================
-- Run these queries to verify the schema was created successfully

-- Check if tables exist
SELECT schemaname, tablename, tableowner
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('users', 'chart_data');

-- Check table structures
\d public.users;
\d public.chart_data;

-- Check sample data
SELECT COUNT(*) as user_count FROM public.users;
SELECT COUNT(*) as chart_data_count FROM public.chart_data;
