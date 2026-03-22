# CalmMind AI

A static landing page for CalmMind AI — an AI-powered self-reflection journaling tool.

## Project Structure

```
projects/
  calm-mind/
    index.html   - Main landing page (Russian language)
    style.css    - Styles
    script.js    - Interactive functionality (FAQ accordion, modal, form handling)
```

## Running Locally

The app is served as a static site using `serve`:

```
npx serve projects/calm-mind -l 5000
```

Workflow: **Start application** — serves on port 5000 (webview).

## Deployment

Configured as a **static** deployment with `publicDir: projects/calm-mind`.

## Tech Stack

- Pure HTML, CSS, JavaScript (no build step)
- Served via `serve` (npm package, installed globally)
- Russian-language UI
