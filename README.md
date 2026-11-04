# Daily Wallet — Cashflow & Budget Tracker (QAR Edition)

A lightning-fast, zero-friction Progressive Web App designed to track your daily incoming and outgoing money, calculate your daily safe spending allowance to finish the month evenly, and work 100% offline.

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

## How to Run & Install

### Option A: Double-Click (Fastest on Windows)
Double-click `start.bat` in this folder. It will start a local server and open `http://localhost:8080` in your browser.

### Option B: Terminal Command
Run in PowerShell / Terminal:
```bash
python -m http.server 8080
```
Then visit http://localhost:8080.

### Installing as a Desktop or Mobile App
1. Open http://localhost:8080 in Chrome or Edge.
2. Click the **Install** button in the header (or click the install icon in your browser's address bar).
3. The app is now installed on your desktop/dock and will launch as a standalone window.
