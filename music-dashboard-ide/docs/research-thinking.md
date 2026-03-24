# Research Thinking — Organized Threads

---

## The Problem Landscape

What we're seeing right now, and the findings that motivate this work:

### 1. The unsanctioned AI problem
- Instructors create sanctioned AI policies (approved tools, approved use cases), but students use unsanctioned AI regardless
- Even in courses that ban AI, students can bypass traditional assignments with ChatGPT and there is no reliable way to detect it
- Policing AI use is a losing strategy — the tools are free, ubiquitous, and improving
- **Implication:** We must design pedagogy that assumes students have unrestricted AI access, not pedagogy that depends on restricting it

### 2. The prompting gap
- Novice programmers cannot prompt to the same specification as professionals
- Mounting evidence that prompt quality directly affects code quality — vague prompts produce vague code
- Students don't know what they don't know — they can't specify edge cases, types, or constraints they haven't learned yet
- The skill of translating intent into precise natural language specification is not currently taught in CS1
- **Implication:** Prompting is a skill that requires deliberate practice, not just exposure

### 3. The code comprehension crisis
- AI generates code that nobody wrote — there are no design decisions to remember, no process to recall
- Students can produce working code they cannot explain, modify, or debug
- Developers already spend 60-80% of time reading code; AI makes this worse because the code is unfamiliar by default
- Engineering students specifically need to trust code before deploying it — a structural analysis script that's wrong is dangerous
- **Implication:** Code comprehension must become a primary learning objective, not a byproduct of code writing

### 4. The workforce readiness question
- The workforce increasingly expects AI-assisted development as a baseline skill
- Students who are told "don't use AI" are being prepared for a workforce that doesn't exist
- But students who blindly copy-paste AI output are also unprepared — they can't debug, extend, or take responsibility for the code
- The needed skill set is: specify precisely, evaluate critically, decompose effectively, orchestrate multi-step workflows
- **Implication:** CS1 must teach productive AI collaboration, not just programming fundamentals

### 5. Trust and confidence in AI-generated code
- Students need to build **calibrated trust** — not blind trust, not blanket distrust
- Right now students either trust everything the AI produces (dangerous) or distrust everything (unproductive)
- Calibrated trust means: "I can verify this function works for these inputs, I've tested these edge cases, I understand the logic well enough to modify it"
- Trust should be earned through verification activities, not assumed
- **Implication:** The pedagogy needs to build students' confidence in their ability to evaluate code, so they can make informed trust decisions rather than guessing

### The meta-problem
All five problems share a root cause: **CS education was designed for a world where humans write all the code.** In that world, writing IS understanding — if you wrote the for loop, you understand the for loop. In the AI era, writing and understanding are decoupled. You can have code without understanding (copy from AI) or understanding without code (you know what you want but can't implement it). The pedagogical challenge is reconnecting them.

---

## The Research Threads

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

### Thread C: CS1 Redesign Landscape — What Others Are Doing
**Core question:** What approaches are others taking to adapt CS1 for the AI era, and where is the gap my work fills?

**Known approaches (needs literature review):**
- Prompt-focused CS0/CS1 courses (prompting as the primary programming activity)
- AI-allowed with traditional assignments (embrace but don't scaffold)
- AI-resistant assessment (oral exams, live coding, explanation requirements)
- Guardrailed AI tools (CodeHelp, limited-response tutors)
- Explain-in-plain-English requirements alongside code
- Property-based testing / formal specification approaches (the paper Keith has)

**What's missing in the landscape (potential gap):**
- Most approaches either restrict AI or allow it freely. Few scaffold HOW to use it
- Almost no work on teaching prompting as a deliberate skill within CS1
- Almost no work on code comprehension of AI-generated code specifically
- The intersection of comprehension + prompting (prompt reconstruction) appears unstudied

**TODO:**
- [ ] Map 8-10 key papers on CS1 redesign for AI
- [ ] Identify which gap this dissertation fills
- [ ] Read the property-based / specification paper Keith mentioned
- [ ] Look for prior work on prompt reconstruction or similar activities

---

### Thread D: Understanding the Population
**Core question:** Who are engineering CS1 students in 2026, and what do they already know/do with AI?

**What we need to know before designing a study:**
- What's their motivation for taking CS1? (Required? Interest? Career?)
- What's their prior programming experience?
- What AI tools do they currently use, how often, and for what?
- What's their self-efficacy around programming?
- What's their self-efficacy around AI tool use?
- Do they see AI as a shortcut or a tool?

**Why this matters:**
- Dr. Price's null effect study failed partly because students were already motivated — the intervention couldn't improve on a ceiling
- If students already use AI daily, a "scaffolded AI" intervention might not feel novel
- If students have zero programming experience, comprehension tasks need to be calibrated appropriately
- Engineering students' relationship to code is instrumental ("I need this for my career") not intrinsic ("I love programming") — this affects motivation mechanisms

**TODO:**
- [ ] Design a pre-study survey for the target population
- [ ] Identify existing instruments for programming self-efficacy and AI usage
- [ ] Run the survey in a CS1 section before designing the intervention

---

## Biases and Assumptions to Check

1. **Environment bias** — Am I assuming the visual environment matters more than the learning activity? Dr. Price's null effect study suggests it might not. Need to be clear: is the environment the IV, or is the activity?

2. **Prompting permanence** — Is prompting a durable skill or a temporary one? LLMs are getting better at handling vague input. Code comprehension and verification are more future-proof.

3. **Comprehension specificity** — "Code comprehension" is too broad. Need to operationalize at a specific level:
   - Surface (tracing lines)
   - Function (summarizing purpose)
   - System (understanding how pieces connect)
   - Modification (knowing what to change for a new requirement)

4. **Crisis assumption** — Is the "code comprehension crisis" empirically established or theoretical? Need evidence that AI use actually degrades comprehension, not just concern that it might.

5. **Population assumption** — Why engineering CS1 specifically? What makes this population different from CS majors? If nothing, either broaden or make the argument.

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
