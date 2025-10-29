# Walnut Folks - Frontend Dashboard Application

A modern, responsive dashboard application for call analytics and data management with real-time chart visualization, user authentication, and comprehensive data management capabilities.

## 🚀 Features

### Frontend Dashboard
- **📊 Interactive Charts**: Real-time visualization with Recharts (area, bar, pie charts)
- **👤 User Authentication**: Email-based login with session management
- **📈 Data Management**: Edit chart values with validation and confirmation dialogs
- **🎨 Modern UI**: Material-UI components with custom theming and animations
- **📱 Responsive Design**: Mobile-first approach with adaptive layouts
- **🔄 Real-time Updates**: Changes reflect immediately across dashboard sections
- **⏰ Auto-logout**: 30-minute inactivity timeout for security
- **💾 Data Persistence**: Automatic saving to Supabase database

### Backend API
- **⚡ FastAPI**: High-performance async API with automatic documentation
- **📊 Chart Data Management**: RESTful endpoints for chart data CRUD operations
- **🔐 Supabase Integration**: PostgreSQL database with real-time capabilities
- **✅ Type Safety**: Pydantic models for request/response validation
- **🛡️ Security**: CORS, input validation, and environment-based configuration
- **📝 API Documentation**: Auto-generated Swagger UI and ReDoc

### Analytics Sections
- **📞 Call Analytics**: Volume, duration, sentiment analysis, and conversion rates
- **👥 Agent Management**: Performance metrics and agent statistics
- **📋 Data Management**: Edit and customize all chart data values
- **⚙️ System Settings**: User preferences and account management
- **📊 Dashboard Overview**: Key metrics and quick navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Component library with theming
- **Recharts** - Declarative charting library
- **Framer Motion** - Smooth animations and transitions
- **React Three Fiber** - 3D background animations
- **Vite** - Fast build tool and dev server
- **Supabase JS** - Database client

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server for high performance
- **Pydantic** - Data validation and serialization
- **Supabase Python** - Database client
- **PostgreSQL** - Primary database via Supabase

### DevOps & Tools
- **Docker** - Containerization (optional)
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Prettier** - Code formatting
- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment

## 📁 Project Structure

```
walnut-folks-frontend-assignment/
├── frontend/                          # React TypeScript Application
│   ├── public/                       # Static assets
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── dashboard/           # Dashboard-specific components
│   │   │   │   ├── AgentManagement.tsx
│   │   │   │   ├── CallAnalytics.tsx
│   │   │   │   ├── ComingSoonSection.tsx
│   │   │   │   ├── DashboardOverview.tsx
│   │   │   │   ├── DataManagement.tsx
│   │   │   │   ├── SystemSettings.tsx
│   │   │   │   ├── colors.ts        # Theme colors
│   │   │   │   └── types.ts         # TypeScript interfaces
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── ModernLandingPage.tsx
│   │   │   ├── ProfessionalDashboard.tsx
│   │   │   └── ThreeBackground.tsx
│   │   ├── charts/                  # Chart components
│   │   │   ├── AgentPerformanceChart.tsx
│   │   │   ├── CallDurationAnalysisChart.tsx
│   │   │   ├── CallDurationChart.tsx
│   │   │   ├── CallSentimentChart.tsx
│   │   │   ├── ConversionRateChart.tsx
│   │   │   ├── DailyCallVolumeChart.tsx
│   │   │   └── SadPathAnalysisChart.tsx
│   │   ├── services/                # API service layer
│   │   │   └── api.ts
│   │   ├── supabase/                # Supabase configuration
│   │   │   ├── api.ts
│   │   │   └── client.ts
│   │   ├── utils/                   # Utility functions
│   │   ├── App.tsx                  # Main application component
│   │   ├── index.css                # Global styles
│   │   └── main.tsx                 # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                          # FastAPI Application
│   ├── api/
│   │   └── v1/
│   │       ├── routes.py            # API route definitions
│   │       └── chart_data.py        # Chart data endpoints
│   ├── core/
│   │   ├── config.py                # Application settings
│   │   ├── db.py                    # Database client
│   │   └── utils.py                 # Utility functions
│   ├── helper/
│   │   └── db_handler.py            # Database operations
│   ├── main.py                      # FastAPI application
│   ├── requirements.txt
│   └── vercel.json                  # Deployment config
│
└── README.md                         # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Supabase** account and project

### 1. Clone the Repository
```bash
git clone https://github.com/AnshChaurasiya/walnut-folks-frontend-assignment.git
cd walnut-folks-frontend-assignment
```

### 2. Setup Supabase Database
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:
```sql
-- Chart data table for user dashboard data
CREATE TABLE chart_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    chart_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX idx_chart_data_email ON chart_data(email);
```

3. Get your project credentials from Settings > API

### 3. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials:
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_KEY=your-anon-key
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# DEBUG=True

# Start the backend server
python main.py
# Or with uvicorn: uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📊 API Documentation

### Chart Data Endpoints

#### Get Chart Data
```http
GET /api/v1/chart-data/{email}
```
Returns chart data for a specific user email.

#### Save/Update Chart Data
```http
POST /api/v1/chart-data
Content-Type: application/json

