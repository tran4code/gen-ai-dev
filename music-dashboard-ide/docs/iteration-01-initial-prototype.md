# Iteration 01: Initial Prototype
**Date:** 2026-03-23
**Duration:** Single session (~2 hours)
**Tool:** Claude Code (Opus 4.6)
**Phase:** Phase 1 — Analysis & Exploration

---

## What We Built

A three-panel IDE environment where students write small Python functions that directly power a Spotify-like music dashboard. The environment has:

- **File tree** (left) — virtual Python project structure (`utils/formatters.py`, `utils/filters.py`, `data/songs.py`)
- **Constrained code editor** (center) — Monaco editor showing full Python files, with only the function body editable (between `# --- YOUR CODE START/END ---` markers)
- **Task panel** (center-bottom) — task description, test results (pass/fail), progressive hints
- **Live dashboard preview** (right) — Spotify-themed UI with TrackList, StatsCards, Sidebar, PlayerBar that updates when student code produces valid output
- **Inspect mode** — click dashboard elements to navigate to the code that powers them

**Stack:** React 19, TypeScript, Vite 6, Tailwind CSS, Monaco Editor, Pyodide (Python-in-browser), Zustand

**Dataset:** 102 tracks from 22 popular artists (Taylor Swift, Drake, The Weeknd, Billie Eilish, etc.)

**6 tasks across 2 modules:**

| Module | Task | Function | Dashboard Impact |
|--------|------|----------|-----------------|
| 1: Basics | 1 | `format_track(track)` | Track display names |
| 1: Basics | 2 | `format_duration(ms)` | Duration column |
| 1: Basics | 3 | `get_track_names(tracks)` | Sidebar track list |
| 2: Filtering | 4 | `filter_by_artist(tracks, name)` | Filtered track view |
| 2: Filtering | 5 | `filter_long_tracks(tracks, min_ms)` | "Long Tracks" section |
| 2: Filtering | 6 | `get_top_tracks(tracks, n)` | "Top Tracks" card |

---

## Design Rationale (Linked to Theory)

### 1. "IDE, not worksheet" — the scaffolded playground metaphor
**Decision:** Students see a file tree, open `.py` files, and edit function bodies inside what looks like a real project — not an isolated code cell or worksheet.

**Theory:** *Constructionism* (Papert) — learners construct knowledge by building artifacts within meaningful contexts. A realistic project structure situates the code inside a purpose ("you're building a music app") rather than an abstract exercise ("write a function that filters a list").

**Theory:** *Situated cognition* (Brown, Collins, Duguid) — knowledge is inseparable from the context in which it's used. By embedding tasks inside a realistic app, students learn programming concepts in a context closer to how they'd actually be used.

### 2. Constrained editing (read-only regions)
**Decision:** Students can only edit the function body between markers. The imports, function signature, docstring, and export are visible but locked.

**Theory:** *Cognitive Load Theory* (Sweller) — extraneous load is reduced by removing decisions the student doesn't need to make yet (what to import, how to name the function, how to structure the file). The intrinsic load (the actual logic: loops, conditionals) is preserved.

**Theory:** This implements the *"AI/system authored context, student authored logic"* principle directly. The system handles the scaffolding; the student handles the thinking.

### 3. Live dashboard as output (no console, no "Run" button)
**Decision:** There is no console output panel. There is no "Run" button. Student code auto-executes on keystroke (debounced), and the dashboard preview updates with the return value of their function.

**Theory:** *Constructionism* again — the artifact (the dashboard) is the feedback. When `filter_by_artist()` works, the student sees the track list change. This is more meaningful than seeing `[{'name': 'Anti-Hero', ...}]` printed to a console.

**Theory:** *Self-Determination Theory* (Ryan & Deci) — competence is made visible. The student can see their code making a real thing work, which supports intrinsic motivation.

### 4. Python (not JavaScript)
**Decision:** Despite the dashboard being a JavaScript/React app, students write Python. Pyodide bridges the gap.

