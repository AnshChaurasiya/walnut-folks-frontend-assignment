# Call Analytics Dashboard - Frontend

A modern, responsive React TypeScript dashboard for call analytics with a clean design inspired by SuperBryn. Features interactive charts, user authentication, and real-time data visualization.

## Features

- 🎨 **Modern Design** inspired by SuperBryn's aesthetic
- 📊 **Interactive Charts** with Recharts
- 🔒 **User Authentication** with email capture
- 💾 **Data Persistence** with Supabase
- 📱 **Responsive Design** mobile-first approach
- ✨ **Smooth Animations** with Framer Motion
- 🎯 **3D Background** with Three.js
- 🎨 **Tailwind CSS** for styling
- 📈 **Real-time Updates** and chart editing

## Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Material UI components
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Backend**: Supabase (PostgreSQL + Real-time)
- **Deployment**: Vercel

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── EmailModal.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ThreeBackground.tsx
│   │   └── EditChartModal.tsx
│   ├── pages/              # Page components
│   │   └── Dashboard.tsx
│   ├── charts/             # Chart components
│   │   ├── DailyCallVolumeChart.tsx
│   │   ├── CallSentimentChart.tsx
│   │   ├── AgentPerformanceChart.tsx
│   │   ├── CallDurationChart.tsx
│   │   └── ConversionRateChart.tsx
│   ├── supabase/           # Database integration
│   │   ├── client.ts       # Supabase client setup
│   │   └── api.ts          # Database operations
│   ├── App.tsx             # Main application
│   └── main.tsx            # Application entry point
└── public/                 # Static assets
```

## Quick Start

### 1. Setup Environment

```bash
# Navigate to frontend directory
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Setup Supabase Database

Create the chart data table in your Supabase project:

```sql
-- Chart data table for user analytics
CREATE TABLE chart_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    chart_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX idx_chart_data_email ON chart_data(email);
```

### 4. Run Development Server

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## Features Overview

### 📊 Dashboard Charts

1. **Daily Call Volume** - Editable line chart showing daily call counts
2. **Call Sentiment Analysis** - Pie chart with positive/neutral/negative breakdown
3. **Agent Performance** - Bar chart showing calls handled by each agent
4. **Average Call Duration** - Line chart of call duration trends
5. **Conversion Rate** - Area chart showing conversion percentages

### 🔒 User Authentication

- Email-based user identification
- Automatic account creation for new users
- Data persistence and retrieval for returning users
- Confirmation dialog for data overwrites

### 🎨 Design Philosophy

Inspired by SuperBryn's aesthetic:
- Clean, minimal interface
- Soft color palette with accent color `#95ffd2`
- Smooth animations and transitions
- Glass morphism effects
- Responsive grid layouts

### ✨ Interactive Features

- **Chart Editing**: Users can edit daily call volume data
- **Real-time Updates**: Charts update immediately after data changes
- **Smooth Animations**: Page transitions and loading states
- **3D Background**: Subtle floating particles for visual depth

## Chart Data Structure

```typescript
interface ChartData {
  daily_call_volume: number[]           // [50, 70, 90, 65, 80, 75, 95]
  average_call_duration: number[]      // [120, 135, 110, 145, 130, 125, 140]
  call_sentiment: {
    positive: number                    // 60
    neutral: number                     // 25
    negative: number                    // 15
  }
  agent_performance: Array<{
    name: string                        // "Agent A"
    calls: number                       // 45
    rating: number                      // 4.5
  }>
  conversion_rate: number[]             // [12.5, 15.2, 11.8, 14.7, 13.9, 16.1, 15.8]
}
```

## Supabase Integration

### Database Operations

```typescript
// Get user's chart data
const userData = await getUserChartData(email)

// Save chart data
const success = await saveUserChartData(email, chartData)

// Get data with defaults
const { data, isExisting } = await getChartDataWithDefaults(email)
```

### Real-time Features

- Automatic data synchronization
- Optimistic UI updates
- Error handling with retry logic
- Loading states and skeleton UI

## Customization

### Theme Colors

```css
:root {
  --accent-color: #95ffd2;    /* Primary accent */
  --primary-dark: #1a1a1a;    /* Dark text */
  --primary-light: #f8fafc;   /* Light background */
  --text-primary: #111827;    /* Main text */
  --text-secondary: #6b7280;  /* Secondary text */
}
```

### Adding New Charts

1. Create chart component in `src/charts/`
2. Import and add to Dashboard component
3. Update chart data interface if needed
4. Add to edit modal if editable

Example:
```typescript
// src/charts/NewChart.tsx
import React from 'react'
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

interface NewChartProps {
  data: number[]
}

const NewChart: React.FC<NewChartProps> = ({ data }) => {
  // Chart implementation
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={transformedData}>
        {/* Chart configuration */}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default NewChart
```

## Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Configure Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**:
```bash
vercel --prod
```

### Manual Deployment

```bash
# Build the project
npm run build

# The built files will be in the `dist` directory
# Upload these files to your hosting provider
```

### Environment Variables for Production

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Performance Optimization

### Bundle Size
- Tree shaking enabled
- Dynamic imports for large components
- Optimized asset loading

### Runtime Performance
- React.memo for expensive components
- useCallback for event handlers
- Lazy loading for charts
- Optimistic UI updates

### Loading States
- Skeleton screens
- Progressive loading
- Error boundaries
- Retry mechanisms

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support

## Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint + Prettier for formatting
- Functional components with hooks
- Custom hooks for reusable logic

### Component Structure
```typescript
interface ComponentProps {
  // Props interface
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Hooks
  // Event handlers
  // Render logic
  
  return (
    // JSX
  )
}

export default Component
```

### State Management
- useState for local component state
- Context API for global state (if needed)
- Supabase for persistent data
- React Query for API state (future enhancement)

## Troubleshooting

### Common Issues

1. **Supabase Connection Errors**
   ```bash
   # Check environment variables
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_ANON_KEY
   ```

2. **Chart Not Rendering**
   - Verify data format matches chart expectations
   - Check browser console for errors
   - Ensure Recharts is properly installed

3. **Build Errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **TypeScript Errors**
   ```bash
   # Run type checking
   npm run type-check
   ```

### Performance Issues

1. **Slow Loading**
   - Enable code splitting
   - Optimize images
   - Use React.lazy for large components

2. **Memory Leaks**
   - Clean up event listeners
   - Cancel pending requests
   - Proper cleanup in useEffect

## Testing

### Unit Testing (Future Enhancement)
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test
```

### E2E Testing (Future Enhancement)
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-chart`
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Roadmap

- [ ] Add more chart types
- [ ] Implement dark mode
- [ ] Add export functionality
- [ ] Real-time data updates
- [ ] Multi-user collaboration
- [ ] Advanced filtering
- [ ] Custom dashboard layouts

## License

MIT License - see LICENSE file for details.