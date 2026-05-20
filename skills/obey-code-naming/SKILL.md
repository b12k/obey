---
name: obey-code-naming
description: Apply concise code naming conventions when generating, reviewing, or refactoring code identifiers. Use for naming variables, constants, enum-like dictionaries, classes, errors, data shapes, functions, events, booleans, nullable/defaulted values, temporal values, collections, and conversion functions in any programming language.
---

# Code Naming Conventions

Operational naming rules for agentic coding assistants. Apply them as decision rules when generating, reviewing, or renaming identifiers.

Prefer the project's casing and established domain vocabulary, but do not copy semantically wrong names. Read `CONVENTIONS.md` only when examples or nuance are needed.

## Basics

- Use English.
- Follow the language/project casing convention.
- Treat accepted acronyms/domain abbreviations as normal words: `userId`, `apiUrl`, `httpClient`, `UserDto`.
- Avoid ad hoc contractions and unclear abbreviations: use `buttonText`, not `btnTxt`.
- Make names short, intuitive, and descriptive.
- Avoid duplicated context: inside `MenuItem`, use `handleClick`, not `handleMenuItemClick`.
- Name values by how they are consumed: prefer `isDisabled` for `<Button disabled={isDisabled} />`.

## Variables

- Variables are nouns or noun phrases that describe the held value.
- Avoid vague names: `data`, `value`, `list`, `info`, `object`, `temp`, `helper`, `manager`, `util`.
- Numeric values must expose meaning or unit:
  - `itemsCount`, `itemsTotalPrice`, `timeoutMs`, `durationSec`, `durationMin`, `distanceKm`, `priceCents`, `heightPx`, `sizeBytes`.
- Boundaries use `min` / `max`:
  - `minItemsCount`, `maxItemsCount`, `maxDurationSec`.
- Nullable expected values use `maybe` when nullability is important:
  - `maybeUser`.
- Prefer state-specific names when clearer:
  - `selectedUser`, `currentUser`, `fallbackUser`.
- Prefer meaningful defaults when absence has a safe domain meaning:
  - `items = maybeItems ?? []`, `timeoutMs = maybeTimeoutMs ?? DEFAULT_TIMEOUT_MS`.
- Do not hide missing data behind fake defaults:
  - avoid `user = maybeUser ?? {}`, `email = maybeEmail ?? ""`, `priceCents = maybePriceCents ?? 0` unless the default is a valid domain value.
- State transitions use `prev` / `next`:
  - `prevStatus`, `nextStatus`, `nextItems`.
- Temporal values use clear suffixes:
  - `createdAt`, `scheduledOn`, `activeFrom`, `activeTo`, `expiresBefore`, `timeoutMs`.

## Collections

- Collections are plural:
  - `users`, `permissions`, `orders`.
- Single values are singular:
  - `user`, `permission`, `order`.
- Role/state subsets use role + plural entity:
  - `activeUsers`, `selectedItems`, `adminUsers`, `visibleProducts`.
- Lookup collections use values + `By` + key:
  - `usersById`, `urlsBySlug`, `ordersByCustomerId`, `fieldErrorsByName`.

## Booleans

Boolean variables must read as yes/no facts.

Use:

```text
boolean prefix + entity + property/state/capability
```

Prefixes:

- `is` / `are`: state, quality, classification.
- `has`: possession or presence.
- `can`: capability or permission.
- `should`: whether an action should happen.

Prefer:

- `isEmailValid`, not `isValidEmail`.
- `canUserEditDocument`, not `userCanEditDocument`.
- `hasUserPermission`, not `userPermission`.
- `shouldUpdateUrl` for action conditions.

Omit the entity only when context already supplies it, such as `isEnabled` inside button code.

## Noun-Verb Words

Some words are nouns and verbs. Use them according to role.

- If used as a value and ambiguity is likely, add context:
  - `queryString`, `filterParams`, `updatePayload`.
- Natural boundary nouns are allowed:
  - `request`, `response`, `command`, `event`.

## Constants

- Use upper snake case only for module-level named constants:
  - `MAX_ITEMS_COUNT`, `TIMEOUT_MS`, `SUPPORTED_LOCALES`.
- Do not use upper snake case for every local `const`.
- Enum-like dictionary keys use normal property/variable casing, not capitalized enum-member casing:
  - `roleByName = { admin: "admin", supportAgent: "supportAgent" } as const`, not `{ Admin: "admin", SUPPORT_AGENT: "supportAgent" }`.

## Classes And Errors

- Class names are singular:
  - `User`, `Order`, `Payment`.
- Collection-like classes use a singular entity plus role suffix:
  - `UserCollection`, `UserRegistry`, `OrderRepository`, `SessionStore`.
- Error classes/types end with `Error`:
  - `UserNotFoundError`, `InvalidEmailError`, `PaymentFailedError`.
- Use `error` for generic caught errors, not `err` or `e`.
- Use contextual error variables when needed:
  - `userCreationError`, `fieldErrorsByName`.

