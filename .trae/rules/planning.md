# **Planning Document – Loops PWA**

## 1. Overview

The **Loops PWA** is the **learner-facing app** of the platform.
It allows kids to:

- Register, onboard, and manage their profile.
- Explore learning categories, skills, and quizzes.
- Progress through coding content, earn certificates and badges.
- Join real-time quiz rooms and view leaderboards.
- Access statistics, streaks, and notifications.

The app must be **responsive, offline-ready, performant, and secure**, with a focus on **child-friendly usability**.

## 2. Tech Stack & Architecture

- **Build & PWA**: Vite, VitePWA
- **UI & Styling**: ReactJS, TailwindCSS, Shadcn, Framer Motion
- **Framework**: TanStack Start (SSR + CSR), TanStack Router
- **Data Layer**: TanStack Query (fetching, caching), Axios (REST communication)
- **Forms**: TanStack Form + Zod (validation)
- **Typing & Safety**: TypeScript, Effect package (typed error/success handling)
- **i18n**: React i18n (language switching)

### **Architecture Layers**

- **UI layer** → Shadcn/Tailwind components.
- **Forms layer** → TanStack Form + Zod.
- **Routing layer** → TanStack Router.
- **Middlewares & Guards layer** → auth, permissions, onboarding flow checks.
- **API & Services layer** → Axios + Zod parsers for backend contract validation.
- **Hooks & Business Logic layer** → reusable state and domain logic.
- **Server Functions layer** → TanStack Start server logic for SSR.

## 3. Sprint Planning (mapped to use cases)

### **Sprint 1 – Authentication, Account & Access**

- Register, Login, Logout, Reset password
- Confirm account, onboarding flow
- Profile management (update profile, password, email)
- Account state (get logged user, list users)
- Guards (role/user session checks)

### **Sprint 2 – Content Management (read-only for User PWA)**

_(Mainly backend & dashboard heavy – in PWA only consume content APIs)_

- Display categories list & details
- Show category items (skills/quizzes)

### **Sprint 3 – Voucher Management**

- Submit voucher to unlock category content

### **Sprint 4 – Content Progress**

- Explore & start categories
- Progress through skills & quizzes
- Answer & validate quiz questions (choice, drag-drop, sequence order)
- Track progress (started, completed items)
- Display certificates

### **Sprint 5 – Room Management & Enrollment**

- Join quiz room via PIN/QR
- Participate in room questions (start, validate, skip)
- Display room leaderboard & stats

### **Sprint 6 – Statistics & Gamification**

- Show streaks, badges, leaderboards
- Display progress graphs, retention stats, activities & notifications

## 4. Detailed Implementation Planning

### **Sprint 1 – Authentication & Account**

- Implement **Auth Context** with TanStack Query + Axios.
- Build **forms** (login, register, reset password) with TanStack Form + Zod.
- Add **guards** to protect routes (redirect to login if not authenticated, to onboarding if profile incomplete).
- Implement **profile management screen**.
- Test flow end-to-end with backend (register → confirm → login → update profile).

### **Sprint 2 – Categories & Content Browsing**

- Build **Categories Explorer page**: list categories with cover, difficulty, progress.
- **Category detail page**: list category items (skills/quizzes).
- Integrate **API service layer** with Zod parsing.
- Cache results with TanStack Query.

### **Sprint 3 – Vouchers**

- Implement **voucher submission form**.
- Validate voucher via API → unlock category.
- Update UI state (categories list updated to “unlocked”).

### **Sprint 4 – Content Progress**

- **Skill flow**: start → display content → mark complete.
- **Quiz flow**: start → display questions (choice, drag-drop, sequence) → validate/skip.
- **Certificates**: fetch & display upon category completion.
- Maintain **progress state** in TanStack Query caches.

### **Sprint 5 – Rooms**

- Implement **Join Room flow** (PIN/QR).
- Build **Room interface**: list questions, allow start/validate/skip per type.
- Real-time updates via **SSE integration** (subscribe to backend room updates).
- Leaderboard display with live updates.

### **Sprint 6 – Stats & Gamification**

- **Statistics dashboard**: streaks, badges, progress graph, retention stats.
- **Leaderboard page**: leagues, participant entries.
- **Notifications panel**: list recent notifications.
- **Activities feed**: show recent activity history.

## 5. Cross-cutting Concerns

- **Error Handling** → all API calls validated with Zod; typed handling with Effect.
- **Internationalization** → React i18n for language toggle.
- **Testing** → write unit + integration tests (Jest, React Testing Library); add E2E tests with Playwright later.
- **Offline-first** → PWA caching with VitePWA.
- **Accessibility (a11y)** → ensure UI components accessible for kids.
- **Internationalization (i18n)** → ensure that the content of the app is translated to english, arabic and french
