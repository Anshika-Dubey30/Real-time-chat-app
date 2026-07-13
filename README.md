# Full-Stack Real-Time Chat Application

A high-performance real-time chat solution engineered with a React Native (Expo) frontend framework and a robust Node.js + Express backend ecosystem, powered by Socket.io for bidirectional communication and MongoDB for persistent data logging.

## Tech Stack
- **Frontend Architecture:** React Native, Expo Web Core
- **Backend Architecture:** Node.js, Express.js REST Framework
- **Real-Time Engine:** Socket.io (WebSockets)
- **Database Engine:** MongoDB (Local Instance)

---

## Environment Variables Required

### Backend Environment Configuration
Create a `.env` file inside the root of your `chat-backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatDB ```


## Project Setup & Installation Instructions
1. Prerequisites
Ensure you have Node.js (v18+ recommended) and MongoDB Community Server installed and running locally on your machine.

2. Dependency Installation
Execute the installation scripts across both environments to bootstrap the runtime environments:

# Install Backend Dependencies
```cd chat-backend
npm install ```

# Install Frontend Dependencies
```cd ../chat-frontend
npm install
npx expo install react-native-web react-dom @expo/metro-runtime```

Steps to Run the Application
Step 1: Initialize the Backend Server
Spin up the Express engine running on top of Nodemon for active file watching:

```cd chat-backend
npm run dev```

Step 2: Configure the Frontend API Endpoint
Before running the frontend, open chat-frontend/App.js and update the BACKEND_URL constant with your local machine's exact IPv4 address:

```const BACKEND_URL = '[http://10.129.104.48:5000](http://10.129.104.48:5000)';```

Step 3: Launch the Frontend App
Fire up the Expo Metro Bundler and route the interface straight to your default web browser:

```cd chat-frontend
npx expo start```

Design Decisions
Hybrid Network Architecture (REST + WebSockets): We utilized standard HTTP REST endpoints (GET /api/messages) to query historical data packets instantly on application load. Real-time packet distribution (sending and receiving active messages) bypasses HTTP and runs via a single persistent WebSocket channel using Socket.io to achieve near-zero latency.

React Hooks State Management (useRef over Class Architecture): To implement the auto-scrolling log feature inside a modern Functional Component layout, we leveraged the useRef hook mapped to the .current DOM mutation layer instead of the legacy class-bound this references. This guarantees that real-time shifts do not cause application layout crashes.

Decoupled Folder Separation: Separated codebases into explicit data layers (models/), interface layers (components/, screens/), and network distribution layers (routes/) to comply with modular clean architecture.

Assumptions Made
Local Isolation Over Cloud Handshakes: Assumed a local isolated MongoDB runtime connection (127.0.0.1:27017) using IPv4 explicitly to mitigate unexpected network/ISP domain routing blocks typically encountered during cloud staging.

Lightweight Web Profiling: Assumed the usage of an Expo web target container engine for the application testing phase to bypass massive device constraints and heavy RAM bottlenecks associated with full local Android Studio / SDK compilation loops.

Stateless Dummy Authentication: Assumed an un-encrypted username string payload acts as the primary user identification value without JWT/OAuth signing, strictly adhering to the assignment's explicit dummy authorization parameters.

