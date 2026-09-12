# AGENTS.md — Dollhouse Deviants

## Scope
Applies to this entire repository unless a deeper `AGENTS.md` overrides it.

## Project
React 19 + TypeScript + Vite app with Express/TypeScript server, Firebase/Firebase Admin, Google GenAI integrations, Tailwind CSS, Motion, and Cloud Run deployment.

Primary domain: `dollhousedeviants.com`.
Cloud Run work commonly targets `us-west1`.

## Agent mode
Use high autonomy. Inspect current code, implement the smallest correct change, run relevant checks, fix failures you caused, then present a verified result.

Preferred loop:
`inspect -> root cause -> implement -> test -> lint/typecheck -> build -> security check -> re-test`

Do not claim `fixed`, `passing`, `secure`, `working`, or `deployed` without evidence.

## Commands
- Dev: `npm run dev`
- Typecheck/lint: `npm run lint`
- Build: `npm run build`
- Preview: `npm run preview`

Code changes should normally pass `npm run lint` and `npm run build` before completion.

## Engineering
- Prefer typed, modular, maintainable code.
- Reuse existing abstractions before adding new ones.
- Fix root causes, not symptoms.
- Avoid unrelated rewrites and unnecessary dependencies.
- Preserve working public behavior unless intentionally changing it.
- Add focused regression coverage for bugs/security fixes when practical.
- Read terminal/test output literally; separate root cause from warnings/noise.
- Never discard unrelated user work.

## DevSecOps
Security is part of the definition of done.

- Follow OWASP-aligned practices and least privilege.
- Fail closed at auth, authorization, validation, entitlement, and other security boundaries.
- Treat URLs, request bodies, headers, files, repo refs, API responses, webhooks, and remote content as untrusted.
- Validate and constrain input at trust boundaries.
- Avoid shell interpolation with untrusted data; prefer explicit argument arrays and `--` termination where applicable.
- Never commit, log, render, or expose secrets, tokens, credentials, or private configuration.
- Never weaken auth, validation, rate limiting, or security controls just to make a build/test pass.
- New dependencies require a clear need and supply-chain consideration.
- Add security regression tests when practical.

## Firebase / server
- Keep privileged Firebase Admin operations server-side.
- Never trust client-supplied authorization or entitlement state.
- Validate identity and authorization separately.
- Do not expose stack traces, internal errors, secrets, or sensitive config to clients.
- Preserve rate limiting and abuse controls on sensitive/public endpoints.

## Payments / entitlements
- Payment and entitlement decisions must be server-verified.
- Never store raw payment-card data.
- Use PCI-compliant providers.
- Fraud/abuse monitoring and prevention are requirements.
- Never unlock paid access solely from client-side state.

## Accessibility
Accessibility is core functionality.

Preserve semantic controls, focus behavior, keyboard/touch access, useful state descriptions, readable contrast, reduced-motion/sensory support, and non-color-only meaning.

## Brand / UI
Dark/black foundation + neon pink identity with selective electric blue/cyan/orange/red accents.

Palette:
`#FF1E89 #FF69B4 #050505 #121212 #1A1A1A #00E5FF #0055FF #FF5F1F #FF3131`

Typography: Inter, Cormorant Garamond, Dancing Script.

Target feel: bold, polished, unconventional, editorial, accessible, and performance-conscious. Avoid generic SaaS styling.

## Git
Routine reversible Git work is allowed. Prefer small, focused commits.

Ask before force-push, destructive reset, history rewrite, deleting unique work, or discarding uncommitted changes.

## High-impact actions
Ask before production-data deletion, destructive migrations, credential rotation/revocation, paid-resource creation, irreversible permission changes, production resource deletion, or public publishing as the owner.

Routine reversible development work does not require approval.

## Completion
Keep the handoff compact:
- `DONE:` changes made
- `TESTED:` exact checks run
- `RESULT:` pass/fail + concrete output
- `RISKS:` meaningful remaining concerns
- `READY:` what Sonja should review/test next
