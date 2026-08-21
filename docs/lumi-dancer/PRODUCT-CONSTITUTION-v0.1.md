# Lumi-Dancer Product Constitution & Architecture v0.1

> Status: Working constitution
> Date: 2026-08-20
> Product name: **Lumi-Dancer** (working name pending current trademark/name clearance)
> Purpose: Establish non-negotiable product, accessibility, privacy, security, payment, architecture, and release principles before implementation.

## 1. Product Mission

Lumi-Dancer is an Android-first real-time visual instrument and creator workstation inspired by the creative freedom of luminance-driven video synthesis while being easier to understand, safer to use, more accessible, more extensible, and more respectful of user ownership.

The product is **not** intended to be a pixel-for-pixel clone of Luminancer. We will recreate useful classes of behavior through our own implementation, interaction model, visual identity, code, assets, architecture, and terminology.

Core promise:

> Create strange, beautiful moving visuals without needing to understand a professional video synthesizer first.

## 2. Product Pillars

### CREATE
- Live camera processing
- Imported video processing
- Imported image processing
- Luminance thresholding
- Persistent light trails
- Feedback and recursive effects
- Color remapping and hue animation
- Motion effects
- Kaleidoscopic/mirror modes
- Glitch effects
- Audio-reactive parameters
- Presets
- Safe randomization
- Preset mutation
- Reusable effect chains

### UNDERSTAND
Every user-facing control must answer:
1. What does this control do?
2. What will increasing it do?
3. What will decreasing it do?
4. What is it useful for?
5. Is it expensive for the device/GPU?
6. Is there a sensory/photosensitivity implication?

Beginner-facing names are human-readable. Advanced mode may expose technical names and exact values.

### ACCESS
Accessibility is a first-class product capability, not a compliance afterthought.

### PUBLISH
One project should be able to produce platform-appropriate outputs for social, messaging, streaming, and creator workflows without forcing users to repeatedly rebuild the edit.

### PROTECT
Security, privacy, payment safety, fraud prevention, software supply-chain integrity, and auditable release provenance are acceptance criteria for the product.

## 3. Brand System

Derived from the current Dollhouse Deviants design system as a source reference.

### Core palette
- DD Neon Pink: `#FF1E89`
- Hot Pink: `#FF69B4`
- Near Black: `#050505`
- Dark Gray: `#121212`
- Surface: `#1A1A1A`
- Accessible Cyan: `#00E5FF`
- Light-mode Accessible Blue: `#0055FF`
- Orange Neon Accent: `#FF5F1F`
- Scarlet Neon Accent: `#FF3131`

### Typography reference
- Primary UI: Inter or a platform-appropriate metrically compatible equivalent
- Display/editorial: Cormorant Garamond where appropriate
- Signature/ornamental: Dancing Script only where it does not compromise readability

### Visual rule
The app chrome should be dark, calm, and legible so the generated visual artwork remains the visual focus. Neon color communicates state, selection, focus, recording, warnings, and deliberate accents rather than decorating every surface.

### Accessibility override rule
Brand colors never outrank legibility or perception needs. Accessibility modes may replace brand accent colors when necessary.

## 4. Accessibility & Sensory Suite

The existing Dollhouse Deviants Sensory Suite is the baseline concept. Lumi-Dancer expands it for an audiovisual creation environment.

### Required controls
- Focus Mode
- Reduced UI Motion
- Readable Typography
- High Contrast
- Color-Vision Support
- Light Theme
- Simplified Controls
- Large Touch Targets
- Screen-reader semantics
- One-handed control layout
- Haptic alternatives where meaningful
- Visual alternatives to audio-only state
- Non-color-only state communication

### Critical distinction: UI motion vs artwork motion
Reduced Motion must disable or reduce decorative interface motion **without automatically disabling the user's video effects**. The user controls their creative output separately.

### Photosensitivity safety
Lumi-Dancer must include a dedicated reduced-flash/sensory-safety mode.

Goals:
- warn before enabling aggressive strobe presets;
- allow users to limit automated strobe rates;
- prevent randomization from unexpectedly creating extreme flashing when safety mode is enabled;
- provide export-time analysis/warnings for potentially hazardous flashing patterns where technically feasible;
- never imply that an automated analysis guarantees seizure safety.

### Semantics
All actionable Compose controls must expose meaningful accessibility semantics, state descriptions, roles, and descriptions where needed. Custom visual controls must be testable through the semantics tree.

