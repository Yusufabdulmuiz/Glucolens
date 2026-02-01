
# Glucolens Frontend Architecture Specification
**Version:** 1.0.0
**Status:** Active Development

---

## 1. Development Standards & "Pro" Etiquette

To ensure maintainability and scalability, all contributors must adhere to these standards.

### **Code Quality**
* **Strict Typing:** No `any` types. All data structures must be defined in `src/types`.
* **Comments:** Use JSDoc format (`/** ... */`) for all functions and components.
    * *Bad:* `// checks login`
    * *Good:* `/** Verifies session validity and handles 401 redirect logic. */`
* **Absolute Imports:** Use path aliases.
    * *Avoid:* `import Button from '../../../components/ui/Button'`
    * *Use:* `import { Button } from '@/components/ui/Button'`

### **Commit Convention (Conventional Commits)**
We follow the conventional commit structure: `type(scope): description`
* `feat(auth): add login form validation`
* `fix(wizard): resolve step 3 camera permission error`
* `docs(api): update genomic endpoint spec`
* `style(dashboard): fix padding on risk cards`

### **Validation Layer**
* **Runtime Validation:** Use **Zod** for all form inputs. Medical data cannot rely solely on TypeScript interfaces.

---

## 2. Project Structure

```text
src/
├── components/
│   ├── ui/                # Reusable atoms (Button, Input, Card, Modal)
│   ├── layout/            # Layout wrappers (AuthLayout, AppLayout, Sidebar)
│   ├── wizard/            # Assessment specific steps (Step1History, etc.)
│   └── shared/            # Complex shared components (RiskGauge, TrendChart)
├── features/              # Feature-based modularity (Optional for scaling)
├── hooks/                 # Custom hooks (useCamera, useMultiStepForm)
├── lib/                   # Third-party lib configs (axios, utils, tailwind-merge)
├── pages/                 # Route components (Dashboard, Settings, Wizard)
├── services/
│   ├── api.ts             # The Axios Instance (Base URL + Interceptors)
│   ├── auth.ts            # Auth-specific API calls
│   └── mock/              # Mock data generators (faker.js or static JSON)
├── store/                 # State Management (Zustand stores)
└── types/                 # Global TypeScript interfaces

```

---

## 3. The API Contract (Master List)

This list merges the original backend endpoints with the critical frontend requirements (highlighted as **[NEW]**). **All endpoints below must be mocked for the initial Frontend MVP.**

### **A. Authentication & Session**

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register a new user. |
| `POST` | `/auth/login` | Login (Returns JWT `access_token`). |
| `POST` | `/auth/refresh` | **[NEW]** Refresh expired access token. |
| `POST` | `/auth/logout` | **[NEW]** Invalidate session server-side. |
| `POST` | `/auth/password-reset` | **[NEW]** Request password reset email. |

### **B. User Profile**

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/user/profile` | Get profile info (Name, Avatar, Settings). |
| `PUT` | `/user/profile` | **[NEW]** Update profile (e.g., fix name typo). |
| `PATCH` | `/user/settings` | **[NEW]** Update preferences (Notifications, Theme). |

### **C. Assessment Data (The Wizard)**

*Note: The frontend needs `GET` endpoints to pre-fill forms if a user returns to an incomplete assessment.*

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/data/anthropometric` | Submit Step 1 data (Height, Weight, History). |
| `GET` | `/data/anthropometric` | **[NEW]** Retrieve existing Step 1 data. |
| `POST` | `/data/lifestyle` | **[NEW]** Submit Step 2 data (Sleep, Activity). |
| `GET` | `/data/lifestyle` | **[NEW]** Retrieve existing Step 2 data. |
| `POST` | `/data/genomic` | Submit Step 5 genomic file/data. |
| `GET` | `/data/genomic` | **[NEW]** Check if genomic data exists. |
| `POST` | `/images/retina` | Upload retina scan (Multipart/Form-Data). |
| `POST` | `/images/signs` | **[NEW]** Upload skin sign images (Acanthosis). |

### **D. Predictions & Results**

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/predict` | Trigger ML model. Body: `{ use_modalities: [] }` |
| `GET` | `/history/predictions` | List past prediction summaries. |
| `GET` | `/history/{id}` | **[NEW]** Get full details of a specific past result. |
| `GET` | `/explain/shap/{id}` | Get SHAP explainability data. |
| `GET` | `/report/download/{id}` | Download PDF report. |

---

## 4. Key Data Models (TypeScript)

### **PatientProfile**

```typescript
interface PatientProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  settings: {
    notifications: boolean;
    language: 'en' | 'fr';
  };
}

```

### **PredictionResult**

```typescript
interface PredictionResult {
  id: string;
  date: string;
  riskScore: number; // 0.0 to 1.0
  riskLevel: 'Low' | 'Medium' | 'High';
  contributingFactors: Array<{
    feature: string;
    impact: number;
    description: string; // e.g., "High BMI increases risk"
  }>;
}

```

---

## 5. UI/UX Requirements (Non-Functional)

1. **Responsive:** Must work on mobile (375px+) and Desktop (1440px).
2. **Persistence:** If a user reloads the Wizard on Step 3, data from Steps 1 & 2 must not be lost (Implement LocalStorage backup).
3. **Loading States:** No "jumps". Use Skeleton loaders for data fetching.
4. **Error Handling:** All API errors must show a User-Friendly Toast notification, not `console.log`.

```