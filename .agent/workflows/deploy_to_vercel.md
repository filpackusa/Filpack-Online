---
description: How to deploy the Filpack Online application to Vercel
---

# Deploying to Vercel

This guide will help you deploy your Next.js application to Vercel, the recommended platform for Next.js.

## Prerequisites

1.  **GitHub Account**: Ensure your project is pushed to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **Production Database**: You will need a PostgreSQL database accessible from the internet (e.g., Vercel Postgres, Supabase, or Neon).

## Steps

1.  **Push to GitHub**
    If you haven't already, push your code to a GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2.  **Import Project in Vercel**
    *   Go to your Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your `filpack-online` repository.
    *   Click **"Import"**.

3.  **Configure Project**
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Build Command**: `next build` (default).

4.  **Environment Variables**
    Expand the **"Environment Variables"** section and add the following keys. **Crucial:** You must provide production values, not local test values.

    | Key | Description |
    | :--- | :--- |
    | `DATABASE_URL` | Connection string for your production PostgreSQL database. |
    | `AUTH_SECRET` | A long, random string for authentication security. (Generate one with `openssl rand -base64 32` or use a random string generator). |
    | `ADMIN_EMAIL` | The email address for the admin account. |
    | `ADMIN_PASSWORD` | The password for the admin account. |
    | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Your Stripe *Live* Publishable Key. |
    | `STRIPE_SECRET_KEY` | Your Stripe *Live* Secret Key. |
    | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Your Cloudinary Cloud Name. |
    | `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Your Cloudinary Upload Preset. |

5.  **Deploy**
    *   Click **"Deploy"**.
    *   Vercel will build your application. This might take a minute.

6.  **Post-Deployment: Database Setup**
    Once deployed, you need to push your database schema to the production database.
    *   You can do this from your local machine if you have the production `DATABASE_URL`.
    *   Run: `npx prisma db push` (Make sure your `.env` temporarily points to the production DB or pass the url explicitly).
    *   *Better approach for Vercel:* If you use Vercel Postgres, you can run this in the Vercel Storage tab or connect locally to run the migration.
    *   **Seeding Data:** To add initial products, you might need to run the seed script against the production DB: `node prisma/seed.js`.

## Troubleshooting

*   **Build Failed?** Check the "Logs" tab in Vercel for error messages.
*   **Database Errors?** Ensure `DATABASE_URL` is correct and the database accepts connections from Vercel (usually "Allow all IP addresses" or similar setting in your DB provider).
