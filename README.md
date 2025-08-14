# Doctor-Appointment-System

# Ayurvedic Doctor Consultation Platform

A scalable, modular MVP for discovering and booking consultations with Ayurvedic doctors. This platform enables users to find specialists by availability and specialization, book time slots with confirmation flows, and manage their appointments with rescheduling capabilities.

## 🚀 Features

### Core Functionality

- **Doctor Discovery**: Search by specialization, consultation mode (online/in-person), and availability
- **Smart Booking System**: 5-minute slot locking with OTP confirmation
- **Appointment Management**: View, reschedule, and cancel appointments
- **Flexible Rescheduling**: Cancel or reschedule appointments >24 hours in advance

### Advanced Features (Bonus)

- Doctor dashboard with calendar view
- Recurring availability management
- Interactive calendar-based slot picker
- API rate limiting for scalability
- Automated CI/CD pipeline

## 🛠 Tech Stack

**Frontend**

- React.js / Next.js
- Modern UI components
- Responsive design

**Backend**

- Node.js with Express
- JWT Authentication
- RESTful API design

**Database**

- PostgreSQL / MongoDB
- Optimized for appointment scheduling

**DevOps**

- GitHub Actions (CI/CD)
- Deployment on Render/Vercel

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL/MongoDB
- npm or yarn package manager

## 🚦 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/nickgautam/Doctor-Appointment-System.git
cd Doctor-Appointment-System
```

### 2. Backend Setup

```bash
cd Backend
npm install

# Set up environment variables
cp .env.example .env
# Configure your database connection and JWT secrets

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
cd Frontend
npm install

# Configure environment variables
cp .env.example .env.local
# Set your API base URL

# Start development server
npm start
```

The application will be available at:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, rate limiting
│   │   ├── config/         # Database Configuration
│   │   └── utils/          # Helper functions
│   ├── tests/              # API tests
│   └── migrations/         # Database migrations
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API calls
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   └── styles/         # CSS/Styled components
│   └── public/             # Static assets
├── docs/                   # API documentation
├── SCALING.md             # Architecture scaling plan
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/register    # User registration
POST   /api/auth/login       # User login
POST   /api/auth/verify-otp  # OTP verification
```

### Doctor Discovery

```
GET    /api/doctors          # Search doctors with filters
GET    /api/doctors/:id      # Get doctor details
GET    /api/specializations  # Get all specializations
```

### Appointment Management

```
GET    /api/appointments           # User's appointments
POST   /api/appointments           # Book appointment
PUT    /api/appointments/:id       # Reschedule appointment
DELETE /api/appointments/:id       # Cancel appointment
```

### Slot Management

```
GET    /api/slots/available        # Get available slots
POST   /api/slots/lock             # Lock slot temporarily
POST   /api/slots/confirm          # Confirm booking
```

### Doctor Dashboard (Bonus)

```
GET    /api/doctor/appointments    # Doctor's appointments
PUT    /api/doctor/availability    # Update availability
GET    /api/doctor/calendar        # Calendar view
```

For detailed API documentation, see [API_DOCS.md](./docs/API_DOCS.md)

## 🔐 Authentication & Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- CORS configuration
- Environment variable security

## 📱 Key User Flows

### 1. Doctor Discovery Flow

1. User searches by specialization/mode
2. System filters and sorts by earliest availability
3. User views doctor profiles and available slots

### 2. Booking Flow

1. User selects time slot
2. Slot gets locked for 5 minutes
3. User enters details and receives OTP
4. User confirms with OTP within time limit
5. Appointment confirmed or slot released

### 3. Reschedule Flow

1. User views upcoming appointments
2. Selects appointment to reschedule (>24h notice)
3. Chooses new available slot
4. Confirmation process similar to booking

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

# Run integration tests
npm run test:integration

# Generate test coverage
npm run test:coverage
```

## 🚀 Deployment

### Environment Setup

Create production environment files:

- `backend/.env.production`
- `frontend/.env.production`

### CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

1. Push to `main` branch triggers pipeline
2. Runs tests and linting
3. Builds applications
4. Deploys to staging/production

### Manual Deployment

**Backend (Render/Heroku)**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend (Vercel/Netlify)**

```bash
cd frontend
npm run build
npm run start
```

## 📈 Scaling Considerations

For detailed scaling strategy to support 5,000 appointments/day across 1,000 doctors, see [SCALING.md](./SCALING.md).

Key scaling approaches:

- Database optimization and indexing
- Microservices architecture
- Caching layers (Redis)
- Load balancing
- CDN integration
- Message queues for async processing

## 📝 Development Notes

### Edge Cases Handled

- Double booking prevention
- Slot expiration management
- Network failure recovery
- Timezone handling
- Cancellation within restricted timeframes

### Code Quality Standards

- ESLint and Prettier configuration
- Modular component architecture
- Error handling and logging
- Input validation
- Type checking (optional TypeScript migration)

## 📞 Support

For issues and questions:

- Contact on my mail: (er.nishantgautam0011@gmail.com)
- Check [API_DOCS.md](./docs/API_DOCS.md) for API details
- Review [SCALING.md](./SCALING.md) for architecture decisions

---

**Project Timeline**: Built for submission by August 17th, 2025  
**Architecture Focus**: Designed for scalability and real-world production use