**Rationale:** The target population (non-CS-majors in CS1) learns Python. Using JavaScript would be coherent with the app metaphor but would require teaching a different language than their course uses. Python is the higher priority.

**Tradeoff acknowledged:** There's now a ~3-5 second Pyodide load time and a serialization boundary (Python return → JSON → React state). The "you're working inside the real app" illusion is slightly weaker because `.py` files don't actually run a JS dashboard. But for CS1 students, this distinction is unlikely to matter.

### 5. Click-to-code (inspect mode)
**Decision:** An "Inspect" toggle lets students hover over dashboard elements to see which function powers them, and click to navigate to that function in the editor.

**Theory:** *CLT / split-attention effect* — rather than requiring students to mentally map "which code affects which UI element," the tool makes the connection explicit. This reduces extraneous load.

**Theory:** Supports *metacognition* — students can see the causal chain from code to output, supporting their mental model of how programs work.

### 6. CS1-level solutions and hints only
**Decision:** All solutions use basic for loops, if/else, variables, and `.append()`. No list comprehensions, lambda, f-strings, slicing, or `sorted()` with `key=`.

**Rationale:** The target learners are encountering loops and variables for the first time. Advanced Python idioms are pedagogically harmful at this stage — they look like magic, can't be debugged by beginners, and don't build the foundational mental models that CS1 is trying to establish.

---

## Key Decision: Architecture Pivot from Old Prototype

The existing prototype (`spotify-learning/`) used a **collapsible side panel** approach — the Spotify UI was the main experience, and a learning panel slid out from the right with a code editor and problem list.

We rejected this in favor of the **three-panel IDE layout** because:

1. The side panel felt like an add-on, not an integrated experience. Students were "visiting" a code editor inside a music app, rather than "working inside a codebase."
2. The old approach used console output (print statements) as feedback. The new approach uses the dashboard itself as feedback — the student's function return value directly populates UI components.
3. The file tree creates the illusion of a real project, which better serves the constructionist goal.
4. The old prototype's Pyodide integration captured stdout. The new one captures return values and serializes them to JSON, which enables the "code powers the UI" loop.

---

## What Went Wrong (Bugs & Fixes)

### Bug 1: Python IndentationError
**What happened:** The execution engine injected the student's code (which was indented as a function body, e.g., `    names = []`) directly into a top-level Python harness. Python saw unexpected indentation.

**Root cause:** The executor stored only the editable lines (between markers), not the full function definition. When injected into the harness at the top level, the 4-space indent was invalid.

**Fix:** The executor now reconstructs the full Python file (function def + student body) from the file template before injecting into the harness.

**Lesson:** The boundary between "student code" and "system code" needs to be at the function level, not the line level. The template is the unit of execution.

### Bug 2: Editor blocked all editing
**What happened:** After the first keystroke, the constrained editor reverted the change and became unresponsive.

**Root cause:** The edit constraint used `model.setValue()` to revert changes to read-only regions, which triggered another `onDidChangeModelContent` event, creating an infinite loop. Also, the marker line numbers were captured at mount time and never recalculated, so they drifted as the student typed.

**Fix:** (1) Used `editor.trigger('keyboard', 'undo')` instead of `model.setValue()` for reverting. (2) Recalculate marker positions on every change event.

**Lesson:** Monaco's change events are synchronous and re-entrant. Any handler that modifies the model must guard against recursion.

### Bug 3 (minor): Vite 8 / rolldown compatibility
**What happened:** The initial scaffold used Vite 8 (latest), which uses rolldown as the bundler. Several npm packages (`react-resizable-panels`, type-only exports) failed to build.

**Fix:** Pinned to Vite 6 and `react-resizable-panels@2` for stability.

**Lesson:** Cutting-edge tooling introduces friction. For a research prototype, stability matters more than performance.

---

## Design Tradeoff: Python Inside a JavaScript App

### The tension
Students write Python, but the dashboard is React/TypeScript. There is a hidden translation layer (Pyodide → JSON → Zustand → React) the student never sees. The `.py` files in the file tree don't actually run the dashboard.

