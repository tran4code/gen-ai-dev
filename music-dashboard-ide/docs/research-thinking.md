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

## What Code Comprehension Actually Matters (As AI Gets Better)

### The "LLMs keep getting better" test

If we assume LLMs will continue improving — better at inferring intent from vague prompts, asking clarifying questions, producing correct code — then which comprehension skills remain necessary and which become obsolete?

**Will NOT matter (AI handles it):**
- Surface-level tracing — "What does line 7 do?" AI can explain any line on demand
- Function-level summarization — "What does this function do?" AI can summarize any function
- Syntax comprehension — understanding language-specific constructs. AI translates between representations

**WILL matter (requires human judgment about the problem domain):**

1. **Behavioral verification** — "Does this function correctly handle [specific scenario]?" The human must know what "correct" means for THEIR problem. AI can generate code but can't fully determine if the output is right for the engineer's specific use case. An AI can write a load calculation function, but the civil engineer has to know whether the output makes physical sense.

2. **System-level comprehension** — "If I change this function, what else breaks?" Understanding relationships between components that aren't explicit in any single function. This is about mental models of how data flows through a system and where dependencies exist.

3. **Modification planning** — "To add feature X, which functions do I need to touch, in what order, and what are the downstream effects?" This maps requirements to code structure. It requires understanding the system well enough to predict the blast radius of a change.

4. **Fault localization** — "The output is wrong. Which component is the cause?" Tracing backwards from incorrect output to the faulty function in a system you didn't build. This is debugging without authorship knowledge.

5. **Specification of intent** — Describing what you want clearly enough that any tool (AI, colleague, library) can produce it. This is NOT "prompting" as a specific syntax skill — it's the ability to externalize your intent precisely. The bottleneck is the human's clarity of thought, not the tool's interface. This skill is durable even as prompting interfaces change.

### Why this matters for the dissertation
This narrows the research question from "code comprehension" (too broad) to "the specific comprehension skills that remain necessary as AI handles more generation." That's a more defensible and more interesting contribution.

### Engineering analogy (keep in back pocket)
Engineers already work this way in their own disciplines:
- A civil engineer changes a beam specification → must understand the downstream effects on load calculations, foundation requirements, and safety margins
- An electrical engineer modifies a circuit component → must understand the effects on signal flow, power dissipation, and timing
- A software engineer modifies a function in an AI-generated codebase → must understand the downstream effects on other functions, data flow, and system behavior

The skill of **impact analysis** — understanding how a change propagates through a system — is universal across engineering disciplines. For CS1 engineering students, this framing makes the skill feel like engineering, not just programming.

---

## Pedagogical Activities That Build These Skills

**The overarching research interest:** What activities or assignments help students develop the durable code comprehension skills (behavioral verification, system comprehension, modification planning, fault localization)?

Each activity below targets specific skills. A dissertation could study 2-3 of these comparatively.

### Activity 1: Test case generation
**What student does:** Given an unfamiliar function, write 2-3 test cases. Predict what the function returns for specific inputs. Determine edge cases.

**What it builds:**
- Behavioral verification — to write a test, you must understand what the function SHOULD do
- Forces the student to form a hypothesis about the code's behavior and check it
- Edge case reasoning — "what happens with an empty list? a single item? a tie in popularity?"

**Why it's strong:**
- Active, not passive — student generates rather than reads
- Testing effect (Roediger & Karpicke) — predicting output strengthens memory and understanding
- The activity IS the assessment — test quality reveals comprehension quality
- Authentic to engineering — testing is verification, which engineers already value

**Connection to the prototype:** The music dashboard IDE already has test cases for each function. This activity is a natural fit — students could write tests and see them run against the actual functions.

### Activity 2: Change impact analysis
**What student does:** Given a codebase with 6-8 functions and a proposed change (new feature request, bug fix, or requirement change), identify:
1. Which functions are affected
2. What the downstream effects are
3. What order changes should be made
4. What could go wrong

**What it builds:**
- System-level comprehension — must understand how components connect
- Modification planning — must reason about dependencies and order
- Downstream reasoning — the engineering impact analysis skill

**Why it's strong:**
- Maps directly to how engineers think in their own disciplines
- Tests the highest-level comprehension (system, not surface)
- No code writing required — pure reasoning about structure and relationships
- Authentic to industry — this is literally what senior developers do during code review and sprint planning

**Back pocket idea:** Could frame this as "engineering change orders" — a term engineering students already know. A change order in manufacturing triggers an impact analysis. A feature request in software should trigger the same.

