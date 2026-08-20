# CareerNest 💼

A modern full-stack job portal platform connecting job seekers with employers. Built with **Spring Boot**, **React TypeScript**, and **MongoDB**.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-complete-brightgreen.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blueviolet.svg)

---

## 🎯 Overview

CareerNest is a comprehensive job portal where:
- **Job Seekers** can browse, search, and apply for jobs
- **Employers** can post jobs and manage applications
- **Secure authentication** with JWT tokens
- **Real-time job search** with filters
- **Professional UI** with modern design

---

## ✨ Features

### 🔐 Authentication
- User registration with email & password
- JWT-based login/logout
- Role-based access (Job Seeker / Employer)
- Secure password encryption with BCrypt

### 📋 Job Management
- Create, read, update, delete jobs (CRUD)
- Job search by title and location
- Filter jobs by skills
- View job details
- Track application count per job

### 💼 Job Applications
- Job seekers can apply with resume & cover letter
- Employers can view all applications for their jobs
- Update application status (Shortlist, Accept, Reject)
- Track application timeline

### 🎨 User Interface
- Beautiful gradient-based design (Purple + Teal)
- Responsive design (Mobile, Tablet, Desktop)
- Smooth animations & transitions
- Professional navbar with role-based navigation
- Protected routes for authenticated users

### 📱 Additional Features
- LocalStorage for token management
- Redux state management
- Tailwind CSS for styling
- RESTful API architecture
- Error handling & validation

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Java 17** | Programming Language |
| **Spring Boot 3.1.0** | Backend Framework |
| **Spring Security 6.1.0** | Authentication & Authorization |
| **Spring Data MongoDB** | Database ORM |
| **JWT (JJWT 0.11.5)** | Token-based Auth |
| **Lombok** | Boilerplate Reduction |
| **Maven** | Build Tool |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool |
| **Redux Toolkit** | State Management |
| **React Router** | Navigation |
| **Axios** | HTTP Client |
| **Tailwind CSS** | Styling |

### Database
| Technology | Purpose |
|-----------|---------|
| **MongoDB Atlas** | Cloud Database |
| **Mongoose** | N/A (Using Spring Data MongoDB) |

### Deployment
| Platform | Service |
|----------|---------|
| **Render** | Backend Hosting |
| **Vercel** | Frontend Hosting |

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Java 17+** installed
- **Node.js 18.20+** and **npm 9+** installed
- **Git** for version control
- **MongoDB Atlas** account (free tier available)
- **IntelliJ IDEA** Community Edition (optional, for backend development)

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/CareerNest.git
cd CareerNest
```

---

## ⚙️ Backend Setup

### Step 1: Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get connection string

### Step 2: Configure Application Properties

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# MongoDB Configuration
spring.data.mongodb.uri=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/careernest?retryWrites=true&w=majority
spring.data.mongodb.database=careernest

# JWT Configuration (Change this to a long random string!)
jwt.secret=YourVeryLongSecretKeyThatIsAtLeast64CharactersLongForHS512Algorithm
jwt.expiration=86400000

# CORS Configuration
cors.allowed.origins=http://localhost:3000

# Logging
logging.level.root=INFO
logging.level.com.careernest=DEBUG

# Security
spring.security.user.name=admin
spring.security.user.password=admin123
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
```

### Step 3: Build & Run Backend

```bash
cd backend

# Build with Maven
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

Backend will start on: **http://localhost:8080/api** ✅

---

## 🎨 Frontend Setup

### Step 1: Install Dependencies

```bash
cd frontend

# Install packages
npm install

# Install additional packages (if not already done)
npm install axios redux react-redux @reduxjs/toolkit react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Update API URL (if needed)

If backend is on different server, update API calls:

Edit `src/components/Auth/Login.tsx` and other files:

```typescript
// Change from:
axios.post("http://localhost:8080/api/auth/login", ...)

// To your backend URL:
axios.post("https://your-backend-url.com/api/auth/login", ...)
```

### Step 3: Run Frontend

```bash
cd frontend

npm run dev
```

Frontend will start on: **http://localhost:5173** ✅

---

## 📝 Running Locally (Both Services)

### Terminal 1: Backend

```bash
cd backend
./mvnw spring-boot:run
```

Watch for: `Started CareerNestApplication in X.XXX seconds`

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Watch for: `Local: http://localhost:5173`

### Browser

Open: **http://localhost:5173** ✅

---

## 📚 API Documentation

### Authentication

#### Register
```
POST /api/auth/register?role=JOB_SEEKER

Body:
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210"
}

Response:
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  ...
}
```

#### Login
```
POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGc...",
  "userId": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "role": "JOB_SEEKER"
}
```

---

### Jobs

#### Get All Jobs
```
GET /api/jobs

Response:
[
  {
    "id": "...",
    "title": "Java Developer",
    "description": "...",
    "location": "New York",
    "salary": "$100k-$150k",
    "skills": ["Java", "Spring Boot"],
    ...
  }
]
```

#### Search Jobs
```
GET /api/jobs/search?title=Java&location=New York
```

#### Create Job (Employer Only)
```
POST /api/jobs

Headers:
- userId: {user-id}
- userName: {user-name}
- Content-Type: application/json

Body:
{
  "title": "Java Developer",
  "description": "Hire a Java developer",
  "location": "New York",
  "salary": "$100k-$150k",
  "skills": ["Java", "Spring Boot", "MongoDB"],
  "deadline": "2025-12-31T00:00:00"
}
```

