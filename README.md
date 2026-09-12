<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Dollhouse Deviants

React 19 + TypeScript + Vite frontend with an Express/TypeScript server, Firebase client/Admin integration, and a protected Pinkie audit proxy backed by a Google Cloud Vertex AI reasoning engine.

Production is designed for Cloud Run. The application server serves the Vite build in production and uses Application Default Credentials for privileged Google Cloud/Firebase Admin calls.

## Local development

**Prerequisites**
- Node.js 22+
- npm
- Google Application Default Credentials with access to the required `dollhouse-deviants` Google Cloud/Firebase resources when testing protected server functionality

```bash
npm install
npm run dev
```

The server defaults to port `8080` unless `PORT` is set.

For local Google Cloud authentication, use a supported Application Default Credentials workflow. Do not place service-account private keys, access tokens, or Gemini/Vertex credentials in client code or commit them to this repository.

## Verification

```bash
npm run lint
npm run build
```

`npm run lint` currently runs TypeScript type checking with `tsc --noEmit`.

## Firebase

The browser Firebase configuration is read from `firebase-applet-config.json`. Treat Firebase client configuration as public application configuration, not as an authorization boundary. Authorization must be enforced with Firebase Security Rules and/or trusted server-side checks.

Privileged Firebase Admin operations remain server-side and use Application Default Credentials.

## Pinkie audit endpoint

`POST /api/audit` is a protected founder-only endpoint. The server:
- verifies a Firebase ID token;
- enforces the current founder authorization rule;
- rate-limits requests;
- validates prompt length;
- obtains Google Cloud credentials server-side;
- calls the configured Vertex AI reasoning engine;
- returns a sanitized error when the upstream service fails.

Do not replace this with a browser-exposed API key flow.

## Deployment

The repository includes a `Dockerfile` for Cloud Run/container deployment. Runtime port is taken from `PORT` and defaults to `8080`.

Before deployment, verify at minimum:

```bash
npm run lint
npm run build
```

Then verify the deployed service and custom domain independently; a successful Cloud Run service URL does not by itself prove the custom domain is routed correctly.

## A.I./Codex work

Read `AGENTS.md` before making changes. Current code, current CI/test results, and active focused issues/PRs override stale generated starter instructions or old chat summaries.
