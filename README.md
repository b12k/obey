<p align="center">
  <img src="obey.jpg" alt="OBEY" />
</p>

# OBEY - Code Naming Conventions

> "There are only two hard things in Computer Science: cache invalidation and naming things."
>
> — Phil Karlton, as quoted by David Karlton in [Naming things is hard](https://www.karlton.org/2017/12/naming-things-hard/)

This convention tries to help with the second one. ✨

OBEY is a small, practical naming convention for code. It is language-agnostic, but the examples use TypeScript because the patterns are easy to read.

Use it when you want names that are easier to review, search, refactor, and understand. It also includes an agentic coding skill, so coding assistants can follow the same naming rules when they generate or review code.

## 📦 What's Inside

```text
skills/
  obey-code-naming/
    SKILL.md
    CONVENTIONS.md
```

The installable skill name is `obey-code-naming`.

| File                                     | What it is                                 |
| ---------------------------------------- | ------------------------------------------ |
| `skills/obey-code-naming/SKILL.md`       | Short rules for agentic coding assistants. |
| `skills/obey-code-naming/CONVENTIONS.md` | Full convention with examples.             |

## 🧭 Why Bother?

Names are read much more often than they are written. A good name saves the next developer from opening five files just to understand what something probably means.

Good naming conventions help with:

- Faster reviews because naming decisions are less random.
- Better search because the same concept uses the same words everywhere.
- Less guessing around state, units, boundaries, nullable values, and side effects.
- More self-documenting code because intent is visible in the code path.
- Better agentic coding output because names give assistants useful context.

This is not about making every name long or fancy. It is about making names honest enough that the code explains itself.

## 📝 Self-Documenting Code

Good names are the first layer of documentation.

`timeoutMs` tells you the unit. `usersById` tells you it is a lookup. `mapUserRecordToUser` tells you it converts a stored shape into a domain shape.

Comments still matter, especially for decisions, tradeoffs, and weird constraints. But everyday meaning should usually live in the names.

## 🧠 Names Are Context

Names are not just labels. They are context.

For developers, consistent names make code easier to scan. You can tell whether a function loads remote data, reads local state, maps a shape, checks a condition, or handles an event before reading the whole implementation.

For agentic coding assistants, names are semantic hints. Better names make it easier for the assistant to pick the right pattern, keep the right boundary, and avoid inventing inconsistent vocabulary.

## ⚡ Quick Rules

| Area                   | Rule                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------- |
| Variables              | Use nouns that describe the value.                                                  |
| Booleans               | Use yes/no names like `isEmailValid`, `hasItems`, or `canUserEditDocument`.         |
| Functions              | Start with a verb: `fetchUser`, `getUserFromCache`, `buildUserCreationPayload`.     |
| Collections            | Use plural names: `users`, `orders`, `selectedItems`.                               |
| Lookups                | Use `By`: `usersById`, `ordersByCustomerId`.                                        |
| Numbers                | Include meaning and units: `timeoutMs`, `priceCents`, `heightPx`.                   |
| Defaults               | Prefer meaningful defaults; keep real absence explicit with `maybe` or state names. |
| Enum-like dictionaries | Keep keys in normal property casing: `admin`, not `Admin` or `ADMIN`.               |
| Data shapes            | Use role suffixes: `Input`, `Params`, `Payload`, `Dto`, `Record`, `Result`.         |
| Events                 | Name facts that happened: `userCreated`, `paymentFailed`.                           |
| Errors                 | End concrete errors with `Error`: `UserNotFoundError`.                              |

## 🔍 Examples

Avoid vague names:

```ts
const data = await fetchUser(userId);
const timeout = 5000;
const enabled = itemCount > 3;
```

Prefer names that carry meaning:

```ts
const user = await fetchUser(userId);
const timeoutMs = 5000;
const isEnabled = itemCount > 3;
```

Use verbs that match what the function actually does:

```ts
async function fetchUser(userId: string) {
  return api.users.get(userId);
}

function getUserFromCache(userId: string) {
  return usersById[userId];
}

function buildUserCreationPayload(form: UserForm) {
  return {
    email: form.email.trim(),
    role: form.role ?? "member",
  };
}
```

Use meaningful defaults:

```ts
const items = response.items ?? [];
const role = input.role ?? "member";
const maybePayment = paymentsById[paymentId];
```

Keep enum-like dictionary keys in normal property casing:

```ts
export const USER_ROLE = {
  admin: "admin",
  supportAgent: "supportAgent",
  superAdmin: "superAdmin",
} as const;
```

## 🚀 Install The Agentic Coding Skill

Install it with [skills.sh](https://skills.sh):

```bash
npx skills add b12k/obey --skill obey-code-naming
```

Use `-g` for a global install, or `--agent <agent-name>` if you want to target a specific agentic coding tool.

Restart your agentic coding tool after installing so it can discover the skill.

## 🛠️ Use The Skill

Ask your coding assistant to use it whenever naming matters:

```text
Use the obey-code-naming skill to review these identifiers.
```

```text
Use the obey-code-naming skill while refactoring this module.
```

```text
Apply the code naming conventions to this generated API client.
```

## 📚 Use It Manually

Read the full guide:

```text
skills/obey-code-naming/CONVENTIONS.md
```

It works well as a team reference for pull requests, refactors, new codebases, and AI-generated code cleanup.

## 🎯 Goal

The goal is simple: names should be short enough to use, specific enough to trust, and consistent enough to search.

Good names are not decoration. They are part of the design.

Movie credit: *They Live* (1988), directed by John Carpenter.
