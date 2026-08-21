# Lumi-Dancer MVP Backlog v0.1

> Status: Planning backlog
> Goal: Prove the creative engine with an accessible, secure, offline-first Android MVP before expanding into accounts, payments, or direct social publishing.

## Epic 0 — Project Foundation

### LD-001 Create dedicated Lumi-Dancer repository
Acceptance:
- separate repository from Dollhouse Deviants;
- protected default branch;
- feature-branch workflow;
- baseline README, LICENSE decision, SECURITY.md, CONTRIBUTING.md, CODEOWNERS when appropriate;
- no secrets committed;
- branch protections configured before production credentials exist.

### LD-002 Define Android package/application ID
Acceptance:
- independent of Dollhouse Deviants;
- no third-party trademark embedded in package ID;
- consistent debug/release namespace plan.

### LD-003 Establish build toolchain
Acceptance:
- Kotlin;
- Jetpack Compose;
- reproducible Gradle setup;
- dependency version catalog;
- CI build works from clean checkout.

### LD-004 Establish CI security gates
Acceptance:
- lint;
- unit tests;
- Android lint;
- dependency scan;
- secret scan;
- SAST where practical;
- release workflow separated from normal PR builds.

## Epic 1 — Design System & Accessibility

### LD-101 Port Lumi-Dancer brand tokens
Use source reference:
- #FF1E89 neon pink
- #FF69B4 hot pink
- #050505 near-black
- #121212 dark gray
- #1A1A1A surface
- #00E5FF accessibility cyan
- #0055FF light-mode accessibility blue

Acceptance:
- tokens centralized;
- no random hardcoded product colors in feature screens;
- contrast checked for supported modes.

### LD-102 Build Sensory Suite shell
Controls:
- Focus Mode
- Reduced UI Motion
- Readable Typography
- High Contrast
- Color-Vision Support
- Light Theme
- Simplified Controls
- Reduced Flash

Acceptance:
- preferences persist locally;
- changes apply without restart;
- each control has plain-language explanation.

### LD-103 Compose semantics baseline
Acceptance:
- interactive controls expose roles/state descriptions;
- custom sliders have meaningful accessible names and values;
- icons used as actions have descriptions;
- accessibility UI tests cover critical controls.

### LD-104 Large-target / one-handed layout
Acceptance:
- critical controls usable with large touch targets;
- primary live controls reachable in one-handed portrait usage;
- no essential action depends on hover or tiny icons.

## Epic 2 — Real-Time Input

### LD-201 CameraX preview
Acceptance:
- rear camera preview;
- front/rear camera switching if supported;
- permissions requested contextually;
- denial/revocation handled without crash;
- no network required.

### LD-202 Frame-to-renderer interface
Acceptance:
- camera UI does not own effect implementation;
- frame lifecycle is explicit;
- renderer can later accept video/image sources.

### LD-203 Device capability profiler
Acceptance:
- identifies usable render resolution/frame-rate envelope;
- records no identifying device telemetry unless user opts in;
- can select conservative defaults.

## Epic 3 — Visual Engine MVP

### LD-301 Luminance conversion
Acceptance:
- GPU-based real-time path;
- deterministic parameter behavior;
- performance instrumented.

### LD-302 Threshold/mask effect
Controls:
- Threshold
- Softness/Feather if technically useful

Acceptance:
- immediate preview;
- values bounded;
- beginner explanation included.

### LD-303 Persistent trail buffer
Controls:
- Trail Length / decay
- Trail intensity

Acceptance:
- feedback buffer bounded in memory;
- no unbounded frame accumulation;
- graceful reset when resolution changes.

### LD-304 Basic color mapping
Controls:
- hue
- saturation
- brightness/intensity
- optional two-color gradient map

Acceptance:
- works in real-time within supported device envelope;
- accessible labels do not rely on color alone.

### LD-305 Effect graph serialization
Acceptance:
- effect chain stored as versioned data;
- stable IDs and parameter schema;
- no UI-specific state required to reconstruct render output.

## Epic 4 — Controls That Teach

### LD-401 Explainable slider component
Each parameter displays:
- friendly name;
- short explanation;
- current value;
- low/high meaning;
- optional advanced name/value;
- performance/sensory indicator if relevant.

### LD-402 Beginner vs Advanced mode
Acceptance:
- same underlying parameter state;
- mode switching does not change output;
- advanced mode exposes precision without making beginner UI cryptic.

### LD-403 Undo/redo parameter changes
Acceptance:
- bounded history;
- does not duplicate frame buffers;
- clear reset-to-default action.

