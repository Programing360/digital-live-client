# 🎬 Digital Life Lessons

A modern, full-stack platform where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom gathered over time. Users can organize lessons, track learning progress, save favorites, and browse premium/free public lessons shared by a mindful community.

### 🔗 Project Links
- **Live Site:** https://digital-live-client.vercel.app
- **Client-Side Repository:** https://github.com/Programing360/digital-live-client
- **Server-Side Repository:** https://github.com/Programing360/digital-live-server

---

## 🚀 Key Features

### 🌟 Core Features
- **Smart Lesson Access Control:** Dynamic partitioning of content into **Free** (visible to all) and **Premium** (blurred/locked for free users with dynamic upgrade prompts).
- **Interactive Lesson Workspace:** Complete interaction system including real-time, optimistic-UI Likes, Favorites toggling, a dedicated Comment section, and a formal **Report Content** framework.
- **Robust Authentication:** Seamless integration with **Better Auth** supporting Email/Password validation (minimum 6 characters, uppercase, and lowercase enforcement) along with Google OAuth login.
- **Stripe Payment Gateway:** Live automated webhooks updating user tier structure immediately following a lifetime access purchase of ৳1500.
- **Advanced Discovery Hub:** High-fidelity multi-criteria search, filtering (by Category & Emotional Tone), dynamic sorting (Newest, Most Saved), and performance-optimized pagination.

### 🛡️ Dashboard & Administration
- **Role-Based Routing:** Completely separate dashboards and views for standard **Users** and platform **Admins**.
- **Data Analytics Visualizations:** Beautiful charts tracking user engagement, weekly/monthly contribution patterns, and general platform growth metrics.
- **Administrative Control Panel:** Full moderation mechanics allowing admins to manage user roles, delete policy-violating lessons via confirmation workflows, and manage **Featured Lessons** toggles.

### ✨ Bonus Elements Implemented
* 🌓 **Dark / Light Theme Toggle:** Fully synchronized user-interface shifting between reading-optimized color matrices.
* ⏱️ **Estimated Reading Time Tracker:** Automated processing calculated elegantly through core word-count metrics.
* 📱 **Social Media Sharing:** Built-in capability using `react-share` featuring modernized platforms (including the revised X logo).

---

## 🛠️ Technologies & Packages Used

### Client-Side
- **Framework:** React.js / Next.js (Tailwind CSS for layout systems)
- **State & Data Fetching:** TanStack Query (`@tanstack/react-query`) / Axios
- **Authentication Client:** Better Auth Client
- **Animations:** `framer-motion`
- **UI Elements & Notifications:** `lucide-react`, `react-toastify` / `sweetalert2`
- **Charts:** `recharts` / `chart.js`
- **Social Utility:** `react-share`

### Server-Side
- **Runtime:** Node.js with Express.js Framework
- **Database Architecture:** MongoDB with Mongoose ODM
- **Authentication Core:** Better Auth
- **Payments:** Stripe SDK (`stripe`)
- **Security Middlewares:** `cors`, `dotenv`, standard JWT Token validation layers

---

## 🗃️ Database Collections Architecture

The platform operates utilizing a highly synchronized relational-document model inside **MongoDB**:

| Collection Name | Essential Fields Structure |
| :--- | :--- |
| **`users`** | `_id`, `name`, `email`, `photoURL`, `role` (user/admin), `isPremium` (boolean) |
| **`lessons`** | `title`, `description`, `category`, `emotionalTone`, `visibility`, `accessLevel`, `likes[]`, `likesCount`, `isFeatured`, `isReviewed`, `creatorId` |
| **`lessonsReports`** | `lessonId`, `reporterUserId`, `reportedUserEmail`, `reason`, `timestamp` |
| **`favorites`** | `userId`, `lessonId`, `savedAt` |
| **`comments`** | `lessonId`, `userId`, `text`, `createdAt` |

---

## 🔧 Environment Variables Configuration

To run this project locally, create the respective environment files and map these necessary variables:

### Frontend Environment (`.env.local`)
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