### Activity 3: Prompt reconstruction
**What student does:** Given a function they didn't write, write the natural language description (prompt) that could have produced it. Then optionally: feed their prompt to an LLM and compare the generated code against the original.

**What it builds:**
- Specification of intent — must understand the function well enough to describe it
- Function-level comprehension — reverse-engineering purpose from implementation
- The gap between their prompt and the original reveals what they misunderstood

**Why it's strong:**
- Supported by findings that students comprehend code better when they see the prompt that created it (reverse direction: can they produce the prompt?)
- The activity IS the assessment — prompt quality measures comprehension
- Functional equivalence testing gives an objective measure

**Durability concern:** This activity is about specification skill, which is durable. But the specific format (writing a prompt for an LLM) might feel dated if LLM interfaces change. Could reframe as "write the specification" rather than "write the prompt."

### Activity 4: LLM-assisted exploration
**What student does:** Given an unfamiliar codebase, use an LLM to ask questions about it for 15 minutes. "What does this function do?" "How does data flow from X to Y?" "What would happen if I changed Z?"

**What it builds:**
- Potentially all levels of comprehension — depends on what questions the student asks
- AI collaboration skills — learning to ask productive questions

**Why it's interesting:**
- Tests whether AI can serve as a comprehension tool, not just a generation tool
- The questions students ask reveal their comprehension strategy
- May produce "illusion of understanding" — student feels they understand because AI explained it clearly, but they never built their own mental model

**Risk:** This might perform well on immediate comprehension tasks but poorly on transfer tasks. Understanding an explanation is not the same as constructing understanding.

### Activity 5: Annotated code reading (control)
**What student does:** Read the codebase with detailed inline comments explaining each function's purpose, parameters, logic, and connections to other functions.

**What it builds:**
- Baseline familiarity with the codebase
- Whatever passive reading provides

**Why include it:**
- Standard pedagogical practice — the "how we've always done it" baseline
- If any active condition beats this, you've shown the activity adds value beyond documentation

### Activity 6: Raw code reading (control)
**What student does:** Read the codebase with no comments, no help. Just the code.

**What it builds:**
- Whatever unguided reading provides
- Forces self-explanation (Chi) since there's no external explanation available

**Why include it:**
- Pure baseline — any other condition that beats this is adding value
- Interestingly, might outperform annotated reading if self-explanation is more powerful than provided explanations

---

## Study Design: The Modification Planning Experiment

**Central research question:** Which preparatory activity best equips CS1 students to plan modifications to an unfamiliar codebase?

### Protocol
1. All students receive the same unfamiliar codebase (6-8 Python functions, ~100-150 lines, domain-relevant)
2. Students are randomly assigned to one condition
3. 15 minutes of the assigned preparatory activity
4. ALL students then get the same transfer task: a feature request requiring them to plan modifications to the codebase
5. Post-task comprehension assessment and confidence survey

### Conditions (choose 3-4 for feasibility)

| Condition | Activity | Primary skill targeted |
|-----------|----------|----------------------|
| Raw code reading | Read code, no help | Baseline |
| LLM Q&A | Ask an LLM questions | AI-assisted comprehension |
| Test case generation | Write 2-3 tests per function | Behavioral verification |
| Change impact analysis | Predict effects of 3 hypothetical changes | System comprehension |
| Prompt reconstruction | Write the spec for each function | Specification / intent |

### The transfer task (same for all conditions)
"Here's a new feature request: [specific modification]. Plan how you'd implement it:
- Which existing functions need to change?
- What new functions are needed?
- In what order should changes be made?
- What could go wrong?"

### Measures
- **Plan quality** — rubric-scored: correct function identification, reasonable ordering, downstream awareness
- **Comprehension questions** — "What would happen if function X returned an empty list instead of None?" (tests system-level understanding)
- **Confidence calibration** — self-reported confidence vs actual performance (are students who feel confident actually correct?)
- **Process data** — in LLM condition: what questions asked. In test condition: test quality. In impact condition: prediction accuracy.

### Why this design works
- The transfer task is the SAME across all conditions, so differences are attributable to the preparatory activity
- Tests the durable skills (modification planning, system comprehension) not the temporary ones (tracing, summarization)
- Feasible in one lab session (~50 minutes)
- Interesting regardless of outcome — even if all conditions perform equally, the confidence calibration data tells you something about the illusion of understanding

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
