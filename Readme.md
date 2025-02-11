
# Pathshala - Academic Coaching Platform

**Pathshala** is an educational platform that connects students with coaching centers. This project includes a client-side application built with React and a server-side application built with Node.js. Students can find coaching centers, while coaching centers can register to offer their services.

## Contributing

We welcome contributions to improve the Pathshala project. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

---


## Project Structure

### Directory Structure

```
└── vaibhavkothari33-pathshala/
    ├── client/                 # Frontend application
    │   ├── README.md           # Client-side README
    │   ├── eslint.config.js     # ESLint configuration for the client
    │   ├── index.html          # HTML file for the client
    │   ├── package-lock.json   # npm lock file
    │   ├── package.json        # npm dependencies for the client
    │   ├── vite.config.js      # Vite configuration for client build
    │   ├── .env.sample         # Environment variables sample for client
    │   ├── .gitignore          # Git ignore file for client
    │   ├── public/             # Public folder (static files)
    │   └── src/                # Source code of the client application
    │       ├── App.css         # Global CSS for the client
    │       ├── App.jsx         # Main app component
    │       ├── index.css       # CSS for index
    │       ├── main.jsx        # Main entry point of the client application
    │       ├── assets/          # Static assets like images/icons
    │       ├── components/      # Reusable components for the client
    │       │   └── common/      # Common components like ProtectedRoute.jsx
    │       ├── contexts/        # React contexts for global state
    │       │   └── AuthContext.jsx
    │       ├── pages/           # Pages for different routes
    │       │   ├── Home.jsx     # Home page component
    │       │   ├── Login.jsx    # Login page component
    │       │   ├── coaching/    # Coaching related pages
    │       │   │   ├── Dashboard.jsx  # Coaching Dashboard page
    │       │   │   └── Registration.jsx  # Coaching Registration page
    │       │   └── student/     # Student related pages
    │       │       └── Dashboard.jsx  # Student Dashboard page
    │       └── services/        # Services like firebase.js for backend integration
    │           └── firebase.js  # Firebase integration service
    └── server/                 # Backend application (Node.js)
        ├── index.js            # Main server entry point
        ├── package-lock.json   # npm lock file for the server
        ├── package.json        # npm dependencies for the server
        ├── .env.sample         # Environment variables sample for server
        ├── .gitignore          # Git ignore file for the server
        └── models/              # Database models
            ├── Coaching.models.js   # Coaching center model
            └── User.models.js       # User model (Student/Coaching)
```

---

## Features

- **Student Dashboard**: Students can find the best coaching centers and manage their learning resources.
- **Coaching Dashboard**: Coaching centers can register and manage their profiles, providing courses to students.
- **Authentication**: Login and role-based access (Student/Coaching Center).
- **Firebase Integration**: Firebase is used for authentication and real-time data handling.

---

## Setup Instructions

### Prerequisites

- Node.js (version >= 14.x)
- npm or yarn
- Firebase account (if you want to use Firebase)

### 1. Clone the repository

```bash
git clonehttps://github.com/vaibhavkothari33/PathShala.git
cd PathShala
```

### 2. Setting up the server (Backend)

1. Navigate to the `server` folder:

```bash
cd server
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables by renaming the `.env.sample` to `.env` and filling in the required values.

4. Start the server:

```bash
npm start 
```
or 

```bash
node index.js 
```

Your server will now be running at `http://localhost:5000` (or another port if specified).

### 3. Setting up the client (Frontend)

1. Navigate to the `client` folder:

```bash
cd client
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables by renaming the `.env.sample` to `.env` and filling in the required values (such as Firebase credentials).

4. Start the client:

```bash
npm run dev
```

Your client will now be running at `http://localhost:3000`.

---

## Usage

1. **Student Registration**: A student can register, login, and explore the best coaching centers around them.
2. **Coaching Center Registration**: A coaching center can register, manage their profile, and connect with students.
3. **Login**: Authentication is done using Firebase for both students and coaching centers.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Vite (for bundling and dev server)
  - Tailwind CSS (for styling)
  - Framer Motion (for animations)
  - React Router (for navigation)
  - Firebase (for authentication)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database storage)

---
