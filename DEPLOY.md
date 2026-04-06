# Deployment Guide: EMS PRO (Vercel & Render)

This guide provides the necessary steps to deploy the **EMS PRO** application to a live production environment using **Vercel** (Frontend) and **Render** (Backend & Databases).

## Prerequisites

1. **GitHub Repo**: Ensure your code is pushed to a GitHub repository.
2. **Accounts**: You should have active accounts on [Vercel](https://vercel.com/) and [Render](https://render.com/).

---

## 🚀 Part 1: Deploying the Backend (Render)

Render will host the Spring Boot API using the `render.yaml` blueprint.
Database connections are supplied via environment variables (recommended: MySQL on Aiven/Railway/PlanetScale and MongoDB Atlas).

1. **Log in to Render Dashboard**.
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect `render.yaml` and create `ems-backend`.
5. In Render service settings, set the required environment variables:
  - `MYSQL_HOST`
    - `MYSQL_PORT` (default `3306`)
    - `MYSQL_DB`
    - `MYSQL_USER`
    - `MYSQL_PASSWORD`
    - `MYSQL_SSL_MODE` (typically `REQUIRED` for managed MySQL providers)
    - `MONGO_URI`
6. **Wait for the build to complete**. Once finished, copy the **Service URL** of `ems-backend` (e.g., `https://ems-backend.onrender.com`).

---

## 🌐 Part 2: Deploying the Frontend (Vercel)

Vercel will host your React application with a global edge network.

1. **Log in to Vercel Dashboard**.
2. Click **New Project** and import your GitHub repository.
3. In the **Configure Project** step:
  - **Framework Preset**: Create React App.
    - **Root Directory**: `frontend`.
4. Expand **Environment Variables** and add the following:
  - **Key**: `REACT_APP_API_URL`
    - **Value**: `https://ems-backend.onrender.com/api` (Use your Render Backend URL).
    - **Key**: `REACT_APP_AUTH_URL`
    - **Value**: `https://ems-backend.onrender.com` (Note: No `/api` suffix for auth).
5. Click **Deploy**.

---

## ✅ Part 3: Final Verification

1. Once Vercel finishes, open your live frontend URL.
2. Test the **Login** and **Registration** flows.
3. Verify that **Employee** and **Department** data is persisting correctly by refreshing the page.

> [!TIP]
> **For Persistence (Recommended)**:
>
> 1. Create a free cluster on **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**.
> 2. Create a free MySQL instance on **[Aiven](https://aiven.io/mysql)**.
> 3. Copy connection details and set `MONGO_URI` plus the MySQL variables (`MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DB`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_SSL_MODE`) in Render.

> [!IMPORTANT]
> **CORS**: If you encounter a CORS error, ensure that `ems-backend` is correctly reading the `REACT_APP_API_URL` of your Vercel deployment. Our `CorsConfig.java` is currently configured to be permissive for the demo.