## Epic 5 — Sensory Safety

### LD-501 Reduced Flash enforcement hooks
Acceptance:
- effect metadata can mark flash/strobe risk;
- safety mode can constrain affected parameters;
- randomization respects safety mode.

### LD-502 Strobe warning pattern
Acceptance:
- explicit warning before enabling aggressive flashing preset/effect;
- warning can be understood with screen reader;
- does not use flashing UI to warn about flashing.

### LD-503 Export flash-analysis feasibility spike
Research/Prototype:
- determine whether automated frame-luminance analysis can identify suspicious temporal flash patterns efficiently;
- document false positive/negative limits;
- never present result as medical certification.

## Epic 6 — Local Projects

### LD-601 Versioned project schema
Acceptance:
- documented schema version;
- strict input validation;
- bounded values;
- migration test fixture.

### LD-602 Autosave/recovery
Acceptance:
- recover after process kill/crash where practical;
- never overwrite last-known-good project before successful save;
- corruption handling offers recovery rather than silent loss.

### LD-603 Local media references
Acceptance:
- Android scoped-storage compliant;
- revoked/moved input files handled cleanly;
- no broad storage permission unless genuinely necessary.

## Epic 7 — Record & Export

### LD-701 Record processed output
Acceptance:
- usable H.264/AAC baseline where supported;
- output playable in standard Android media apps;
- failures surfaced clearly.

### LD-702 Media3 Transformer export path
Acceptance:
- reusable export service;
- cancellation/progress;
- hardware acceleration where available;
- clean fallback/error behavior.

### LD-703 Export metadata privacy
Acceptance:
- inspect output metadata behavior;
- do not inject account/device identifiers;
- location metadata preserved only deliberately.

### LD-704 Native share sheet
Acceptance:
- user explicitly selects destination;
- exported media shared via Android-supported URI permissions;
- no direct social credentials required.

## Epic 8 — Preset Foundation

### LD-801 Preset schema
Acceptance:
- versioned effect graph + metadata;
- name/description;
- accessibility/sensory metadata;
- performance tier.

### LD-802 Starter presets
Minimum:
- LED Flow
- Ghost
- Neon Trail
- Long Exposure
- Cyberpunk

### LD-803 Constrained randomize
Acceptance:
- never generates invalid effect graph;
- respects parameter bounds;
- respects Reduced Flash;
- reversible through undo.

### LD-804 Mutate
Acceptance:
- changes limited subset/amount;
- retains recognizable preset character;
- reproducible with optional seed for debugging.

## Epic 9 — Security Validation

### LD-901 Project-file parser abuse tests
Cases:
- oversized numbers;
- huge arrays;
- unknown fields;
- invalid enums;
- path tricks;
- corrupt/truncated files.

### LD-902 Intent/deep-link tests
Even before public deep links exist, exported/share intents must be tested for malformed input and privilege confusion.

### LD-903 Media resource-abuse tests
Cases:
- extremely large resolution;
- long duration;
- corrupt stream;
- unsupported codec;
- repeated cancel/retry.

### LD-904 MASVS/MASWE mapping
Acceptance:
- relevant controls mapped to tests/evidence;
- gaps tracked as backlog items rather than hand-waved.

## Epic 10 — Performance & Reliability

### LD-1001 Frame budget instrumentation
Track locally during development:
- render time;
- dropped frames;
- GPU/CPU hotspots where accessible;
- memory pressure.

### LD-1002 Thermal/battery behavior
Acceptance:
- long-running preview test;
- graceful quality reduction strategy considered;
- no silent runaway background processing.

### LD-1003 Export reliability matrix
Test representative:
- device tiers;
- orientations;
- input codecs;
- resolutions;
- durations.

## MVP Release Gate

MVP candidate cannot ship until:
- camera -> luminance -> threshold -> trails -> color -> preview works;
- record/export works;
- local project save/recovery works;
- no account required;
- Sensory Suite core controls work;
- every visible creative control explains itself;
- accessibility semantics tested;
- Reduced Flash foundations work;
- security scans pass at agreed threshold;
- project parser/input tests pass;
- known device/performance limitations documented;
- user content remains local unless user explicitly shares/exports it.

## Deferred Until After MVP

Do not block MVP on:
- subscriptions/payments;
- cloud accounts;
- direct social OAuth publishing;
- OBS/NDI/RTMP/SRT;
- MIDI/OSC;
- AI caption generation;
- desktop client;
- community/public sharing.

Those systems should be layered onto a proven visual engine rather than used to distract from it.
