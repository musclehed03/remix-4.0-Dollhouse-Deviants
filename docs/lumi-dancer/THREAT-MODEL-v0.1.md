# Lumi-Dancer Threat Model v0.1

> Status: Initial model
> Date: 2026-08-20
> Scope: Android-first MVP through early account/payment/social integration phases

## 1. Security Objectives

Lumi-Dancer must protect:
- user-created media and project files;
- account identity and linked social identities;
- payment entitlements and transaction integrity;
- OAuth tokens and session credentials;
- application signing/build credentials;
- backend APIs and infrastructure;
- release provenance and update integrity;
- user privacy and metadata;
- availability of local projects and exports.

## 2. Trust Boundaries

Treat these as separate trust zones:
1. Android UI process and app sandbox
2. Local media/project storage
3. GPU/media codec pipeline
4. Android OS services and intents/share targets
5. Google Play services / Play Integrity
6. Future Lumi-Dancer backend APIs
7. Payment providers
8. Social platform OAuth/API providers
9. CI/CD and source-control systems
10. Optional cloud storage/sync providers

No trust boundary may be crossed solely because data originates from the app UI.

## 3. Assets

High-value assets include:
- private media;
- unpublished exports;
- project files;
- OAuth access/refresh tokens;
- authentication sessions;
- subscription/purchase entitlements;
- signing keys;
- CI/CD credentials;
- webhook secrets;
- billing transaction identifiers;
- moderation/support records if introduced;
- security telemetry.

## 4. Primary Threat Actors

- opportunistic attacker;
- malicious app installed on device;
- repackaged/cracked APK distributor;
- fraudulent purchaser;
- account takeover attacker;
- malicious social integration endpoint or compromised provider account;
- malicious dependency/package publisher;
- compromised CI runner or developer token;
- abusive automation/spam operator;
- accidental insider/operator mistake.

## 5. Threats and Planned Controls

### T01 — Malicious imported media
Risk: malformed video/image/audio triggers parser/codec vulnerabilities, crashes, or resource exhaustion.

Controls:
- rely on maintained platform/media libraries;
- validate type/size/duration before processing;
- enforce memory/time/resource limits;
- handle codec failures without corrupting projects;
- fuzz/test project parsers we own;
- do not trust file extensions alone.

### T02 — Hostile project file
Risk: crafted project data causes unsafe deserialization, path traversal, oversized allocations, or schema confusion.

Controls:
- versioned schema;
- strict parsing and validation;
- no arbitrary class deserialization;
- bounded arrays/strings/numeric ranges;
- canonical project asset references;
- reject unknown dangerous fields; preserve safe forward compatibility deliberately.

### T03 — Deep-link / intent injection
Controls:
- explicit intent filters;
- validate origins and parameters;
- no privileged action directly from an untrusted deep link;
- user confirmation before externally triggered destructive/publishing actions.

### T04 — OAuth token theft
Controls:
- Authorization Code + PKCE;
- no client secret assumption in mobile app;
- minimum scopes;
- secure token storage;
- revocation/disconnect;
- redact logs and crash reports;
- rotate/revoke server-side where supported.

### T05 — Account takeover
Controls:
- modern identity provider/OIDC if accounts are introduced;
- phishing-resistant MFA/passkeys where feasible;
- session/device visibility;
- risk-based reauthentication for sensitive actions;
- rate limits and anomaly alerts.

### T06 — Premium entitlement spoofing / cracked APK
Controls:
- local flags are non-authoritative;
- server-verified purchases for server-backed premium functionality;
- signed cached entitlements for approved offline cases;
- Play Integrity as a proportional risk signal;
- revocation/refund reconciliation.

### T07 — Transaction replay / webhook forgery
Controls:
- signed webhook verification;
- idempotency;
- transaction uniqueness constraints;
- timestamp/replay windows where supported;
- reconciliation jobs;
- immutable audit records for entitlement changes.

