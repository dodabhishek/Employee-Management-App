# Deployment Guide: EMS PRO (Vercel & Render)

This guide provides the necessary steps to deploy the **EMS PRO** application to a live production environment using **Vercel** (Frontend) and **Render** (Backend & Databases).

## Prerequisites

1.  **GitHub Repo**: Ensure your code is pushed to a GitHub repository.
2.  **Accounts**: You should have active accounts on [Vercel](https://vercel.com/) and [Render](https://render.com/).

---

## 🚀 Part 1: Deploying the Backend (Render)

Render will host your Spring Boot API, MySQL, and MongoDB using the `render.yaml` blueprint.

1.  **Log in to Render Dashboard**.
2.  Click **New +** and select **Blueprint**.
3.  Connect your GitHub repository.
4.  Render will automatically detect the `render.yaml` file. It will set up:
    - `ems-mysql`: Persistent MySQL database.
    - `ems-mongodb`: Persistent MongoDB instance.
    - `ems-backend`: The Spring Boot application.
5.  **Wait for the build to complete**. Once finished, copy the **Service URL** of `ems-backend` (e.g., `https://ems-backend.onrender.com`).

---

## 🌐 Part 2: Deploying the Frontend (Vercel)

Vercel will host your React application with a global edge network.

1.  **Log in to Vercel Dashboard**.
2.  Click **New Project** and import your GitHub repository.
3.  In the **Configure Project** step:
    - **Framework Preset**: Create React App.
    - **Root Directory**: `frontend`.
4.  Expand **Environment Variables** and add the following:
    - **Key**: `REACT_APP_API_URL`
    - **Value**: `https://ems-backend.onrender.com/api` (Use your Render Backend URL).
    - **Key**: `REACT_APP_AUTH_URL`
    - **Value**: `https://ems-backend.onrender.com` (Note: No `/api` suffix for auth).
5.  Click **Deploy**.

---

## ✅ Part 3: Final Verification

1.  Once Vercel finishes, open your live frontend URL.
2.  Test the **Login** and **Registration** flows.
3.  Verify that **Employee** and **Department** data is persisting correctly by refreshing the page.

> [!TIP]
> **Database Persistence**: Since we are using Render Disks in the blueprint, your data will persist even if the free tier services spin down due to inactivity.

> [!IMPORTANT]
> **CORS**: If you encounter a CORS error, ensure that `ems-backend` is correctly reading the `REACT_APP_API_URL` of your Vercel deployment. Our `CorsConfig.java` is currently configured to be permissive for the demo.
