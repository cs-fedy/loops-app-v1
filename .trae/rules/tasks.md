### Sprint 1 – Authentication & Account Management

- [ ] Implement authentication flows
  - [ ] Login form with validation (TanStack Form + Zod)
  - [ ] Register form and onboarding flow
  - [ ] Reset password and request reset
  - [ ] Confirm account logic

- [ ] Build Profile Management
  - [ ] Update profile form
  - [ ] Update email/password
  - [ ] Client-side validation + API integration

- [ ] API Contracts & Response Parsing
  - [ ] Create Axios service for auth endpoints
  - [ ] Parse responses using Zod schemas

- [ ] Route Guards & Context
  - [ ] Auth context setup using TanStack Query
  - [ ] Protect routes (login, profile, onboarding)
  - [ ] Handle “isFirstTime”, “isProfileCompleted”, “isConfirmed” fields

- [ ] Onboarding Flow
  - [ ] Design onboarding screens
  - [ ] Conditionally redirect first-time users

---

### Sprint 2 – Category & Content Exploration

- [ ] Categories Explorer
  - [ ] List categories page (cover, difficulty, status)
  - [ ] Integrate API with caching (TanStack Query + Zod)

- [ ] Category Detail Page
  - [ ] Display category items (skills/quizzes)
  - [ ] Handle locked/unlocked state via voucher status

- [ ] UI Elements
  - [ ] Card layouts for categories and items
  - [ ] “Locked” badge for unavailable categories

---

### Sprint 3 – Voucher Submission

- [ ] Voucher Form
  - [ ] Input field + validation
  - [ ] Submit voucher API call (Axios + Zod)

- [ ] Unlock Workflow
  - [ ] On success, update cached category status
  - [ ] Show success/error to user (using Effect)

---

### Sprint 4 – Content Progress Flow

- [ ] Skill Flow
  - [ ] "Start Skill" button logic
  - [ ] Display skill content
  - [ ] Complete skill and mark progress via API

- [ ] Quiz Flow
  - [ ] Start Quiz (type-based rendering)
  - [ ] Handle choice, drag-drop, and sequence questions: start, validate, skip
  - [ ] Progress navigation between questions

- [ ] Certificates Display
  - [ ] Fetch and show completion certificate on category completion

- [ ] State Management
  - [ ] Cache skill/quiz progress with TanStack Query for offline resilience

---

### Sprint 5 – Quiz Room Participation

- [ ] Room Join Screen
  - [ ] PIN or QR code input
  - [ ] Join Room API call + validation

- [ ] Room Session UI
  - [ ] Display question list
  - [ ] Handle per-question logic (start, validate, skip)

- [ ] Real-Time Notifications
  - [ ] Set up SSE subscription for room updates
  - [ ] Display leaderboard updates live

- [ ] Leaderboard View
  - [ ] Fetch and render leaderboard participants

---

### Sprint 6 – Stats & Gamification Dashboard

- [ ] Streaks Component
  - [ ] List streaks information
  - [ ] Display current and longest streak

- [ ] Leaderboard Component
  - [ ] Fetch leaderboard leagues metadata
  - [ ] Show participants list with scores

- [ ] General Stats & Graphs
  - [ ] Display overall stats (league, total score, current streak)
  - [ ] Progress graph component

- [ ] Retention & Question Stats
  - [ ] Fetch and show daily/weekly/monthly retention stats
  - [ ] Show question completion stats

- [ ] Rewards & Notifications
  - [ ] List all badges and awarded ones
  - [ ] Activities feed
  - [ ] Recent notifications panel
