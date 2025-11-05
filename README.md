#  Drone Frontend – Assignment #2

Web frontend for viewing and managing drone data using **Next.js + TypeScript + TailwindCSS**.
Connected to backend API (Assignment #1) deployed on **Render**.

---

## Features

* **Page 1:** View Config → Drone ID, Name, Light, Country
* **Page 2:** Log Form → Input Celsius → POST `/logs`
* **Page 3:** View Logs → Show latest 12 records in table

---
## Web
[assignment2-one-mu.vercel.app
](https://assignment2-one-mu.vercel.app/)
---
##  Setup

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://drone-api-a43n.onrender.com
NEXT_PUBLIC_DRONE_ID=66010727
```

Run locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

##  Deployment

* Frontend: **Vercel**
* Backend API: **Render**

---

Built with  Next.js + Tailwind