## Data Shapes

Use suffixes that describe the shape's role:

- `Input`: internal operation input, e.g. `CreateUserInput`.
- `Params`: named call/query/route parameters, e.g. `SearchParams`.
- `Payload`: data sent to another layer/service/event/API, e.g. `UserCreationPayload`.
- `Request`: full inbound boundary request, e.g. `CreateUserRequest`.
- `Response`: full outbound boundary response, e.g. `CreateUserResponse`.
- `Dto`: transfer object across boundaries, e.g. `UserDto`; use `Dto`, not `DTO`.
- `Record`: persistence/storage shape, e.g. `UserRecord`.
- `Result`: operation outcome, e.g. `CreateUserResult`.

Avoid `UserData`, `UserInfo`, and shape names without a role.

## Functions

Functions start with a verb. For non-boolean functions use A/HC/LC:

```text
Action + High Context + optional Low Context
```

- Action: operation verb, e.g. `fetch`, `get`, `build`, `map`.
- High Context: main concept, e.g. `User`, `Order`, `AccessLevel`.
- Low Context: optional qualifier, e.g. `FromCache`, `ToDto`, `CreationPayload`; omit when surrounding context already supplies it.

Examples:

- `fetchUser`
- `listUserMessages`
- `getUserFromCache`
- `buildUserCreationPayload`
- `handleClickOutside`

Choose the verb by the function's main operation, including directly wrapped helpers. Do not choose it from the return type alone.

## Function Actions

- `fetch`: load external, remote, persisted, or not-yet-loaded data via I/O when no collection-specific action is clearer.
- `list`: load a collection when listing/enumeration is the main operation, especially with pagination/filtering.
- `create`: create a new entity, object instance, service, tool, or local resource.
- `update`: change an existing entity.
- `delete`: permanently delete an entity.
- `get`: read already available state or derive a cheap local value.
- `set`: assign already available state to a new value.
- `reset`: return state to initial value.
- `remove`: detach an item from a collection/relation without deleting it.
- `infer`: derive a conclusion from data/context.
- `compose`: combine existing values into a simple value.
- `build`: construct structured data through mapping/defaults/steps.
- `map`: change object/collection shape without changing the source.
- `convert`: change format, unit, protocol, or representation.
- `transform`: broader structural or semantic change.
- `check`: return a boolean.
- `assert`: throw/fail/narrow if a condition is false.
- `handle`: implement event/callback handling.

## Function Action Selection

Choose the action from the function's main intent. The verb should show the primary operation, not just the final return type.

- Inspect directly wrapped helpers; if the wrapper mainly performs that helper's operation, preserve the operation in the wrapper's verb.
- Use I/O verbs such as `fetch`, `list`, `create`, `update`, and `delete` for external, persisted, or not-yet-loaded data.
- Use local verbs such as `get`, `set`, `build`, `compose`, `map`, `convert`, `transform`, and `infer` for already available data or local derivation.
- Async does not decide the verb; the operation does. A function that loads releases and returns the latest version is `fetchLatestVersion`, not `getLatestVersion`.

## CRUD

- Use `fetch`, `list`, `create`, `update`, `delete` for external or persisted operations.
- Prefer `fetch` for loading a specific resource/response; prefer `list` for enumerating collections.
- Reserve `get` and `set` for available local state, cache access, cheap derivation, and local assignment.
- Use `remove` for detaching from a collection/relation.
- Use `delete` for permanent erasure.

## Transformations

Use:

```text
map/convert/transform + source + To + target
```

Prefer:

- `mapUserToDto`
- `mapUserRecordToUser`
- `convertPriceCentsToDollars`
- `transformLegacyUserToUser`

Avoid standalone `toUserDto`, `fromUserRecord`, and `mapToDto` unless the source is already explicit in context, such as inside `UserMapper`.

## Boolean Functions

Boolean-returning functions use:

```text
check + boolean prefix + entity + property/state/capability
```

The part after `check` must be a valid boolean variable name.

Prefer:

- `checkIsEmailValid` -> `isEmailValid`
- `checkCanUserEditDocument` -> `canUserEditDocument`
- `checkHasUserPermission` -> `hasUserPermission`

Avoid:

- `validEmail`
- `checkIsValidEmail`
- `checkUserCanEditDocument`

## Assertion Functions

Assertion functions use:

```text
assert + boolean prefix + entity + property/state/capability
```

Use `check` when returning boolean. Use `assert` when invalid state should stop execution, throw, fail, or narrow type.

Examples:

- `assertIsEmailValid`
- `assertCanUserEditDocument`
- `assertHasUserPermission`

## Events

- Event names describe facts that happened:
  - `userCreated`, `orderCancelled`, `paymentFailed`.
- Do not name events as commands:
  - avoid `createUser`, `cancelOrder`, `paymentFail`.
- Use `on` for callback props/subscriptions:
  - `onClick`, `onUserCreated`.
- Use `handle` for handler implementations:
  - `handleClick`, `handleUserCreated`.