## 5. User Ownership & Offline-First Principles

A lesson from discontinued creative apps is that users must not lose access to their work simply because a vendor disappears.

Non-negotiable goals:
- Projects are usable locally without a mandatory cloud account whenever practical.
- Core creation/editing does not require cloud connectivity.
- Cloud sync is opt-in.
- Exported media remains standard media, not locked content.
- Project files use a documented, versioned schema.
- Migrations are explicit and tested.
- We should publish the project-file specification once stable enough to do so safely.
- User content is never used for model training unless separately, explicitly, and revocably opted in.

## 6. High-Level Android Architecture

### UI
- Kotlin
- Jetpack Compose
- Material/Compose primitives selectively themed to Lumi-Dancer
- Navigation kept shallow and predictable

### Capture
- CameraX unless a device-specific capability requires a lower-level Camera2 path

### Preview and media pipeline
- Jetpack Media3 / ExoPlayer for media preview where appropriate
- Media3 Transformer for import/export, trimming, scaling, rotation, encoding, and reusable effects where suitable

### Real-time visual engine
The renderer should be a separate module with a stable effect interface.

Initial conceptual graph:

`Input -> Luminance -> Threshold/Mask -> Trail Buffer -> Feedback -> Color -> Motion/Geometry -> Composite -> Preview/Encode`

Implementation candidates:
- custom OpenGL shader effects for initial compatibility and Media3 integration;
- evaluate Vulkan only where profiling demonstrates a real benefit;
- avoid CPU per-pixel processing for the real-time path;
- effects represented as data, not hard-wired to UI widgets.

### Engine portability principle
UI state and effect definitions must not own renderer implementation details. This keeps a future desktop or additional mobile implementation possible without rewriting the creative model.

## 7. Effect Model

Every effect must have:
- stable effect ID;
- version;
- parameter schema;
- safe/default ranges;
- human-readable explanation;
- optional advanced explanation;
- performance cost metadata;
- accessibility/sensory metadata;
- deterministic serialization;
- migration path when schemas change.

Example parameter metadata:

```text
id: trail.decay
label: Trail Length
advancedLabel: Frame Feedback Decay
range: 0.0..0.99
default: 0.82
explanation: Controls how long previous frames remain visible.
performanceCost: medium
sensoryRisk: low
```

## 8. Preset System

Initial preset families may include:
- LED Flow
- Fire
- Cyberpunk
- Ghost
- Laser
- Dream
- Vaporwave
- Glitch
- Liquid Light
- Long Exposure
- Music Reactive
- Kaleidoscope

### Randomize
Randomization must be constrained by effect compatibility and safe ranges rather than uniform random parameter generation.

### Mutate
Mutation keeps the recognizable identity of a preset while changing selected parameters within bounded ranges.

### Safety-aware generation
When Reduced Flash is enabled, randomize/mutate must exclude unsafe strobe classes and high-risk transitions.

## 9. Audio-Reactive System

Potential mappings:
- beat -> event trigger
- bass energy -> trail persistence / zoom feedback
- mid energy -> hue/gradient movement
- high-frequency energy -> sparkle/detail modulation
- onset -> pulse or scene change

Users must be able to disable each mapping and understand exactly what audio feature drives which visual parameter.

Microphone permission must be requested only when an audio-reactive feature requiring live input is invoked, not at first launch without context.

## 10. Social & Creator Output

### Export profiles
- 9:16 vertical
- 4:5 portrait feed
- 1:1 square
- 16:9 landscape
- custom dimensions where device capability permits

### Platform-oriented templates
Targets may include:
- TikTok
- Instagram Reels
- Instagram Stories
- YouTube Shorts
- YouTube landscape
- Facebook
- Threads
- X
- Bluesky
- Reddit
- Discord

Templates should include platform-safe overlays/guides where useful.

### Social Pack
A finished project may generate multiple derivatives from one master:
- vertical master;
- square crop;
- portrait feed crop;
- landscape version;
- short teaser;
- thumbnail;
- optional loop/GIF/WebP where appropriate;
- caption draft;
- optional hashtag/topic assistance;
- accessibility alt-text draft.

### Connector principle
Use direct authenticated publishing only where platform APIs, user scopes, app-review requirements, and policy permit it. Otherwise use Android's native share mechanisms. Never scrape credentials or automate private APIs.

