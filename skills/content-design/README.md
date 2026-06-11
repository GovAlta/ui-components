# content-design

The skill that designs user-facing service words for the specific person reading them: a citizen or a worker. It names the reader first, because the same message is two different designs for the two of them, not one lightly reworded.

## In a sentence

For anyone writing with the design system: when you're working on any words in a service (a button label, an error, a status message, guidance, an empty state), tell your AI who reads it, a citizen or a worker, and it shapes the wording to fit that reader, then explains each change.

Under the hood: it is the prose counterpart to the design system's User Types foundation. The foundation owns the interaction layer (components, density, layout); this skill owns the words. Both are grounded in the same citizen-vs-worker model.

## What it does

1. Names the reader: citizen or worker, the service task and lifecycle stage, and the surface (a button, an error, an empty state). It asks if the audience is unclear, it does not guess, because a wrong audience invalidates everything downstream.
2. Applies the six "busy reader" principles (Rogers & Lasky-Fink, *Writing for Busy Readers*), dialed to that reader. The principles hold for everyone; their settings change. A citizen gets plain language, low density, a calm tone, and one obvious action. A worker gets domain vocabulary, density, efficiency, and an action-first shape.
3. Holds three things non-negotiable for both readers (not dials): accessibility (WCAG 2.2 AA), government voice, and no citizen PII (roles, never people).
4. Emits the content-designed text first, paste-ready, then a short rationale that maps each change to its principle and its dial.

## The master switch: citizen or worker

Naming the reader is the master switch, because "good" means opposite things to each:

- **Citizen:** accessing a service from outside government, maybe once in their life. They need clarity and confidence. Plain language, around grade 9, minimal density, calm and reassuring, one step at a time.
- **Worker:** internal staff using a tool every day; it is their job and they know it. They need a power tool. Density is fine, domain vocabulary is precision not jargon, efficient and direct.
- **Frequency can outrank role.** The mode is the reader's relationship to the task, not their title. A contractor filing daily permits is a citizen who wants worker-terse content; a caseworker handling a once-in-a-career exception wants citizen-style guidance.

The clearest illustration: one service status, said two ways. To a citizen it *adds* orientation and *drops* the legal program name ("We're reviewing your application. You don't need to do anything."). To a worker it *removes* orientation and *keeps* the working vocabulary ("Stage 3, awaiting medical eligibility, 6 days in queue. Next: review docs, set eligibility."). Opposite moves, same source state.

## What makes it distinctive

- Reader-first, not draft-first. It refuses to reword until it knows who reads the copy, because citizen and worker writing pull in opposite directions.
- Dials, not rules. The principles are constant; their settings change per reader. Accessibility, voice, and no-PII are the only true constants.
- Self-contained. Unlike a component navigator, it barely needs live lookups: the principles and a plain-wording lookup are bundled in the skill. It works for any service content, whatever components are used.
- Shows its work. It outputs the designed text, then maps each change to a principle and a dial, so the reasoning is reviewable.

## Using it

Install it, pointed at our repo:

```
npx skills add GovAlta/ui-components --skill content-design
```

Then tell your AI who the copy is for and what surface it lives on, and the skill loads on its own when the work matches. Run `npx skills update` to pull the latest.

## Good to know

- It is the prose counterpart to the User Types foundation (served through the MCP). The foundation owns the interaction layer; this skill owns the words. When one moves, check the other.
- The bundled `content-design-succinct-alternatives.md` is a roughly 860-entry "wordy phrase to plain wording" lookup. Use it reader-awarely: most entries cut padding and help everyone, but some swap a formal word for an everyday one, which suits a citizen and can wrongly strip a worker's precise vocabulary. Never blanket-replace.
- No component dependency. This skill is about words, not UI, so it stands on its own regardless of which components a service uses.
- Best hardened by evaluation: run it on a few real pieces of content with a fresh agent and refine where the output misses, rather than trusting it on first write.