#### Get Job Details
```
GET /api/jobs/{jobId}
```

#### Update Job
```
PUT /api/jobs/{jobId}

Headers:
- userId: {user-id}

Body: (same as create)
```

#### Delete Job
```
DELETE /api/jobs/{jobId}
```

---

### Applications

#### Apply for Job
```
POST /api/applications?jobId={jobId}&userId={userId}

Body:
{
  "resume": "My resume content",
  "coverLetter": "I'm interested in this job"
}

Response:
{
  "id": "...",
  "jobId": "...",
  "seekerId": "...",
  "status": "APPLIED",
  "appliedDate": "2026-08-06T08:30:00"
}
```

#### Get My Applications (Seeker)
```
GET /api/applications/seeker/{seekerId}
```

#### Get Job Applications (Employer)
```
GET /api/applications/job/{jobId}
```

#### Update Application Status
```
PUT /api/applications/{applicationId}/status?status=SHORTLISTED

Status Options: APPLIED, SHORTLISTED, REJECTED, ACCEPTED
```

#### Delete Application
```
DELETE /api/applications/{applicationId}
```

---

## 🚀 Deployment

### Deploy Backend (Render)

1. Push code to GitHub
2. Go to [Render](https://render.com)
3. Click "New +" → "Web Service"
4. Connect GitHub repo
5. Configure:
    - **Build Command:** `mvn clean install`
    - **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
    - **Environment Variables:**
      ```
      SPRING_DATA_MONGODB_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
      ```
6. Deploy!

Get URL: `https://your-app.onrender.com`

---

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import GitHub repo
5. Configure:
    - **Framework:** React
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist`
    - **Environment Variables:**
      ```
      VITE_API_URL=https://your-backend.onrender.com/api
      ```
6. Deploy!

Get URL: `https://your-app.vercel.app`

---

## 📂 Project Structure

```
CareerNest/
├── backend/
│   ├── src/main/java/com/careernest/backend/
│   │   ├── model/           (User, Job, Application)
│   │   ├── repository/       (UserRepository, JobRepository, etc)
│   │   ├── service/          (AuthService, JobService, ApplicationService)
│   │   ├── controller/       (AuthController, JobController, ApplicationController)
│   │   ├── config/           (SecurityConfig, JwtTokenProvider)
│   │   ├── dto/              (LoginRequest, LoginResponse)
│   │   └── BackendApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/         (Login, Signup, ProtectedRoute)
    │   │   ├── JobSeeker/    (JobList, JobDetails)
    │   │   ├── Employer/     (PostJob)
    │   │   ├── Common/       (Navbar)
    │   │   └── Home.tsx
    │   ├── redux/
    │   │   ├── store.ts
    │   │   └── slices/       (authSlice, jobSlice)
    │   ├── App.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   └── vite-env.d.ts
    ├── public/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── tailwind.config.js
```

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password encryption with BCrypt
- ✅ Role-based access control (RBAC)
- ✅ Protected routes on frontend
- ✅ CORS configuration
- ✅ Input validation & error handling
- ✅ Secure database credentials (environment variables)

---

## 📊 Database Schema

### Users Collection
```json
{
  "_id": ObjectId,
  "email": "user@example.com",
  "password": "hashedpassword",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "role": "JOB_SEEKER",
  "createdAt": ISODate,
  "updatedAt": ISODate,
  "active": true
}
```

### Jobs Collection
```json
{
  "_id": ObjectId,
  "employerId": ObjectId,
  "employerName": "Company Name",
  "title": "Java Developer",
  "description": "...",
  "location": "New York",
  "salary": "$100k-$150k",
  "skills": ["Java", "Spring Boot"],
  "postedDate": ISODate,
  "deadline": ISODate,
  "applicationsCount": 5,
  "active": true
}
```

### Applications Collection
```json
{
  "_id": ObjectId,
  "jobId": ObjectId,
  "jobTitle": "Java Developer",
  "seekerId": ObjectId,
  "seekerName": "John Doe",
  "seekerEmail": "john@example.com",
  "appliedDate": ISODate,
  "status": "APPLIED",
  "resume": "...",
  "coverLetter": "..."
}
```

---

## 🧪 Testing

### Test User Accounts

**Job Seeker:**
```
Email: seeker@example.com
Password: password123
```

**Employer:**
```
Email: employer@example.com
Password: password123
```

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Check MongoDB URI in `application.properties`
- Verify IP is whitelisted in MongoDB Atlas
- Ensure credentials are correct

**Port Already in Use**
- Change port in `application.properties`: `server.port=8081`

**JWT Secret Too Short**
- Use a secret with at least 64 characters

### Frontend Issues

**Blank White Page**
- Open browser DevTools (F12) → Console
- Check for errors
- Ensure backend is running on port 8080

**CORS Errors**
- Verify backend CORS configuration
- Check frontend API URL matches backend URL

**Redux State Not Updating**
- Verify all Redux slices are properly exported
- Check store.ts has all reducers

---

## 📞 Support & Contact

- **Issues:** Open an issue on GitHub
- **Email:** support@careernest.com
- **Documentation:** See inline code comments

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 Contributors

- **Developer:** Mehak Srivastava
- **Version:** 1.0.0
- **Last Updated:** August 2026

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [JWT Introduction](https://jwt.io/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🎉 Acknowledgments

- Spring Framework Team
- React Core Team
- MongoDB
- Tailwind Labs

---

**Happy coding! 🚀**

*If you found this project helpful, please star it on GitHub!* ⭐