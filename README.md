<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Git Karma

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Japanese](https://img.shields.io/badge/lang-Japanese-red.svg)](README.ja.md)

**Git Karma** is a mutual contribution platform for Open Source Software. It gamifies the OSS experience by allowing developers to "barter" their skills: help others to earn Karma, and use that Karma to get help on your own projects.

> "Your project isn't moving because you aren't helping someone else's project."

[日本語のREADMEはこちら](README.ja.md)

</div>

## Concept

Git Karma acts as a "Time Bank" for developers. It solves the problem of neglected OSS projects by creating a circular economy of contributions. Unlike traditional "issue finding" services, Git Karma focuses on **reciprocal exchange**.

## Features

- **🤝 Mutual Contribution Matching**: Automatically matches your skills (e.g., Python, React) with projects that need them.
- **💎 Karma System**: A credit-based system where you earn points by contributing (Code, Docs, Reviews) and spend them to attract contributors to your repo.
- **🛡️ Quality Assurance**: Mutual rating system ensures high-quality contributions. To prevent spam, contributions are verified via merged PRs.
- **🔄 Pay It Forward**: A "Deposit System" where new users must contribute to an existing issue before registering their own repository.
- **🏆 Gamification**: Earn badges and maintain streaks for consistent activity.

## Getting Started

1. **Sign up with GitHub**: Log in to the Git Karma platform using your GitHub account.
2. **Pay it Forward (Deposit)**: Before you can ask for help, you must help others. Solve one "Good First Issue" from our curated list to activate your account.
3. **Earn Karma**: Your contribution is verified, and you earn your first Karma points.
4. **Register Your Project**: Use your Karma to list your own repository and attract contributors.

> *Note: While we start as a Web Platform, a CLI tool for terminal-based interaction is planned for the future.*

## Directory Structure

- **`frontend/`**: Next.js application for the User Interface.
- **`backend/`**: Next.js application for the API and Business Logic.
- **`.github/`**: GitHub templates and workflows.

## Development (Run Locally)

You will need to run both the frontend and backend servers.

### Frontend (UI)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (Port 3000):
   ```bash
   npm run dev
   ```

### Backend (API)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server (Port 3001):
   ```bash
   npm run dev -- -p 3001
   ```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
