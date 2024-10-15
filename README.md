![Screenshot 2024-10-15 185640](https://github.com/user-attachments/assets/560e4a47-b164-415a-82b2-391647fc9b00)

![Screenshot 2024-10-15 185809](https://github.com/user-attachments/assets/f67fc53e-b64f-4478-92ba-26c4dd647f1e)

Technologies
Frontend:
React.js
Socket.io-client
Axios
Tailwind CSS (or plain CSS for styling)
Backend:
Node.js
Express.js
MongoDB (Mongoose for database interaction)
Socket.io (for real-time communication)
dotenv (for environment variables)
CORS (for handling cross-origin requests)
Features
Real-time score updates: Admins can update runs, wickets, and overs, and users receive real-time updates via WebSockets.
Ball-by-ball tracking: Each over and ball is tracked and displayed.
Admin and User views: Admins can update scores, while users have a read-only view of the current match progress.
Over management: Automatically increments the over after every 6 balls
Backend Setup

Clone the project:
git clone https://github.com/your-username/CrickScore.git
cd CrickScore/backend

Install dependencies:
npm install

Create a .env file in the backend directory and add your MongoDB URI and port:
DB_URI=mongodb://localhost:27017/cricketDB
PORT=5000

Start the backend server:
npm run start
The backend will run on http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:
cd frontend/cricket-board

Install dependencies:
npm install

Create a .env file in the frontend directory and add the backend API URL:
REACT_APP_API_URL=http://localhost:5000

Start the frontend development server:
npm run start
The frontend will run on http://localhost:3000.

Usage
Admin View: Navigate to http://localhost:3000/admin to update the score.
User View: Navigate to http://localhost:3000/user to view the real-time score.
The Admin can update:

Runs for each ball (0, 1, 2, 3, 4, 6).
Wickets (-1 for a wicket).
The system automatically increments the over after 6 balls.
Users see live updates in real-time via WebSocket.
