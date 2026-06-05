---
name: content-design
description: "Designs user-facing service content (service names, descriptions, guidance, microcopy, button labels, status messages, errors, empty states) for its specific reader: a citizen (public, plain language, grade-9) or a worker (internal, dense, domain-expert). Use when writing or editing any citizen-facing or worker-facing copy for a Government of Alberta service, or when checking whether existing copy fits the reader it is actually for."
---

# Designing content for its reader: citizen or worker

Given a piece of content (or a brief to write one), design it for whoever reads it. **Name the reader first.** It is the master switch: the same state said to a citizen and to a worker is two different designs, not one lightly reworded, because "good" means opposite things to them.

## When to use it

- Writing or editing any user-facing words in a Government of Alberta service: service names, descriptions, guidance, button and link labels, status messages, empty states, errors, confirmations, notifications.
- Stress-testing existing copy against its actual reader. The two recurring failures: citizen copy written at a policy reading level, and worker copy padded with hand-holding that slows an expert down.

Not for your team's own internal docs in your own voice (those follow your team's voice guide), though the worker profile is a fair lens for any fluent internal audience.

## Step 1 — Name the reader (first, every time)

Fix three things before writing a word:

1. **Audience: citizen or worker?** Grounded in the design system's own user-type model (the **User Types** foundation, also served through the MCP):
   - **Citizen** — accessing a service from outside government, maybe once in their life, once a year, or rarely. They didn't choose to be here; they need something. The experience should feel like a clear, considered path: slow on purpose, one step at a time, hard to make a mistake. Plain language, ~grade 9, minimal density. Values clarity over speed, confidence over efficiency.
   - **Worker** — internal staff using a tool to deliver or administer a service from inside, every day; it's their job and they know it. The experience should feel like a power tool: fast, dense, information-rich, built for repetition and scale. Density fine, efficiency-focused, trusts expertise. Splits into an intake worker (deciding on a submission) and an ongoing case worker ("what needs me on this file").
   - **Frequency can outrank role.** The mode is the reader's relationship to the task, not their title. A contractor filing daily permits is a citizen but wants worker-terse content; a caseworker handling a once-in-a-career exception wants citizen-style guidance. When the two disagree, frequency usually wins for content too.
   - **Can't tell? Ask. Do not guess.** A wrong audience invalidates everything downstream.
2. **Service task and lifecycle stage.** A service is a verb; *apply*, *check status*, and *report a change* read differently. The same stage often has a citizen-facing and a worker-facing track, said two different ways.
3. **Surface and moment** — a button, page intro, error, empty state, confirmation, notification. The moment sets the job the words do.

## Step 2 — Apply the busy-reader base, dialed to the reader

The six principles (Rogers & Lasky-Fink, *Writing for Busy Readers*) hold for everyone: enough formatting, design for navigation, less is more, make reading easy, tell readers why they should care, make responding easy.

What changes is their settings. **"Make reading easy" and "use enough" are defined relative to the reader's expertise and frequency.**