### Why Python is the right choice

- **Curricular alignment** — CS1 at this institution teaches Python. Students use Python in their other assignments, exams, and future courses. Teaching JS here would create an isolated skill that doesn't transfer to the rest of their learning.
- **Lower syntax barrier** — Python's syntax for loops and conditionals is closer to pseudocode. `for track in track_list:` vs `for (let track of trackList) {`. For non-majors writing their first loop, every curly brace and semicolon is extraneous cognitive load.
- **The abstraction is pedagogically honest** — in real software, components consume data from APIs written in languages they don't control. A Python backend feeding a React frontend is a common real-world architecture. The student is playing the role of "backend logic author," which is a real role.
- **The learning objectives don't require JS** — we are teaching loops, conditionals, filtering, and aggregation. These are language-agnostic concepts. Python is the vehicle. The dashboard is the motivation, not the subject.

### Why the illusion holds for CS1 non-majors
- They don't know what React is or what powers web UIs
- They won't question why a `.py` file makes a dashboard update
- A student who DOES get curious enough to ask is already succeeding — the environment sparked inquiry

### Why the serialization boundary doesn't matter
- It is invisible by design, the same way Scratch hides the JavaScript that executes sprite movements, or Jupyter notebooks hide the kernel communication protocol
- Every educational tool has a translation layer. The question is whether it leaks. In this case it doesn't — the student writes Python, sees results in the UI, never encounters JSON or React
- The Pyodide load happens once at startup (~3-5s). Per-execution latency is under the 600ms debounce. Students won't notice

### The framing for the paper
- **The design principle is "AI/system authored context, student authored logic."** The language the context is written in (TypeScript/React) is irrelevant to the student. They never see it, never edit it, never need to understand it. The language the student logic is written in (Python) must match their course.
- **The dashboard is a motivational context, not a technical subject.** We are not teaching web development. We are teaching programming fundamentals using a music app as the situated context. The dashboard exists to make `filter_by_artist()` meaningful. Whether it's rendered by React or by magic is immaterial to the learning objective.
- **This mirrors how AI-assisted development works.** Developers increasingly write logic in one context that gets consumed by systems they didn't author. A student writing a Python function that feeds into a system-generated UI is closer to modern practice than a student hand-writing both the logic and the rendering.

---

## Key Concepts: Situated Context vs. Artifact

Two theoretical concepts combine in this prototype. They are distinct and should be cited separately.

**Situated context** (Brown, Collins, & Duguid, 1989 — situated cognition): Learning happens within a context that resembles how the knowledge will actually be used. A "situated" programming exercise is one embedded in a realistic context (building a music app) rather than a decontextualized one (write a function that filters a list of numbers). Situated context can be provided through narrative alone — just telling the student "you're building a music app" and giving them music data.

**Artifact** (Papert, 1991 — constructionism): A tangible thing the learner creates that they can point to, share, and say "I made that." The artifact provides visible evidence of competence. In this prototype, the artifact is the functioning dashboard — when the student's function works, the UI visibly changes.

**How they combine in this prototype:** The student writes code within a realistic context (situated) and sees their code produce a visible, recognizable thing (artifact). The dashboard is simultaneously the situating context and the artifact. The theoretical contribution of this work is showing how they interact: context provides motivation, artifacts provide feedback, and together they scaffold learning in a way that neither does alone.

**Why this distinction matters for experimental design:** To test whether the dashboard adds value, you need to isolate contextualization from artifact feedback. A student who reads "you're building a music app filter" and sees console output has situated context but no artifact. A student who sees the dashboard update has both. If the dashboard group outperforms the narrative group, the difference is attributable to the artifact, not the context.

---

## Possible Experimental Design (Three Conditions)

To cleanly isolate what the prototype contributes, a three-condition between-subjects design:

