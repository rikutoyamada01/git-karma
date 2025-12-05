---
description: Guide for fixing GitHub OAuth redirect_uri errors in Vercel Preview
---

# GitHub OAuth Setup for Vercel Preview

When deploying to Vercel Preview, you will encounter the `redirect_uri is not associated with this application` error because the dynamic Preview URL is not whitelisted in your GitHub OAuth App.

## Quick Fix (For a specific Preview)

1.  **Copy your Vercel Preview URL** from the browser address bar.
    *   Example: `https://git-karma-git-develop-yamadarikuto.vercel.app`
2.  Go to **[GitHub Developer Settings](https://github.com/settings/developers)**.
3.  Select your OAuth App (e.g., "GitKarma").
4.  Scroll down to **"Authorization callback URL"**.
5.  Add the full callback path:
    *   Format: `[YOUR_PREVIEW_URL]/api/auth/callback/github`
    *   Example: `https://git-karma-git-develop-yamadarikuto.vercel.app/api/auth/callback/github`
6.  Click **Update Application**.

## Recommended Workflow (Stable)

Since Vercel generates a new URL for every commit, adding them manually is tedious. Use the **Branch URL** instead.

1.  In Vercel, your branch (e.g., `develop`) has a consistent URL like:
    *   `https://git-karma-git-develop-[project-name].vercel.app`
2.  Register **this specific URL** in GitHub.
3.  Always access your preview via this consistent Branch URL, rather than the commit-specific URL.

## Environment Variables

Ensure your Vercel Project Settings have the correct Environment Variables for the Preview environment:

*   `AUTH_SECRET`: (Must be set)
*   `AUTH_GITHUB_ID`: (Your GitHub App Client ID)
*   `AUTH_GITHUB_SECRET`: (Your GitHub App Client Secret)

**Note:** You can use the same GitHub App for Localhost and Preview by adding multiple callback URLs (if supported) or simply by updating it. For a serious project, create a separate "GitKarma (Dev)" app on GitHub.