| Dimension | Citizen (public, occasional, novice) | Worker (internal, frequent, expert) |
|---|---|---|
| Reading level | Plain language, ~grade 9 | Domain-fluent; precise terms are precision, not jargon |
| Density | Minimal; one idea at a time; whitespace | Dense is fine; completeness and scannability over hand-holding |
| Vocabulary | Everyday words; **verbs, not program names** ("report a change", not "Income Reporting Module"); expand acronyms, unless one is more familiar to this reader than its expansion (SIN, AISH on a recipient's own portal) | Real domain terms, program names, case states, stage labels |
| Orientation | High — what is this, what's next, why it matters to me | Low — orient to *this file or task*, not the system |
| Tone | Calm, reassuring, human | Efficient, direct, action-first |
| Job | Help one person do one thing, confidently | Help an expert decide and move work |
| "Less is more" → | Cut everything non-essential | Cut noise, not data; the bar for "needed" is higher |
| "Responding easy" → | One obvious action, no dead ends | Quick actions, batch where it fits; don't over-confirm |

Stakes amplify the tone dial: the higher the consequence to the reader (money, health, legal standing), the more a citizen needs calm and reassurance, and the less a worker wants anything slowing them down.

Both readers, non-negotiable (not dials): WCAG 2.2 AA, government voice, and **no citizen PII** — roles, never people.

**Cutting wordiness has a lookup.** For the "less is more" and "everyday words" dials, a companion reference lists ~860 common wordy or formal phrases and their plain replacements (`content-design-succinct-alternatives.md`). Use it reader-awarely: most entries cut padding ("due to the fact that" → "because") and help every reader; some swap a formal word for a plain one ("terminate" → "stop"), which suits a citizen but can wrongly strip a worker's precise vocabulary. Match the substitution to the reader; never blanket-replace.

### Surface-specific moves

A few patterns the dial table doesn't spell out, surfaced by real use:

- **Errors (citizen):** state the fix as a positive instruction with an example of valid input ("Enter your 9-digit SIN, for example 123456789"), not a description of what went wrong. The field's own error styling already says "error"; don't repeat it in words.
- **Empty states:** give the next action, not just the diagnosis ("No clients match these filters. Clear filters to see all.").
- **Notifications:** they truncate. Front-load the point in the first few words; a citizen notification should answer "does this affect me, and do I need to do anything?".
- **Handheld (mobile):** citizens are often on a phone, so tighten further. Front-load the one thing that matters, keep it short, and assume labels and notifications truncate. Anything that needs scrolling to reach is at risk of being missed.

## Steps

1. Name the reader (audience, task and stage, surface). Ask if the audience is unclear.
2. Read the draft (or brief) for what it must do *for that reader*. Set aside anything that is a quality or NFR, not content (the component's own error styling, icon, or layout is its job; you own the words).
3. Apply the principles, dialed to the audience profile.
4. Emit the content-designed text, then the rationale.

## Output

- **The content-designed text first**, paste-ready: no markdown blockquote (the bar breaks copying), no em or en dashes (use periods or commas). Match formatting to the surface.
- **The rationale**: name the audience, then map each concrete change to its principle and its dial. Skip what already worked. Keep it skimmable; it should follow the principles too.
- Preserve meaning and intent; invent nothing. If a cut would drop real information, flag it rather than delete it.
- **Audience unknown?** Don't ship one hedged version. Ask which reader it is for; if useful, show a provisional design per candidate audience so the decision is concrete.

## Worked example

One AISH file at lifecycle Stage 3 (awaiting medical eligibility). Same state, two readers.

Undesigned draft (policy voice, no reader in mind):

```
Your application is currently being processed. The assessment of your medical eligibility for
the Assured Income for the Severely Handicapped (AISH) program is pending and has been in the
review queue for 6 days. Processing typically takes approximately 8 weeks from the date of
submission. You will be contacted by email and text message in due course once a determination
has been made. No further action is required at this time.
```

**Citizen** (recipient's portal, "where is my file"):

```
We're reviewing your application

Right now we're checking your medical eligibility. You don't need to do anything.

We'll text and email you as soon as there's a decision. Most take about 8 weeks.
```

Why: leads with status and "you don't need to do anything" (the anxious reader's real question); grade-9, dropped "in due course", "determination", and the legal program name; four lines, one idea each; ends on what's next and when.

**Worker** (case worker's file view, "what needs me on this file"):

```
Stage 3 · Awaiting medical eligibility · 6 days in queue
Next: review medical docs, set eligibility, assign reviewer
```

Why: keeps the working vocabulary ("Stage 3", "eligibility", "assign"); surfaces queue age for triage and the explicit next action; cuts reassurance an expert doesn't need. No reading-level softening, which would only slow them down.

The citizen version *adds* orientation and *removes* domain language; the worker version *removes* orientation and *keeps* it. Opposite moves, same source state.

## Common mistakes

- **Skipping Step 1.** Writing before naming the reader. The dominant failure: copy that is simple where it should be dense, or dense where it should be simple.
- **Over-simplifying worker copy.** Plain language is not the worker goal; stripping their vocabulary slows them down. Precision is the courtesy.
- **Padding citizen copy with system orientation.** Citizens don't need the org chart or the legal program name; they need their next step.
- **Treating accessibility or voice as an audience dial.** They apply to both readers at full strength, always.

## Extending it (a first foundation)

The base is one set of principles; audiences are profiles, so it grows without restructuring:

- More **profiles** as they earn it: a delegated third party (trustee, POA); a screen-reader-first reader named explicitly rather than treated as an afterthought.
- More **principles**: deepen the surface-specific moves (errors, empty states, notifications), plus service-language conventions.
- Stay **aligned with the code side**: this is the prose counterpart to the design system's User Types foundation. When one moves, check the other.

## Related

- DS **User Types** foundation — the canonical source this mirrors (served through the MCP). The interaction layer (components, density, layouts) lives there; this skill owns the words, not the layout.
- `content-design-succinct-alternatives.md` — the wordy-phrase-to-plain-wording lookup wired into Step 2.
- Source for the six principles: Todd Rogers & Jessica Lasky-Fink, *Writing for Busy Readers*.
