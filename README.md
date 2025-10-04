# Enhanced Vite React TypeScript Template

This template includes built-in detection for missing CSS variables between your Tailwind config and CSS files.

## Features

- **CSS Variable Detection**: Automatically detects if CSS variables referenced in `tailwind.config.cjs` are defined in `src/index.css`
- **Enhanced Linting**: Includes ESLint, Stylelint, and custom CSS variable validation
- **Shadcn/ui**: Pre-configured with all Shadcn components
- **Modern Stack**: Vite + React + TypeScript + Tailwind CSS

## Available Scripts

```bash
# Run all linting (includes CSS variable check)
npm run lint

# Check only CSS variables
npm run check:css-vars

# Individual linting
npm run lint:js    # ESLint
npm run lint:css   # Stylelint
```

## CSS Variable Detection

The template includes a custom script that:

1. **Parses `tailwind.config.cjs`** to find all `var(--variable)` references
2. **Parses `src/index.css`** to find all defined CSS variables (`--variable:`)
3. **Cross-references** them to find missing definitions
4. **Reports undefined variables** with clear error messages

### Example Output

When CSS variables are missing:
```
❌ Undefined CSS variables found in tailwind.config.cjs:
   --sidebar-background
   --sidebar-foreground
   --sidebar-primary

Add these variables to src/index.css
```

When all variables are defined:
```
✅ All CSS variables in tailwind.config.cjs are defined
```

## How It Works

The detection happens during the `npm run lint` command, which will:
- Exit with error code 1 if undefined variables are found
- Show exactly which variables need to be added to your CSS file
- Integrate seamlessly with your development workflow

This prevents runtime CSS issues where Tailwind classes reference undefined CSS variables.

---

# Project Specific Details and Usage

## Client Authentication and Password Security

- Passwords are stored as SHA-256 hashes using `crypto-js` for basic obfuscation.
- Authentication compares hashed input passwords with stored hashes.
- Note: Passwords and client data are still visible in the client bundle due to client-side rendering limitations.
- For production, implement server-side authentication for true security.

## Client Progress Data

- Client progress data is stored in `src/data/clientProgress.ts`.
- Data includes deliverables, assets, progress percentages, special requests, live updates, credentials, milestones, payment tracking, project details, site preview, and completion services.
- Use provided functions to get and update client progress data:
  - `getClientProgress(clientId: string): ClientProgress | null`
  - `updateDeliverableStatus(clientId: string, deliverableName: string, completed: boolean): void`
  - `addLiveUpdate(clientId: string, update: Omit<LiveUpdate, 'id' | 'timestamp'>): void`
  - `updateMilestoneStatus(clientId: string, milestoneId: string, completed: boolean): void`

## ClientDashboard Component

- Located at `src/components/ClientDashboard.tsx`.
- Displays client project and progress data.
- Includes a request form for clients to submit change requests.
- Invoice download is restricted to client-a only.
- Invoice file located at `public/invoices/client-a-invoice.pdf`.
- Use `handleDownloadInvoice` function to trigger invoice download with client ID check.

## How to Add Data and Use

- Add new clients in `src/config/auth.ts` with hashed passwords.
- Add or update client progress data in `src/data/clientProgress.ts`.
- Use the exported functions to manipulate progress data.
- Update UI components in `src/components/ClientDashboard.tsx` to reflect new data or features.

## Data and Status Details Available

- Deliverables and their completion status.
- Assets uploaded by clients.
- Progress percentages for frontend, backend, and SEO.
- Special requests with status and payment info.
- Live updates with timestamps and types.
- Credentials for client sites.
- Milestones with start/end dates and completion status.
- Payment tracking with total, paid amounts, currency, and breakdown.
- Project details including domain and admin dashboard link.
- Site preview thumbnail and live URL.
- Completion services offered.

---

For any further customization or questions, please refer to the source files or contact the development team.