### T08 — Overlay/capture/control attacks during sensitive actions
Controls:
- evaluate Play Integrity app-access-risk signals for payment/account actions;
- do not block legitimate verified accessibility services;
- step-up/retry path rather than indiscriminate lockout;
- avoid displaying long-lived secrets.

### T09 — Dependency compromise
Controls:
- dependency pinning/lockfiles;
- SCA and vulnerability monitoring;
- dependency update review;
- minimize third-party SDKs;
- avoid opaque analytics/ad SDKs;
- provenance/signature checks where ecosystem supports them.

### T10 — Build pipeline compromise
Controls:
- least-privilege GitHub/cloud tokens;
- protected branches;
- reviewed workflow changes;
- isolated production signing;
- secret scanning;
- artifact provenance/attestation;
- reproducibility investigation for release builds.

### T11 — Accidental private media upload
Controls:
- offline/local by default;
- explicit upload action;
- clear destination/visibility preview;
- no hidden background uploads;
- resumable uploads must preserve destination metadata and consent state.

### T12 — Metadata leakage
Controls:
- provide export metadata controls;
- do not embed account identifiers into files;
- review EXIF/location retention behavior;
- default to privacy-preserving metadata for transformed exports unless users choose otherwise.

### T13 — Social connector abuse / spam
Controls:
- explicit post preview;
- platform-approved APIs only;
- scope minimization;
- rate limiting;
- no automatic cross-posting without explicit action or clearly granted standing authority;
- revoke connector on suspicious provider responses.

### T14 — Remote configuration abuse
Controls:
- authenticated/signed configuration;
- no remote arbitrary code execution;
- bounded feature flags;
- sensitive security controls fail safe;
- configuration rollback/auditability.

### T15 — GPU/resource denial of service
Controls:
- parameter bounds;
- render-resolution caps based on device capability;
- frame-budget monitoring;
- memory-pressure handling;
- effect compatibility rules;
- cancelable export jobs.

### T16 — Photosensitivity harm
This is a user-safety threat, not a cybersecurity threat, but it belongs in the product risk model.

Controls:
- Reduced Flash mode;
- strobe warnings;
- bounded randomization;
- export analysis where feasible;
- no claim of guaranteed seizure safety;
- preserve user control over creative output.

## 6. Payment/Fraud Threats

Monitor for:
- repeated purchase failures;
- rapid account creation/purchase/refund cycles;
- reused transaction tokens;
- impossible entitlement state transitions;
- excessive restore attempts;
- chargeback clusters;
- webhook mismatch/replay;
- abnormal device/account churn;
- scripted high-value API use.

Responses must be proportionate. Risk scoring should support allow, challenge/re-authenticate, delay/manual review, or deny rather than only allow/ban.

## 7. Security Logging Rules

Log security-relevant events without logging secrets or user media.

Examples:
- login success/failure class;
- entitlement transitions;
- billing verification outcome;
- connector link/revoke;
- suspicious integrity verdict category;
- rate-limit activation;
- privileged configuration changes;
- release/deployment identifiers.

Never log:
- raw access tokens;
- refresh tokens;
- card numbers/security codes;
- raw private media;
- passwords;
- signing keys.

## 8. Security Review Trigger List

A dedicated review is required before merging changes involving:
- authentication/session logic;
- billing/entitlements;
- OAuth/social publishing;
- project-file parsing;
- deep links/intents;
- cryptography;
- network security configuration;
- remote config;
- update mechanisms;
- media upload/cloud sync;
- release signing;
- CI/CD permissions.

## 9. Verification Baseline

Map implementation and tests to:
- OWASP MASVS;
- OWASP MASTG;
- OWASP MASWE 1.0.0;
- Android platform security guidance;
- payment-provider security requirements;
- PCI DSS only to the extent applicable to systems in scope.

## 10. Open Threat-Model Questions

Revisit when architecture decisions are made:
- backend provider;
- account provider;
- exact billing architecture;
- cloud sync provider;
- direct social connectors;
- streaming protocols;
- public project sharing/community features;
- AI/media-analysis features;
- desktop support.
