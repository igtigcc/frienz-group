# Freindz 💗

A cozy, responsive, multi-page friendship and gaming hangout website. Built with plain HTML, CSS and JavaScript — no build tools, package installs, frameworks, API keys or backend required.

## Pages

- `index.html` — home page and feature shortcuts
- `calendar.html` — local hangout calendar
- `chat.html` — tab-session demo chats and contact sidebar
- `groups.html` — local Looking for Group board
- `profile.html` — local profile and photo
- `settings.html` — themes, custom colors and generated melodies

## Run locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. For the most reliable local testing, you can also run a tiny local server from this folder:
   - Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

There are no dependencies to install.

## Publish with GitHub Pages

1. Create a new repository on GitHub.
2. Upload the contents of this folder (the `index.html` file must be at the repository root).
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then save.
6. Wait for the Pages deployment to finish. GitHub will show your published URL in the Pages settings.

All internal links use relative paths, so the site also works when published under a GitHub project-repository URL.

## Important: local demo, not a live social network

This project is intentionally static so it can be hosted on GitHub Pages:

- Calendar plans, profile, settings and group posts are stored in the browser's `localStorage`.
- Demo chat messages use `sessionStorage` and normally disappear when the tab/session ends.
- Contacts and messages are local examples. No message is sent to another person.
- The site does not create real accounts, authenticate users, or sync data between devices.
- The "I'm interested" button is a demo notice, not a real invitation system.
- Never enter a real password or sensitive personal information into this demo.

For real accounts, cross-device storage, live chat, moderation and shared group posts, you would need a backend service and proper authentication. GitHub Pages alone cannot provide those server features.

## Project structure

```text
freindz-github/
├── index.html
├── calendar.html
├── chat.html
├── groups.html
├── profile.html
├── settings.html
├── README.md
├── .nojekyll
└── assets/
    ├── css/
    │   └── styles.css
    ├── img/
    │   └── favicon.svg
    └── js/
        ├── app.js
        ├── calendar.js
        ├── chat.js
        ├── groups.js
        ├── profile.js
        └── settings.js
```

## Customize

- Change colors and layout in `assets/css/styles.css`.
- Change the home page in `index.html`.
- Each page has its own JavaScript file in `assets/js/`.
- The site uses a Google Fonts import as a progressive enhancement. If Google Fonts is unavailable, it falls back to system fonts.
