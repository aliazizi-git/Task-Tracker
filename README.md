# Task Tracker

A fullstack task management application that tracks what you need to do, what you are currently working on, and what you have completed.

Built as a solution for the [Roadmap.sh Task Tracker Project](https://roadmap.sh/projects/task-tracker).

Project URL: https://roadmap.sh/projects/task-tracker

---

## 🚀 Features

- **Full CRUD for Tasks**: Create new tasks, read them with real-time status, update description and status, and delete tasks.
- **Task Status Lifecycle**: Each task is tracked across three standard states: `todo`, `in-progress`, and `done`.
- **Filtering & Search**: Filter tasks dynamically by status (`all`, `todo`, `in-progress`, `done`) powered by MongoDB aggregation pipelines via `vanta-api` (`ApiFeatures`).
- **User Authentication**: Secure JWT-based authentication (register and login) with encrypted passwords using `bcryptjs`.
- **Protected Routes**: Client-side route guard ensuring authenticated access to personal task workspaces.
- **Modern Responsive UI**: Built with React 19, Redux Toolkit, Tailwind CSS v4, and Lucide Icons.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express 5** (ES Modules)
- **MongoDB** with **Mongoose ODM**
- **JWT (jsonwebtoken)** & **bcryptjs**
- **express-validator** for schema & request sanitization
- **vanta-api** (`ApiFeatures`, `catchAsync`, `HandleERROR`)
- **morgan** & **cors**

### Frontend
- **React 19** with **Vite**
- **Redux Toolkit** & **React-Redux**
- **React Router DOM v7** (Data Router & Protected Routes)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Axios** (with automatic JWT authorization interceptor)
- **react-hot-toast** & **lucide-react**

---

## 📂 Project Structure

```text
Task-Tracker/
├── backend-task/
│   ├── Config/          # MongoDB connection (dbConnection.js)
│   ├── Middlewares/     # isLogin.js, exportValidation.js
│   ├── Modules/
│   │   ├── Auth/        # Auth routes, controller & validator
│   │   ├── Task/        # Task routes, controller, model (taskMd.js)
│   │   └── User/        # User model (userMd.js)
│   ├── Utils/           # handleValidation.js
│   ├── .env             # Environment variables
│   ├── app.js           # Express app setup & middleware pipeline
│   └── server.js        # Server entry point
│
└── frontend-task/
    ├── src/
    │   ├── Components/  # Navbar, Footer
    │   ├── Hooks/       # useFormFields custom hook
    │   ├── Layout/      # Main layout & Protected Route guard
    │   ├── Pages/       # Home, About, Auth, Tasks
    │   ├── Router/      # createBrowserRouter configuration
    │   ├── Services/    # Axios client, authService, taskService
    │   └── Store/       # Redux Toolkit store & authSlice
    └── package.json
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) running locally on port 27017 or a MongoDB Atlas connection string.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend-task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your `.env` file (created automatically):
   ```env
   PORT=5000
   BASE_DB_URL=mongodb://127.0.0.1:27017
   BASE_DB_NAME=task-tracker-db
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs on `http://localhost:5000`.*

### 3. Frontend Setup
1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend-task
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client runs on `http://localhost:5173`.*

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in and receive JWT token |

### Tasks (Protected - Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/task` | Get user tasks (supports `?status=...&q=...`) |
| `GET` | `/api/task/:id` | Get specific task by ID |
| `POST` | `/api/task` | Create a new task |
| `PUT` | `/api/task/:id` | Update description or status |
| `DELETE` | `/api/task/:id` | Delete task |

---

## 📜 Task Properties

Each task conforms to the Roadmap.sh task specification:
- `id`: Unique identifier (`_id`)
- `description`: Text content of the task
- `status`: Current lifecycle status (`todo`, `in-progress`, `done`)
- `createdAt`: Timestamp when the task was created
- `updatedAt`: Timestamp when the task was last updated

---

## 📄 License
This project is open-source and available under the ISC License.
