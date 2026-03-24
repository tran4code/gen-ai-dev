# Research Thinking — Organized Threads

## The Two Big Questions

### Thread A: Personalized Authentic Environments
**Core question:** Can LLMs generate personalized, engaging programming environments tailored to individual student interests — and does that personalization improve learning?

**The idea:** Instead of one Spotify dashboard for everyone, a student interested in sports gets a sports analytics dashboard, a student interested in cooking gets a recipe app, a student interested in gaming gets a game stats tracker. The LLM generates the app shell (the "system authored context"), and the student writes the logic functions that power it.

**What LLMs uniquely provide:**
- Generate domain-specific datasets (sports stats, recipes, game data) on demand
- Generate the UI shell and visual context tailored to the domain
- Generate function stubs, docstrings, and test cases appropriate to the domain
- All while preserving the same underlying CS1 learning objectives (loops, filtering, aggregation)

**The theory of change:**
- SDT (autonomy) — students choose their domain, increasing ownership
- SDT (relatedness) — the context connects to something they already care about
- Situated cognition — learning is more transferable when situated in a meaningful context
- Constructionism — the artifact is personally meaningful, not generic

**Open questions:**
- Does personalization actually improve learning, or just satisfaction?
- Is the LLM-generated context high enough quality to be believable?
- Does domain variety introduce confounds (is the sports version harder than the recipe version)?
- How do you assess learning fairly across different domains?

**Potential studies:**
- Compare one-size-fits-all (everyone gets Spotify) vs student-chosen domain — measure engagement, persistence, and learning outcomes
- Study whether students who work in a personally meaningful domain transfer skills better to unfamiliar domains
- Analyze what makes an LLM-generated environment "authentic enough" — what's the threshold?

**Potential papers:**
- "LLM-Generated Personalized Programming Environments: Effects on Engagement and Learning in CS1" (SIGCSE)
- "Does Domain Personalization in Scaffolded Programming Environments Improve Transfer?" (ICER)

---

### Thread B: Code Comprehension Pedagogy in the AI Era
**Core question:** What pedagogical activities most effectively build code comprehension when students are working with code they didn't write — which is the default in AI-assisted programming?

**The problem:**
- Developers spend 60-80% of time reading code, not writing it
- AI-generated code is code nobody wrote, with no memory of design decisions
- CS1 students can produce working AI-generated code they cannot explain or modify
- Engineering majors need to trust code before deploying it in safety-critical contexts

**The theory of change:**
- Testing effect (Roediger & Karpicke) — retrieving/predicting strengthens understanding
- Generation effect — information you generate is better retained than information you read
- Self-explanation effect (Chi) — explaining code to yourself beats passive reading
- Constructivism — understanding is built through active engagement, not transmitted through reading

**The 2x2 study design:**

|  | Guided | Unguided |
|--|--------|----------|
| **Passive** | Commented code | Raw code |
| **Active** | LLM Q&A | Test generation |

Plus a fifth condition: **Prompt reconstruction** — write the prompt that could have generated each function.

**What makes prompt reconstruction interesting:**
- A paper found students understand code better when they see the prompt that created it
- Reconstructing the prompt forces you to reverse-engineer the intent
- The activity IS the assessment — prompt quality reveals comprehension quality
- Functional equivalence testing: does their prompt generate equivalent code?

**Potential studies:**
- The 4-5 condition comprehension study (one lab session, CS1 students)
- Longitudinal: does prompt reconstruction practice improve code comprehension over a semester?
- Compare prompt-annotated code vs comment-annotated code as learning materials

**Potential papers:**
- "Prompt Reconstruction as a Code Comprehension Activity: A Controlled Experiment" (ICER)
- "How Do CS1 Students Build Understanding of Unfamiliar Code? Comparing Five Comprehension Strategies" (SIGCSE)
- "Prompts as Documentation: Do Natural Language Specifications Improve Code Comprehension?" (ITiCSE)

---

## How the Threads Connect

These aren't separate research programs — they're two angles on the same underlying question:

**How should CS education adapt to a world where AI generates most of the code?**

Thread A answers: make the learning environment itself AI-generated and personalized.
Thread B answers: teach students to comprehend and evaluate AI-generated code.

They could combine: a personalized environment (Thread A) where the primary learning activity is comprehending and extending AI-generated code through prompt reconstruction (Thread B).

---

## Feasibility Assessment

| Study | Build effort | Data collection | Timeline |
|-------|-------------|-----------------|----------|
| Thread B: Comprehension 2x2 | Low — need a codebase, 4 condition setups, assessment instruments | One lab session per section | Could run Fall 2026 |
| Thread B: Prompt reconstruction | Medium — need LLM integration to evaluate prompts | One lab session | Could run Fall 2026 |
| Thread A: Personalized vs generic | High — need LLM to generate multiple domain environments | Full semester deployment | Needs Spring 2027 |
| Combined: Personalized + prompt reconstruction | High | Full semester | Spring 2027 |

**Recommendation:** Start with the comprehension study (Thread B) because it requires the least building, produces results fastest, and the findings inform what to build for Thread A.

---

## Skills Framework (Reference)

What CS1 students need in the AI era, in order of foundation:

1. **Computational thinking** — data types, control flow, tracing (pre-AI, still essential)
2. **Specification** — describing precisely what you want (prompting is the new form of this)
3. **Verification** — reading code, predicting behavior, writing tests
4. **Decomposition** — breaking problems into promptable/buildable pieces
5. **Orchestration** — sequencing AI interactions, managing data flow between components
6. **Metacognition** — knowing what you understand, knowing when to trust AI output

---

## Dissertation Positioning Options

**Option 1: Lead with Thread B (comprehension)**
- Dissertation is about code comprehension pedagogy in the AI era
- Study 1: The comprehension conditions experiment
- Study 2: Prompt reconstruction as a sustained practice (semester-long)
- The personalized environment is future work

**Option 2: Lead with Thread A (personalized environments)**
- Dissertation is about LLM-generated personalized learning environments
- Study 1: Build the platform, pilot with think-alouds
- Study 2: Personalized vs generic, measure engagement and learning
- Code comprehension is one of the outcomes you measure

**Option 3: Lead with the combination**
- Dissertation is about scaffolded AI interaction in CS1
- Study 1: Comprehension conditions experiment (establishes that prompt reconstruction works)
- Study 2: Embed prompt reconstruction into a personalized environment, measure at scale
- Each study builds on the previous

---

## Next Steps

- [ ] Discuss Thread A vs B priority with Dr. Price
- [ ] Find and read the paper on "students understand code better when they see the prompt"
- [ ] Scope the comprehension study precisely — how many students, which course, which semester
- [ ] Draft IRB protocol for the comprehension study
- [ ] Identify assessment instruments (or existing validated ones to adapt)