{
  "email": "user@example.com",
  "chart_data": {
    "daily_call_volume": [10, 15, 20, 25, 30, 35, 40],
    "average_call_duration": [5, 7, 6, 8, 9, 7, 6],
    "call_sentiment": {"positive": 60, "neutral": 25, "negative": 15},
    "agent_performance": [
      {"name": "Alice", "calls": 45, "rating": 4.8},
      {"name": "Bob", "calls": 38, "rating": 4.6}
    ],
    "conversion_rate": [15, 18, 22, 19, 25, 21, 23]
  }
}
```

### Testing the API
```bash
# Get chart data
curl "http://localhost:8000/api/v1/chart-data/user@example.com"

# Save chart data
curl -X POST "http://localhost:8000/api/v1/chart-data" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "chart_data": {...}}'
```

## 🎨 Dashboard Features

### Data Management
- **Edit Chart Values**: Modify daily call volumes, sentiment percentages, agent performance
- **Validation**: Input validation with user-friendly error messages
- **Confirmation Dialogs**: Prevent accidental data overwrites
- **Real-time Updates**: Changes immediately reflect in analytics charts

### User Experience
- **Email Authentication**: Simple email-based login system
- **Session Management**: Persistent sessions with auto-logout
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: Comprehensive error messages and recovery

### Analytics Visualization
- **Daily Call Volume**: 7-day trend with area chart
- **Call Duration**: Average duration analysis
- **Sentiment Analysis**: Pie chart showing positive/neutral/negative calls
- **Agent Performance**: Bar chart with call counts and ratings
- **Conversion Rates**: Trend analysis over time

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
cd frontend
npm install -g vercel
vercel --prod
```

### Backend Deployment (Railway)
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Backend Deployment (Render)
1. Connect repository to Render
2. Use these build settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🔧 Development

### Frontend Scripts
```bash
cd frontend

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

### Backend Scripts
```bash
cd backend

# Development server
python main.py

# With auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with React and TypeScript rules
- **Prettier**: Consistent code formatting
- **PEP 8**: Python code style compliance

## 🧪 Testing

### Manual Testing Checklist
- [ ] Email validation and login flow
- [ ] Chart data loading and display
- [ ] Data management editing functionality
- [ ] Real-time updates between sections
- [ ] Responsive design on different screen sizes
- [ ] Session persistence and auto-logout
- [ ] Error handling and user feedback

### API Testing
```bash
# Test all endpoints with different scenarios
# Verify error responses and validation
# Test concurrent requests and data consistency
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript and Python best practices
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed
- Maintain code style consistency

## 📝 Environment Variables

### Backend (.env)
```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Settings
DEBUG=True
```

### Frontend
The frontend automatically connects to the backend API. Update the API base URL in `src/services/api.ts` if needed.

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Verify Supabase credentials in `.env`
   - Check if backend server is running on port 8000
   - Ensure CORS is properly configured

2. **Chart Data Not Loading**
   - Verify database table exists in Supabase
   - Check user email format and validation
   - Review browser console for API errors

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies are installed

4. **Session Issues**
   - Clear browser localStorage
   - Check auto-logout timing (30 minutes)
   - Verify email validation logic

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Acknowledgments

- **Material-UI** for the component library
- **Recharts** for charting capabilities
- **Supabase** for backend services
- **FastAPI** for the Python framework
- **Framer Motion** for animations

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using React, TypeScript, FastAPI, and Supabase**