### Future creator integrations
Evaluate:
- OBS workflows
- NDI where licensing/platform support is suitable
- RTMP/SRT streaming where appropriate
- external displays
- Chromecast
- MIDI
- OSC
- Bluetooth/USB controllers

## 11. Privacy Architecture

### Data minimization
Collect only what is required for the requested capability.

### Sensitive media
User camera footage, imported media, drafts, exports, audio, and creator metadata are private by default.

### Telemetry
- opt-in or strictly minimized where possible;
- no content payloads in analytics;
- no access tokens in analytics;
- no raw media filenames if they reveal user information;
- no advertising SDKs by default;
- crash reporting must scrub sensitive context.

### Secrets
- never commit secrets;
- never ship backend secrets in APK resources;
- use Android Keystore for device-held secret material when appropriate;
- server credentials live only in managed secret storage;
- rotate credentials;
- define breach/revocation procedures before production.

## 12. DevSecOps Baseline

Primary mobile security baseline:
- OWASP MASVS
- OWASP MASTG
- OWASP MASWE v1.0.0 (released 2026-08-17)

### Repository rules
- protected default branch;
- feature branches;
- pull-request review before merge;
- signed/provenanced release artifacts where practical;
- least-privilege GitHub/app permissions;
- CODEOWNERS once ownership roles exist;
- dependency update automation with review;
- no generated secret files committed.

### CI gates
Every production-bound change should eventually pass:
1. formatting/lint;
2. unit tests;
3. Compose/UI tests where applicable;
4. static application security testing;
5. dependency/SCA scan;
6. secret scan;
7. Android lint;
8. instrumentation tests for security-critical flows;
9. release build;
10. artifact/signing/provenance checks;
11. MASVS/MASWE coverage checks appropriate to the changed surface.

### High-risk feature gate
Authentication, payments, entitlement logic, external account linking, content upload, cryptography, deep links, update mechanisms, and remote configuration require explicit threat review.

## 13. Payment & Entitlement Constitution

### Absolute rule
Lumi-Dancer infrastructure must never store raw card numbers or security codes.

### Billing abstraction
The app consumes an internal entitlement API rather than embedding business logic around a specific payment provider throughout the codebase.

Conceptual interface:

```text
EntitlementService
  -> GooglePlayBillingProvider
  -> ApprovedWebBillingProvider (where policy permits)
  -> future legitimate provider adapters
```

### Server-side verification
Valuable entitlements are verified and reconciled server-side. Client-local `isPro=true` or equivalent is never authoritative for server-backed benefits.

### Fraud/theft controls
Required capabilities include:
- server-side purchase verification;
- transaction replay prevention;
- idempotency keys;
- webhook signature verification;
- duplicate transaction detection;
- refund/revocation reconciliation;
- chargeback handling;
- account/device risk signals used proportionally;
- rate limiting;
- anomaly monitoring;
- high-value action logging;
- alerting on meaningful fraud indicators;
- manual review path when automated systems are uncertain;
- no blanket punishment based on a single integrity signal.

### Play Integrity
For sensitive server-backed operations, evaluate Play Integrity verdicts for app integrity, device integrity, account details, and optional environment risk signals.

Integrity signals are risk inputs, not identity. Accessibility users must not be unfairly blocked because of legitimate accessibility services.

### PCI
If an alternative billing flow ever causes Lumi-Dancer-controlled systems to handle payment card data, the relevant PCI DSS obligations apply. Prefer provider-hosted/tokenized flows that reduce our PCI scope.

### Policy volatility
Google Play billing rules changed materially in 2025-2026 and may change again. Payment policy must be isolated behind configuration/provider boundaries and revalidated before launch.

## 14. Authentication & Account Linking

- Prefer OAuth 2.0 / OIDC with PKCE for public mobile clients.
- Never embed client secrets that assume confidentiality in the APK.
- Request the minimum scopes required for each social integration.
- Show the user what will be shared before linking/posting.
- Store refresh tokens only when needed and protect them appropriately.
- Make disconnect/revoke easy.
- A disconnected integration must fail closed.
- Never cross-post without an explicit user action or separately granted standing automation permission.

## 15. Threat Model Starting Categories

