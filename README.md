# MoodTune
MoodTune – AI-Powered Emotion-Based Media Recommender:
MoodTune is an AI-driven web app that detects your mood in real time through facial expressions and intelligently recommends personalized music, movies, anime, books, games, and podcasts that match how you feel.
Overview

MoodTune uses MediaPipe’s Face Landmarker for facial emotion detection directly in the browser, mapping emotions to content profiles and fetching relevant recommendations from a Supabase database.
All processing happens securely in the browser to preserve user privacy.

Flow:
Camera → MediaPipe → Emotion Classification → Supabase Query → Recommendations UI

Core Features

Real-Time Emotion Detection – Reads facial expressions using MediaPipe and classifies emotions like happy, sad, angry, relaxed, fearful, neutral, etc.

AI-Based Recommendations – Dynamically maps detected moods to curated content lists.

Multi-Category Support – Suggests across Music, Movies, Anime, Books, Games, and Podcasts.

User Preferences – Learns user choices and tailors results.

Mood History – Logs up to 10 recent detections with timestamps and moods.

Privacy-First – Runs inference locally; no raw camera data is stored or uploaded.

Tech Stack

Frontend: React + TypeScript + TailwindCSS + ShadCN UI

AI Engine: MediaPipe Tasks (Face Landmarker)

Backend: Supabase (Database, Auth, Edge Functions)

Build Tools: Vite, React Query

Deployment: Netlify / Vercel

⚙️ Setup Instructions

Clone the repository:

git clone <repo-url>
cd MoodTune
npm install


Create a .env file with:

VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-key>


Run locally:

npm run dev


Build for production:

npm run build
npm run preview

Architecture Overview

Frontend (React) – Manages UI, camera, and MediaPipe inference.

AI Layer (MediaPipe) – Detects facial landmarks and infers emotion.

Recommendation Logic – Maps emotion → mood profile → query filters.

Backend (Supabase) – Stores content data, user preferences, and history.

Deployment – Netlify frontend, Supabase backend.

Privacy & Security

Camera processing runs locally (no image uploads).

Only mood labels and timestamps are stored.

HTTPS enforced for all deployments.

Row-Level Security (RLS) active in Supabase.

Future Enhancements

Add voice and text sentiment analysis.

Integrate with Spotify/YouTube for real playback.

Group mood detection and collaborative playlists.

Improved on-device ML model for accuracy.
