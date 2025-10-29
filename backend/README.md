# Chart Data Service - Backend

A production-ready FastAPI backend service for managing chart data with Supabase integration.

## Features

- ⚡ **FastAPI** with async/await support
- 📊 **Supabase** database integration
- 📝 **Versioned API** architecture (v1, v2)
- ✅ **Type Safety** with Pydantic models
- 🛡️ **Security** best practices

## Project Structure

```
backend/
├── main.py                      # FastAPI application entry point
├── api/                         # API routes
│   ├── v1/                     # Version 1 endpoints
│   │   ├── routes.py           # Route registration
│   │   └── chart_data.py       # Chart data endpoints
│   └── v2/                     # Version 2 endpoints (future)
├── core/                        # Core configuration
│   ├── config.py               # Settings management
│   ├── db.py                   # Database client
│   └── utils.py                # Utility functions
└── helper/                      # Business logic
    └── db_handler.py
```

## Quick Start

### 1. Setup Environment

```bash
# Clone the repository
cd chart-data-service/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your Supabase credentials
```

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Settings
DEBUG=True
```

### 3. Setup Supabase Database

Create these tables in your Supabase project:

```sql
-- Chart data table (for frontend)
CREATE TABLE chart_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    chart_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_chart_data_email ON chart_data(email);
```

### 4. Run the Application

```bash
# Development server
python main.py

# Or with uvicorn directly
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be available at:
- **API Documentation**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Chart Data
```http
GET /api/v1/chart-data/{email}
```

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

## Testing the API

```bash
# Get chart data for a user
curl "http://localhost:8000/api/v1/chart-data/user@example.com"

# Save chart data for a user
curl -X POST "http://localhost:8000/api/v1/chart-data" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Create `vercel.json`:
```json
{
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

3. Deploy:
```bash
vercel --prod
```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically on push

### Render Deployment

1. Connect repository to Render
2. Use these build settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Architecture Decisions

### Database Design
- Uses Supabase PostgreSQL for reliability
- Proper indexing for performance
- JSONB for flexible chart data storage

### Error Handling
- Global exception handlers
- Proper HTTP status codes
- Detailed error responses for debugging

### Security
- Input validation with Pydantic
- SQL injection prevention
- CORS configuration
- Environment variable protection

## Performance Considerations

- **Async Processing**: Non-blocking API requests
- **Database Indexing**: Optimized queries
- **Connection Pooling**: Efficient database connections

## Monitoring and Logging

- Request timing middleware
- Process time headers
- Error logging with context

## Development

### Code Style
- PEP 8 compliance
- Type hints throughout
- Comprehensive docstrings
- Modular architecture

### Testing
```bash
# Run tests (when implemented)
pytest

# Type checking
mypy .

# Linting
flake8 .
```

## Troubleshooting

### Common Issues

1. **Supabase Connection Errors**
   - Verify SUPABASE_URL and SUPABASE_KEY
   - Check network connectivity
   - Ensure database tables exist

2. **Slow API Responses**
   - Monitor database query performance
   - Verify async/await usage

3. **Import Errors**
   - Ensure virtual environment is activated
   - Verify all dependencies are installed
   - Check Python path configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_KEY` | Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key | Optional |
| `DEBUG` | Enable debug mode | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.