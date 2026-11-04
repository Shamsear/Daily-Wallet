# Daily Wallet — Cashflow & Budget Tracker (QAR Edition)

A lightning-fast, zero-friction Progressive Web App designed to track your daily incoming and outgoing money, calculate your daily safe spending allowance to finish the month evenly, and work 100% offline.

---

## Live Deployment on Vercel

Deploy your own instance of Daily Wallet to Vercel in 1 click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FShamsear%2FDaily-Wallet)

### Manual Vercel Deployment Steps:
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New...** > **Project**.
3. Import the repository: `Shamsear/Daily-Wallet`.
4. Keep the default settings (**Framework Preset: Other**, **Root Directory: ./**).
5. Click **Deploy**. Vercel will build and assign an SSL-enabled `.vercel.app` domain.

---

## Features

- **Instant Daily Tracking**: Log incoming (+ Money In) or outgoing (- Money Out) funds in 2 taps.
- **Finish the Month Engine**: Automatic calculation of safe daily spending limit based on remaining days.
- **Full Monthly Reports**: Inflow vs outflow summary, net savings, and category distribution percentages.
- **Apple-Style Segmented Tabs**: Sliding pill indicators with fluid spring physics and zero flicker.
- **Live Balance & Rolling Numbers**: Real-time balance calculations with NumberFlow-style smooth digit transitions.
- **Daily Grouped Ledger**: Transactions grouped day-by-day (Today, Yesterday, etc.) with automatic daily net totals.
- **100% Offline-First**: Built with a Service Worker cache and local device storage (localStorage). Works with zero internet.
- **Smart Online Update**: Detects network reconnection, updates app assets in the background, and preserves your private data.
- **Complete Privacy**: Zero external servers, no logins, no tracking.
- **Data Safety**: 1-click Export CSV (for Excel / Sheets), Export JSON Backup, and Import Backup.
- **Installable PWA**: Install directly onto Windows (Edge/Chrome) or mobile devices (iOS / Android home screen).

---

## How to Run Locally

### Option A: Double-Click (Fastest on Windows)
Double-click `start.bat` in this folder. It will start a local server and open `http://localhost:8080` in your browser.

### Option B: Terminal Command
Run in PowerShell / Terminal:
```bash
python -m http.server 8080
```
Then visit http://localhost:8080.

### Installing as a Desktop or Mobile App
1. Open http://localhost:8080 (or your Vercel URL) in Chrome, Edge, or Safari.
2. Click the **Install** button in the header (or click the install icon in your browser's address bar).
3. The app is now installed on your desktop/dock and will launch as a standalone window.
