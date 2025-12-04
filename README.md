# Legal Advisory Platform

A comprehensive full-stack legal advisory platform for Indian Constitution, landmark cases, and legal procedures. Built with Next.js, FastAPI, and PostgreSQL.

![Legal Advisory Platform](https://img.shields.io/badge/Status-In%20Development-yellow)
![Next.js](https://img.shields.io/badge/Next.js-14.1-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

## 🌟 Features

### Phase 1 (MVP) - Current
- ✅ **AI-Powered Chatbot**: Intelligent legal assistant for constitutional queries
- ✅ **Legal Library**: Browse 100+ Constitution articles with advanced search
- ✅ **Landmark Cases**: Explore important case laws with detailed analysis
- ✅ **Legal Procedures**: Step-by-step guides for legal processes
- ✅ **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ✅ **RESTful API**: FastAPI backend with comprehensive endpoints

### Phase 2 (Planned)
- 🔄 User Authentication (Email/OAuth)
- 🔄 Save Queries & Bookmarks
- 🔄 Document Generator
- 🔄 Legal News & Updates
- 🔄 Lawyer Directory
- 🔄 Community Forum

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy
- **Cache**: Redis
- **API Docs**: OpenAPI/Swagger

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: Render.com (free tier available)
- **Version Control**: Git

## 📁 Project Structure

```
legal-advisory-platform/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── lib/             # API client, utilities
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   └── styles/          # Global styles
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Config, database
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   └── main.py         # FastAPI app
│   ├── data/               # JSON data
│   ├── scripts/            # Migration scripts
│   └── requirements.txt
│
└── docker-compose.yml       # Local development setup
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+
- **Redis** (optional, for caching)
- **Docker** (optional, for containerized setup)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   cd "c:\Users\User\OneDrive\Desktop\FULL STACK\NLM MODEL\legal-advisory-platform"
   ```

2. **Start all services with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Run database migration**
   ```bash
   docker exec -it legal_backend python scripts/migrate_data.py
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/v1/docs

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE legal_db;
   ```

5. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

6. **Run database migration**
   ```bash
   python scripts/migrate_data.py
   ```

7. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/api/v1/docs
- **ReDoc**: http://localhost:8000/api/v1/redoc

### Key Endpoints

#### Chat
- `POST /api/v1/chat` - Send message to chatbot
- `GET /api/v1/chat/quick-replies` - Get quick reply suggestions

#### Articles
- `GET /api/v1/articles` - List all articles (with pagination & filters)
- `GET /api/v1/articles/{number}` - Get specific article
- `GET /api/v1/articles/categories/list` - Get all categories

#### Cases
- `GET /api/v1/cases` - List all landmark cases
- `GET /api/v1/cases/{id}` - Get specific case

#### Procedures
- `GET /api/v1/procedures` - List all legal procedures
- `GET /api/v1/procedures/{id}` - Get specific procedure

## 🗄️ Database Schema

### Tables

1. **articles**
   - `id` (Primary Key)
   - `number` (Unique, e.g., "21", "32")
   - `title`
   - `description`
   - `category`
   - `keywords` (JSON array)

2. **landmark_cases**
   - `id` (Primary Key)
   - `name`
   - `year`
   - `significance`
   - `key_points` (JSON array)
   - `keywords` (JSON array)

3. **procedures**
   - `id` (Primary Key)
   - `name`
   - `description`
   - `procedure`
   - `keywords` (JSON array)

4. **quick_replies**
   - `id` (Primary Key)
   - `text`
   - `category`
   - `order`

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Deployment

### Quick Deploy to Render.com (Recommended)

**See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed instructions.**

1. **Push code to GitHub**
2. **Create Render account** at [render.com](https://render.com)
3. **Deploy using Blueprint**:
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`
   - Click "Apply" to deploy all services
4. **Wait for deployment** (5-10 minutes)
5. **Access your app** at the provided URLs

### Manual Deployment

#### Frontend (Vercel/Netlify)

1. **Push code to GitHub**
2. **Connect repository to Vercel/Netlify**
3. **Set environment variables**:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`
4. **Deploy**

#### Backend (Render.com)

1. **Create PostgreSQL database** on Render
2. **Create Web Service** for backend
3. **Set environment variables**:
   - `DATABASE_URL` (from Render database)
   - `CORS_ORIGINS=*`
   - `ENVIRONMENT=production`
4. **Build command**: `chmod +x backend/build.sh && backend/build.sh`
5. **Start command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. **Deploy**

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/legal_db
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_key_here  # Optional
ANTHROPIC_API_KEY=your_key_here  # Optional
SECRET_KEY=your-secret-key
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=development
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Indian Constitution data sourced from official government resources
- Landmark cases from Supreme Court of India
- Icons by Lucide React
- UI inspiration from modern legal tech platforms

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for legal education and awareness**