| Condition | What student sees | Theoretical variable |
|-----------|------------------|---------------------|
| **Isolated** | Monaco editor + console output. No file tree, no dashboard. Just "write `filter_by_artist()`" and see printed result. | No context, no artifact |
| **Narrative** | Same editor + console, but with a written narrative: "You're building the filter feature for a music app. Here's what the data looks like..." | Situated context, no artifact |
| **Situated** | Full IDE: file tree + constrained editor + live dashboard | Situated context + artifact feedback |

All three conditions use the same Python tasks, the same dataset, the same function signatures. Only the surrounding context and feedback modality differ.

### Research questions this design supports
1. Does narrative contextualization alone improve self-efficacy and engagement compared to isolated exercises? (Isolated vs Narrative — tests **situated cognition**)
2. Does artifact feedback improve conceptual understanding beyond narrative contextualization? (Narrative vs Situated — tests **constructionism**)
3. Is there an interaction between contextualization type and prior programming experience? (tests **CLT** — maybe novices benefit from the dashboard's reduced interpretation load but experienced students don't need it)

### Why this design is strong
- The Narrative condition controls for "just making it about music" — if the Situated group does better than Narrative, it's not just because music is motivating
- Effects can be attributed to specific design features (context vs. artifact)
- Connects to multiple theories, which makes for a richer discussion section
- The three conditions map to a clear design framework other researchers can build on

### What this means for the prototype
Building the two comparison conditions (Isolated and Narrative) would be simpler than what already exists — they're essentially the current prototype with panels removed. The Isolated condition is just an editor + console. The Narrative condition adds task descriptions with the music app story.

### Measures
- **Self-efficacy** — pre/post survey (e.g., adapted CS self-efficacy scale)
- **Conceptual understanding** — transfer tasks (can the student apply filter/loop to a new domain?)
- **Engagement/persistence** — learning analytics (tasks attempted, time on task, hint usage)
- **Identity** — post interview ("do you see yourself as someone who can build things?")

---

## Conjectures to Test (Preliminary)

These are initial conjectures based on the design principles. They need refinement before Cycle 1.

1. **Scaffolded context conjecture:** Students who work inside the IDE environment (file tree + constrained editing + live preview) will report higher engagement than students doing equivalent tasks in a traditional code cell interface. *(SDT — relatedness/competence)*

2. **Live feedback conjecture:** Students who see their function output as dashboard UI changes (rather than console output) will develop stronger mental models of function return values. *(Constructionism — artifact as feedback)*

3. **Constrained editing conjecture:** Limiting editable regions to function bodies will reduce time-to-first-correct-solution compared to giving students the entire file to edit. *(CLT — reduce extraneous load)*

4. **Inspect mode conjecture:** Students who use inspect mode to trace UI ↔ code relationships will make fewer "where does this go?" errors in subsequent tasks. *(Metacognition / split-attention)*

---

## What's Not Built Yet

- [ ] Learning analytics logging (keystrokes, time-per-task, hint usage, attempt counts)
- [ ] Persistent student state (currently resets on refresh — need localStorage or backend)
- [ ] More modules (aggregation, helpers, integration)
- [ ] Transition animations (placeholder → real data)
- [ ] Module progression / unlocking
- [ ] Researcher observation view
- [ ] AI scaffolding layer (the eventual intervention)

---

## Files Written

~9,200 lines across 44 files in `music-dashboard-ide/`.

Key files:
- `src/engine/executor.ts` — Pyodide execution with JSON bridge
- `src/engine/pyodideManager.ts` — Pyodide lifecycle management
- `src/components/editor/ConstrainedEditor.tsx` — Monaco with read-only regions
- `src/components/preview/TrackList.tsx` — Dashboard track list powered by student results
- `src/tasks/registry.ts` — Task definitions and virtual file tree builder
- `src/tasks/module1-basics/` and `src/tasks/module2-filtering/` — 6 task definitions

---

## Next Steps

1. Fix remaining UX issues surfaced during manual testing
2. Add localStorage persistence for student code
3. Add learning analytics hooks (for Cycle 1 data collection)
4. Define conjectures more precisely with measurable outcomes
5. Prepare for Cycle 1 think-aloud pilot (5-10 students)
