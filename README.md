Full-stack project: YouTube Video List + Player

This project consists of:

Server (backend) > Node.js + Express + MongoDB + YouTube API

Client (frontend) > Expo React Native app (lists & plays videos inside app)
** Project Structure **
.
├── server/   # Backend (Express + MongoDB + YouTube API)
└── client/   # Frontend (Expo React Native)
* *Features **

# Stores only videoId in MongoDB (no metadata).
# Server enriches data with title, channel, thumbnail, duration via YouTube Data API v3.
# REST endpoint /api/videos serves enriched data.
# React Native app fetches from server, shows list, and plays videos inside app (using react-native-youtube-iframe).
** Backend (server) **

Go to the server/ folder:

cd server
npm install


Create a .env file:

MONGO_URI=mongodb+srv://<USER>:<PASSWORD>@cluster0.xxxxxx.mongodb.net/learnoverse?retryWrites=true&w=majority
YT_API_KEY=YOUR_YOUTUBE_API_KEY
PORT=5000


Seed MongoDB with 10 video IDs (only videoId field):

node seed.js


Start the server:

node index.js


You should see:

MongoDB connected
Server listening 5000


Test in browser:

Open http://localhost:5000/api/videos

You should see JSON with video metadata.

** Frontend (client) **

Go to the client/ folder:

cd client
npm install


Edit screens/ListScreen.js and set API URL:

const res = await axios.get('http://<YOUR_PC_IP>:5000/api/videos');


** Use correct IP depending on where you run:

Android Emulator → http://10.0.2.2:5000/api/videos

Expo Go on phone → http://<your-computer-LAN-ip>:5000/api/videos

Web (optional) → http://localhost:5000/api/videos

Start the client:

npx expo start


Scan QR with Expo Go (Android/iOS)

Or press a (Android emulator) / i (iOS simulator on Mac)

** Demo (for assignment) **

App shows a list of 10 YouTube videos (title, channel, thumbnail, duration).

Tapping a video opens Player Screen and plays video inside app (not deep-linking).

You can go back and play another.

Record this flow (≤2 minutes) as required.

🛠️ Tech Stack

Backend

Node.js + Express

MongoDB (Atlas)

Axios

YouTube Data API v3

Frontend

Expo React Native

Axios

React Navigation

react-native-youtube-iframe

** API Example **

GET /api/videos → returns:
