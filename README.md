# QuackDeal

**AI-powered sales intelligence platform** — analyze meetings, score deals, and generate follow-ups using Claude AI.

🌐 **Live Demo:** [quack-deal-app.vercel.app](https://quack-deal-app.vercel.app)

---

## What It Does

QuackDeal helps sales reps close more deals by turning raw meeting notes, audio recordings, and screenshots into structured intelligence. Paste a transcript, record live audio, or upload a screenshot — QuackDeal scores the deal health, flags objections, surfaces positive signals, and drafts a follow-up email in seconds.

---

## Features

- **Meeting Analysis** — Analyze text transcripts, live audio recordings, or screenshots using Google Gemini Pro
- **Deal Health Scoring** — Transparent 0–100 score across 4 dimensions: sentiment, objections, commitment signals, and engagement
- **AI Chat Assistant** — Ask Claude Opus questions about your pipeline ("Which deals are at risk?", "Summarize the pipeline")
- **Follow-Up Email Generator** — Claude drafts personalized follow-up emails based on meeting context
- **Deal Detail View** — Full meeting history, notes, follow-ups, and AI insights per deal
- **Pipeline Analytics** — Health trends by time and industry, top objections across all deals
- **Smart Reminders** — Automated alerts for inactive deals, score drops, and overdue follow-ups
- **Google Sign-In** — Firebase authentication with secure token verification on every API request

---

## Tech Stack

### Frontend
| | |
|---|---|
| Framework | React 18 (Create React App) |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | Firebase (Google OAuth) |
| HTTP | Axios |

### Backend
| | |
|---|---|
| Runtime | Node.js + Express |
| Database | Snowflake (data warehouse) |
| AI — Analysis | Google Gemini Pro |
| AI — Chat & Email | Anthropic Claude Opus |
| Auth | Firebase Admin SDK |
| Analytics | Databricks (job trigger via HTTP) |
| Scheduling | node-cron + Vercel Cron |
| File Uploads | Multer |

### Infrastructure
| | |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Vercel Serverless Functions |
| CI/CD | Vercel (auto-deploy from GitHub) |

---

## Project Structure

```
quackDeal/
├── client/
│   └── quack-deal-app/          # React frontend (CRA)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Login.js
│       │   │   ├── Dashboard.js
│       │   │   ├── NewAnalysis.js
│       │   │   ├── DealDetail.js
│       │   │   └── Analytics.js
│       │   ├── components/
│       │   │   ├── Deal/
│       │   │   ├── Dashboard/
│       │   │   └── ReminderBell.js
│       │   ├── services/
│       │   │   └── api.js       # Axios client (auto-injects Firebase token)
│       │   └── utils/
│       │       └── dealHealth.js
│       └── vercel.json
│
└── server/                      # Express backend
    ├── server.js
    ├── routes/
    │   ├── auth.js
    │   ├── deals.js
    │   ├── analyze.js
    │   ├── analytics.js
    │   ├── reminders.js
    │   └── chat.js
    ├── services/
    │   ├── geminiService.js
    │   ├── dealHealthService.js
    │   ├── snowflakeService.js
    │   ├── databricksService.js
    │   └── reminderService.js
    ├── config/
    │   ├── firebase.js
    │   └── snowflake.js
    └── vercel.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Snowflake](https://snowflake.com) account
- A [Firebase](https://firebase.google.com) project with Google Auth enabled
- An [Anthropic](https://anthropic.com) API key
- A [Google AI Studio](https://aistudio.google.com) API key (Gemini)

### 1. Clone the repo

```bash
git clone https://github.com/tanmaykatke21/quackDeal.git
cd quackDeal
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your credentials (see Environment Variables below)
npm run dev
```

### 3. Set up the frontend

```bash
cd client/quack-deal-app
npm install
```

Create `client/quack-deal-app/.env`:
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

```bash
npm start
```

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `5001`) |
| `FRONTEND_URL` | Allowed CORS origin (e.g. `http://localhost:3000`) |
| `SNOWFLAKE_ACCOUNT` | Snowflake account identifier (lowercase, e.g. `xyz-abc12345`) |
| `SNOWFLAKE_USER` | Snowflake username |
| `SNOWFLAKE_PASSWORD` | Snowflake password |
| `SNOWFLAKE_DATABASE` | Database name (e.g. `MEETINGMIND`) |
| `SNOWFLAKE_SCHEMA` | Schema name (e.g. `APP`) |
| `SNOWFLAKE_WAREHOUSE` | Warehouse name (e.g. `COMPUTE_WH`) |
| `SNOWFLAKE_ROLE` | Role (e.g. `SYSADMIN`) |
| `FIREBASE_PROJECT_ID` | Firebase project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key (with `\n` newlines) |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key |
| `GEMINI_API_KEY` | Google Gemini API key |
| `DATABRICKS_TOKEN` | Databricks personal access token |

### Frontend (`client/quack-deal-app/.env`)

| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend URL (e.g. `https://your-backend.vercel.app`) |
| `REACT_APP_FIREBASE_API_KEY` | Firebase web API key |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase project ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `REACT_APP_FIREBASE_APP_ID` | Firebase app ID |

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/sync` | Sync Firebase user to Snowflake |
| `GET` | `/api/deals` | List all deals |
| `POST` | `/api/deals` | Create a deal |
| `GET` | `/api/deals/:id` | Get deal details |
| `POST` | `/api/analyze` | Analyze meeting (text/audio/image) |
| `POST` | `/api/analyze/followup` | Generate follow-up email |
| `POST` | `/api/chat` | AI pipeline chat |
| `GET` | `/api/analytics/summary` | Aggregated analytics |
| `GET` | `/api/reminders` | Get active reminders |

---

## Deployment

Both services are deployed separately on Vercel.

### Deploy backend
```bash
cd server
vercel --prod
```

### Deploy frontend
```bash
cd client/quack-deal-app
vercel --prod
```

Set all environment variables in each Vercel project dashboard before deploying.

> **Tip:** When setting env vars via CLI, use `printf '%s' 'value' | vercel env add KEY production` to avoid trailing newline issues.

---

## How the Scoring Works

Each deal gets a health score out of 100, split evenly across four dimensions:

| Dimension | Max | What it measures |
|-----------|-----|-----------------|
| Sentiment | 25 | Overall tone and positivity of the conversation |
| Objections | 25 | Fewer/weaker objections = higher score |
| Commitment Signals | 25 | Buying signals, next steps agreed, interest shown |
| Engagement | 25 | Meeting length, questions asked, active participation |

---

## License

MIT