Initial threat categories:
- malicious or malformed imported media;
- hostile project files;
- malicious deep links/intents;
- token theft;
- account takeover;
- payment replay;
- fake client/APK entitlement spoofing;
- overlay/capture attacks during sensitive actions;
- compromised dependencies;
- build-pipeline credential theft;
- malicious social connector responses;
- SSRF/injection on future backend services;
- unsafe remote configuration;
- accidental private-media upload;
- metadata leakage;
- denial-of-service via oversized/hostile media;
- shader/GPU resource exhaustion;
- abusive automation/spam through social connectors.

## 16. Minimum Viable Product v0.1

Prove the creative engine before building the entire creator ecosystem.

MVP target:
1. Android camera input;
2. real-time luminance threshold;
3. adjustable persistent light trails;
4. basic color control;
5. stable preview;
6. record/export;
7. clear explanations for every visible control;
8. Reduced UI Motion and Reduced Flash foundations;
9. local project persistence;
10. no account required.

Performance objective: profile for smooth real-time behavior on representative mid-range Android hardware; do not claim 60 FPS universally until measured.

## 17. Post-MVP Logical Expansion

### Phase A — Creative core
- imported video;
- additional trail modes;
- feedback;
- color mapping;
- presets;
- mutate/randomize.

### Phase B — Audio and advanced synthesis
- microphone/file-driven analysis;
- beat/onset detection;
- audio mappings;
- mirrors/kaleidoscope;
- deeper feedback modes.

### Phase C — Creator workflow
- multi-aspect export;
- safe-area guides;
- Social Pack;
- metadata/caption helpers;
- share-sheet integration.

### Phase D — Accounts/cloud
Only when needed:
- optional account;
- project backup/sync;
- entitlement sync;
- connector token vault;
- device management.

### Phase E — Publishing & live performance
- reviewed social connectors;
- streaming output;
- OBS/NDI/RTMP/SRT evaluation;
- MIDI/OSC/controller support.

## 18. Explicit Non-Goals for Early Versions

- mandatory account creation;
- mandatory cloud rendering;
- storing raw card data;
- copying Luminancer proprietary code/assets/UI;
- every social connector at once;
- building our own video codec stack;
- adding AI merely because it is fashionable;
- shipping a security-sensitive feature without a threat review;
- claiming accessibility or seizure safety without appropriate testing and wording.

## 19. Decision Record Rules

Architectural choices with meaningful lock-in must be documented as ADRs.

Examples:
- renderer API choice;
- minimum Android SDK;
- backend platform;
- identity provider;
- payment provider;
- project-file schema changes;
- telemetry provider;
- cryptographic protocol choices;
- social connector strategy.

Each ADR must record:
- context;
- decision;
- alternatives considered;
- security/privacy/accessibility impact;
- reversibility;
- date and status.

## 20. Release Definition of Done

A release is not done merely because it builds.

A production release requires:
- functional acceptance criteria met;
- accessibility acceptance criteria met;
- privacy review completed;
- security gates passed;
- payment/fraud behavior tested if touched;
- migration tested if project schema changed;
- crash/recovery path tested;
- user data deletion/export behaviors tested when accounts exist;
- release notes;
- known risks documented;
- rollback strategy;
- signed/reproducible or attestable release provenance to the extent supported by the build pipeline.

## 21. Current Source References

Product source references and standards used while creating v0.1:
- Dollhouse Deviants current Remix 4.0 repository: brand tokens, sensory suite, accessibility context and styling.
- OWASP MASVS / MASTG / MASWE.
- OWASP MASWE 1.0.0 release dated 2026-08-17.
- Android Jetpack Compose accessibility semantics guidance.
- Android Jetpack Media3 Transformer and effect pipeline guidance.
- Google Play Integrity API documentation.
- Current Google Play US alternative-billing documentation (policy subject to change).

## 22. Open Decisions

These remain intentionally unresolved until evidence or implementation needs justify the choice:
- final public product name and trademark clearance;
- application/package ID;
- minimum Android SDK;
- backend/cloud provider;
- account system provider;
- payment provider beyond Play Billing;
- subscription vs one-time purchase vs mixed model;
- precise free/pro entitlement boundaries;
- public/open-source strategy;
- desktop implementation strategy;
- AI-assisted features, if any;
- direct social connector order.

---

### Constitution rule

If a future implementation shortcut conflicts with user ownership, accessibility, privacy, payment safety, or security principles in this document, the shortcut loses unless the constitution is deliberately amended with documented reasoning.
