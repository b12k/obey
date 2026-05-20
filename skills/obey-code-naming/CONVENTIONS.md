# OBEY - Code Naming Conventions

Clear naming conventions make code easier to read, review, search, change, and reason about. Good names turn code into documentation: they expose intent, domain meaning, state, and side effects without forcing the reader to inspect every implementation detail.

These conventions are programming language agnostic. The examples use TypeScript. Follow project-specific casing and framework conventions, but keep the semantic rules below.

## Basics

### Language is English

Use English for code identifiers, including variables, functions, classes, methods, types, files, modules, and tests.

Bad:

```ts
const primerNombre = "Gustavo";
const amigos = ["Kate", "John"];
```

Good:

```ts
const firstName = "Gustavo";
const friends = ["Kate", "John"];
```

### Use the language's casing convention

Pick the casing convention expected by the programming language, framework, or project, and use it consistently. Do not mix casing styles for the same kind of identifier.

Bad:

```ts
const page_count = 5;
const shouldUpdate = true;
```

Good:

```ts
const pageCount = 5;
const shouldUpdate = true;
```

### Format acronyms as words

Accepted acronyms and domain abbreviations must follow the same casing convention as regular words. Do not keep acronyms fully uppercase inside camel case or Pascal case names.

Bad:

```ts
const userID = "user-1";
const APIUrl = "https://example.com";
const HTTPClient = createHttpClient();
```

Good:

```ts
const userId = "user-1";
const apiUrl = "https://example.com";
const httpClient = createHttpClient();
```

### Keep names short, intuitive, and descriptive

Names should be short, intuitive, and descriptive.

- Short: easy to type, read, and remember.
- Intuitive: natural to read in English and close to common speech.
- Descriptive: specific enough to explain what the value represents or what the function does.

Bad:

```ts
const a = 5;
const isPaginatable = a > 10;
const shouldPaginatize = a > 10;
```

Good:

```ts
const postCount = 5;
const hasPagination = postCount > 10;
const shouldPaginate = postCount > 10;
```

### Avoid contractions

Do not shorten words by removing letters. Ad hoc contractions and unclear abbreviations reduce readability and make names harder to search for.

Common acronyms and domain abbreviations are allowed when they are widely understood in the project, but they must still follow the acronym casing rule.

Bad:

```ts
const usr = await fetchUser(userId);
const btnTxt = "Save";
const onItmClk = () => {};
```

Good:

```ts
const user = await fetchUser(userId);
const buttonText = "Save";
const onItemClick = () => {};
```

### Avoid context duplication

Do not repeat context that is already provided by the surrounding class, module, function, object, or namespace. Keep the repeated context only when removing it would make the name unclear.

Bad:

```ts
class MenuItem {
  handleMenuItemClick(event: MouseEvent) {
    // ...
  }
}

const user = {
  userName: "Ada",
  userEmail: "ada@example.com",
};
```

Good:

```ts
class MenuItem {
  handleClick(event: MouseEvent) {
    // ...
  }
}

const user = {
  name: "Ada",
  email: "ada@example.com",
};
```

### Reflect the expected result

Name values after how they are consumed, not after an inverted intermediate idea. The name should match the result the surrounding code expects.

Bad:

```ts
const isEnabled = itemCount > 3;

return <Button disabled={!isEnabled} />;
```

Good:

```ts
const isDisabled = itemCount <= 3;

return <Button disabled={isDisabled} />;
```

## Naming variables

Variable names should describe the value they hold. Prefer nouns or noun phrases that make the meaning clear at the point of use.

The following rules refine variable names by value kind, role, and context.

### Avoid vague names

Avoid names that describe the shape of a value without explaining its meaning. Words such as `data`, `value`, `list`, `info`, `object`, `temp`, `helper`, `manager`, and `util` are usually too vague unless the surrounding context makes them precise.

Bad:

```ts
const data = await fetchUser(userId);
const info = await fetchPayment(paymentId);
const temp = calculateOrderTotal(order);
const helper = createEmailFormatter();
```

Good:

```ts
const user = await fetchUser(userId);
const payment = await fetchPayment(paymentId);
const orderTotalPrice = calculateOrderTotal(order);
const emailFormatter = createEmailFormatter();
```

### Make numeric values explicit

Variables that store numbers should make the numeric meaning clear. Use words such as `count`, `total`, `sum`, `amount`, `size`, or `index`.

When a number has a unit, add the unit as a suffix. Use the smallest practical unit when it prevents ambiguity, such as `durationMs`, `durationSec`, `durationMin`, `distanceKm`, `priceCents`, `heightPx`, or `sizeBytes`.

Bad:

```ts
const items = cart.items.length;
const timeout = 5000;
const duration = 30;
const price = 1299;
const height = 48;
const total = order.items.reduce((sum, item) => sum + item.price, 0);
```

Good:

```ts
const itemsCount = cart.items.length;
const timeoutMs = 5000;
const durationSec = 30;
const priceCents = 1299;
const heightPx = 48;
const itemsTotalPrice = order.items.reduce((sum, item) => sum + item.price, 0);
```

### Use min and max for boundaries

Use `min` and `max` prefixes for numeric boundaries, limits, and allowed ranges. Keep the measured value explicit, and include a unit suffix when needed.

Bad:

```ts
const items = 1;
const allowedItems = 20;
const duration = 300;
```

Good:

```ts
const minItemsCount = 1;
const maxItemsCount = 20;
const maxDurationSec = 300;
```

### Use plural names for collections

Arrays, maps, sets, and other collection-like values must use plural names. Single-value variables must use singular names.

Bad:

```ts
const user = ["Kate", "John"];
const orders = await fetchOrder(orderId);
const permission = new Set(["read", "write"]);
```

Good:

```ts
const users = ["Kate", "John"];
const order = await fetchOrder(orderId);
const permissions = new Set(["read", "write"]);
```

### Name collections by role

When a collection is a subset, view, or state-specific group, add the role before the plural entity name. The role should explain why those items are grouped.

Bad:

```ts
const users = allUsers.filter((user) => user.isActive);
const items = cartItems.filter((item) => item.isSelected);
const filtered = allUsers.filter((user) => user.role === "admin");
```

Good:

```ts
const activeUsers = allUsers.filter((user) => user.isActive);
const selectedItems = cartItems.filter((item) => item.isSelected);
const adminUsers = allUsers.filter((user) => user.role === "admin");
```

### Name lookup collections with By

Use `By` followed by the key name for dictionaries, maps, records, and other collections whose main purpose is keyed lookup. This makes both the stored values and the lookup key clear.

Bad:

```ts
const urls = {
  home: "/",
  pricing: "/pricing",
};

const users = new Map<string, User>();
```

Good:

```ts
const urlsBySlug = {
  home: "/",
  pricing: "/pricing",
};

const usersById = new Map<string, User>();
```

### Name booleans as yes/no facts

Boolean names must start with a yes/no prefix such as `is`, `are`, `can`, `has`, or `should`. The reader should be able to answer the name mentally with "yes" or "no".

Choose the prefix by meaning:

| Prefix       | Use for                                                    |
| ------------ | ---------------------------------------------------------- |
| `is` / `are` | State, quality, or classification.                         |
| `has`        | Possession or presence of something.                       |
| `can`        | Capability or permission.                                  |
| `should`     | A condition that controls whether an action should happen. |

Use this default structure:

```text
boolean prefix + entity + property/state/capability
```

Put the entity before the property, state, or capability: `isEmailValid`, not `isValidEmail`. The entity can be omitted when the surrounding context already provides it, such as `isEnabled` inside button-related code. For `should`, use `should + action + entity` when the name describes whether an action should happen, such as `shouldUpdateUrl`.

Use adjective-before-entity only when the adjective is part of the domain term, such as `primaryEmail`, `defaultLocale`, or `billingAddress`.

Bad:

```ts
const enabled = itemCount > 3;
const productsExist = products.length > 0;
const updateUrl = currentUrl !== expectedUrl;
const isValidEmail = email.includes("@");
const userCanEditDocument = document.ownerId === user.id;
```

Good:

```ts
const isEnabled = itemCount > 3;
const hasProducts = products.length > 0;
const shouldUpdateUrl = currentUrl !== expectedUrl;
const isEmailValid = email.includes("@");
const canUserEditDocument = document.ownerId === user.id;
```

### Name nullable values with maybe

Use `maybe` for values that may be `null` or `undefined` when the absence is expected and must be handled by the caller. Do not use `maybe` for required values or for values that already have a clearer state-specific name.

Prefer a state-specific name such as `selectedUser`, `currentUser`, or `fallbackUser` when the name already explains why the value may be absent. Use `maybe` when nullability is the most important fact the caller must notice.

Bad:

```ts
const user = usersById[userId];
const maybeItems = cart.items;
const maybeSelectedUser = getSelectedUserOrThrow();
```

Good:

```ts
const maybeUser = usersById[userId];
const items = cart.items;
const selectedUser = getSelectedUserOrThrow();
```

### Prefer meaningful defaults

Prefer meaningful defaults when absence has a safe domain meaning. Use `null` or `undefined` only when absence is a real state the caller must handle.

A meaningful default is a value that is true in the domain. It is not a placeholder used only to avoid a null check. Normalize missing values at boundaries when possible, then keep the rest of the code working with clear, expected values.

Bad:

```ts
const user = maybeUser ?? ({} as User);
const email = input.email ?? "";
const priceCents = product.priceCents ?? 0;
const loadedItems = maybeItems ?? [];
```

Good:

```ts
const items = response.items ?? [];
const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
const role = input.role ?? "member";
const maybePayment = paymentsById[paymentId];
```

Use a default only when the default value is valid in the domain. For example, `[]` is a good default when it means "there are no items", but a bad default when the real state is "items have not loaded yet".

### Use prev and next for state transitions

Use `prev` and `next` prefixes when a value represents the previous or next state in a transition. Use `current` when comparing both sides makes the current state explicit.

Bad:

```ts
const oldStatus = order.status;
const newStatus = "paid";
const updatedItems = [...items, nextItem];
```

Good:

```ts
const prevStatus = order.status;
const nextStatus = "paid";
const nextItems = [...items, nextItem];
```

### Name temporal values by meaning

Use temporal suffixes that describe what kind of time value is stored.

| Suffix               | Use for                                          |
| -------------------- | ------------------------------------------------ |
| `At`                 | A timestamp or date-time when something happens. |
| `On`                 | A calendar date without a specific time.         |
| `From` / `To`        | Range boundaries.                                |
| `Before` / `After`   | Relative comparison boundaries.                  |
| `Ms` / `Sec` / `Min` | Durations or timeouts with explicit units.       |

Bad:

```ts
const created = user.createdAt;
const expiry = token.expiresAt;
const timeout = 5000;
const date = "2026-05-19";
```

Good:

```ts
const createdAt = user.createdAt;
const expiresAt = token.expiresAt;
const timeoutMs = 5000;
const scheduledOn = "2026-05-19";
```

### Disambiguate noun-verb words

Some English words can be both nouns and verbs. Use the word according to its role in the current context.

When the word names a value, make the noun meaning clear. Add context when the stored value would otherwise be confused with an action. Do not add extra context when the word is already a natural noun in the domain or API boundary.

Words such as `request`, `response`, `command`, and `event` can be clear nouns when they refer to structured data or boundary concepts. Words such as `query`, `filter`, and `update` often need extra context because they can easily read as actions.

Bad:

```ts
const query = "status:active";
const filter = { status: "active" };
const update = { email: "user@example.com" };
const responseData = await api.users.get(userId);
```

Good:

```ts
const queryString = "status:active";
const filterParams = { status: "active" };
const updatePayload = { email: "user@example.com" };
const userResponse = await api.users.get(userId);
```

Natural noun usage:

```ts
function handleCreateUser(request: CreateUserRequest): CreateUserResponse {
  const user = createUser(request.payload);
  const response = { user };
  return response;
}

function handleUserCreated(event: UserCreatedEvent) {
  // ...
}
```

## Naming constants

Constants follow the same semantic rules as variables. Use upper snake case for module-level immutable configuration, limits, feature flags, environment values, and other fixed values that act as named constants.

Do not use upper snake case for every `const`. Local immutable variables still use the normal variable casing convention.

Bad:

```ts
export const maxItemsCount = 20;

function getCartItemsCount(cart: Cart) {
  const ITEMS_COUNT = cart.items.length;
  return ITEMS_COUNT;
}
```

Good:

```ts
export const MAX_ITEMS_COUNT = 20;

function getCartItemsCount(cart: Cart) {
  const itemsCount = cart.items.length;
  return itemsCount;
}
```

### Name enum-like dictionary keys like normal properties

For const objects used as enum-like dictionaries, name the keys with the normal property or variable casing for the language. In TypeScript and JavaScript, that usually means camel case.

Do not capitalize keys just because the object behaves like an enum. The dictionary may be a constant, but its keys are still property names.

Bad:

```ts
export const USER_ROLE = {
  Admin: "admin",
  SupportAgent: "supportAgent",
  SUPER_ADMIN: "superAdmin",
} as const;
```

Good:

```ts
export const USER_ROLE = {
  admin: "admin",
  supportAgent: "supportAgent",
  superAdmin: "superAdmin",
} as const;
```

Use the language's native enum-member convention when working with a real enum type. This rule is for dictionary-style enums and `as const` objects.

## Naming classes

Class names should be singular because a class represents one concept or instance shape. If a class represents a collection, use a singular name with a clear collection postfix such as `Collection`, `Registry`, `Store`, or `Repository`.

Bad:

```ts
class Users {
  // ...
}

class Orders {
  // ...
}
```

Good:

```ts
class User {
  // ...
}

class UserCollection {
  // ...
}
```

## Naming errors

Error class and type names must end with `Error`. Describe the failure reason with domain context and a clear state, such as `UserNotFoundError` or `PaymentFailedError`.

Use broad names such as `ApplicationError`, `DomainError`, or `ValidationError` only for base error categories. Concrete errors should be specific.

Bad:

```ts
class NotFound extends Error {
  // ...
}

class UserError extends Error {
  // ...
}

class CustomError extends Error {
  // ...
}
```

Good:

```ts
class UserNotFoundError extends Error {
  // ...
}

class InvalidEmailError extends Error {
  // ...
}

class PaymentFailedError extends Error {
  // ...
}
```

### Name caught errors clearly

Use `error` for a generic caught error. Use a contextual name when multiple errors are in scope or when the error source matters. Do not use contractions such as `err` or single-letter names such as `e`.

Bad:

```ts
try {
  await createUser(input);
} catch (err) {
  logger.error(err);
}
```

Good:

```ts
try {
  await createUser(input);
} catch (error) {
  logger.error(error);
}
```

When the context matters:

```ts
const userCreationError = await captureError(() => createUser(input));
const fieldErrorsByName = new Map<string, ValidationError>();
```

## Naming data shapes

Use suffixes to make the role of structured data explicit. The suffix should describe how the shape is used, not only what fields it contains.

| Suffix     | Use for                                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `Input`    | Data accepted by an internal function, use case, or operation.                                                       |
| `Params`   | Named parameters that configure a call, query, route, or operation.                                                  |
| `Payload`  | Data sent to another layer, service, event, command, or API.                                                         |
| `Request`  | Full inbound request shape, including transport/API context when relevant.                                           |
| `Response` | Full outbound response shape returned from a transport/API boundary.                                                 |
| `Dto`      | Data transfer object crossing process, network, or layer boundaries. Use `Dto`, not `DTO`, to follow acronym casing. |
| `Record`   | Persistence shape as stored in a database or external storage.                                                       |
| `Result`   | Outcome of an operation, especially when it may include status, value, or errors.                                    |

Bad:

```ts
type UserData = {
  email: string;
  password: string;
};

type UserInfo = {
  id: string;
  email: string;
};

type CreateUser = {
  email: string;
  password: string;
};
```

Good:

```ts
type CreateUserInput = {
  email: string;
  password: string;
};

type UserDto = {
  id: string;
  email: string;
};

type CreateUserResult = {
  user: User;
  welcomeEmailQueued: boolean;
};
```

### Match data shape names to boundaries

Use different suffixes when the same domain entity appears in different layers. Avoid reusing one vague shape name for unrelated boundaries.

Bad:

```ts
type User = {
  user_id: string;
  email_address: string;
};

type UserData = {
  id: string;
  email: string;
};
```

Good:

```ts
type UserRecord = {
  user_id: string;
  email_address: string;
};

type UserDto = {
  id: string;
  email: string;
};
```

## Naming functions

Function names must begin with a verb. A function does something, retrieves something, creates something, changes something, or answers a question.

Use the A/HC/LC pattern for non-boolean functions:

```text
Action (A) + High Context (HC) + optional Low Context (LC)
```

- Action: the verb that describes the operation, such as `fetch`, `get`, `build`, or `map`.
- High Context: the main concept the function operates on, such as `User`, `Order`, or `AccessLevel`.
- Low Context: an optional qualifier that narrows the name for this specific use, such as `FromCache`, `ToDto`, or `CreationPayload`.

Use low context only when it adds real distinction. Avoid repeating context already supplied by the surrounding class, module, object, or namespace.

Boolean-returning functions use a stricter `check + boolean result name` pattern described below.

Bad:

```ts
function userFromCache(id: string) {
  return usersById[id];
}

function userMessagesFromCache(userId: string) {
  return messagesByUserId[userId] ?? [];
}
```

Good:

```ts
function getUserFromCache(id: string) {
  return usersById[id];
}

function getUserMessagesFromCache(userId: string) {
  return messagesByUserId[userId] ?? [];
}
```

General examples:

| Name                       | Action (A) | High Context (HC) | Low Context (LC)  |
| -------------------------- | ---------- | ----------------- | ----------------- |
| `fetchUser`                | `fetch`    | `User`            |                   |
| `listUserMessages`         | `list`     | `User`            | `Messages`        |
| `getUserFromCache`         | `get`      | `User`            | `FromCache`       |
| `handleClickOutside`       | `handle`   | `Click`           | `Outside`         |
| `buildUserCreationPayload` | `build`    | `User`            | `CreationPayload` |

### Actions

Use a consistent action vocabulary. The verb prefix should express the function's main intent: what operation it performs, including directly wrapped helpers, not only what it returns.

The actions below are recommended defaults, not a complete list. Use another verb when it is more precise for the domain or behavior, as long as it is semantically clear and follows the same naming structure. Specific sections below refine these broad meanings.

| Action      | Use for                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `fetch`     | Loading external, remote, persisted, or not-yet-loaded data via I/O when no collection-specific action is clearer. |
| `list`      | Loading a collection when listing or enumeration is the main operation, especially with pagination or filtering.   |
| `create`    | Creating a new entity, object instance, service, tool, or local resource.                                          |
| `update`    | Changing an existing entity.                                                                                       |
| `delete`    | Permanently deleting an entity.                                                                                    |
| `get`       | Reading already available state or deriving a cheap local value.                                                   |
| `set`       | Assigning already available state to a new value.                                                                  |
| `reset`     | Returning state to its initial value.                                                                              |
| `remove`    | Removing an item from a collection or relation without deleting the item itself.                                   |
| `infer`     | Deriving a conclusion from available data or context.                                                              |
| `compose`   | Combining existing values into a simple new value, often a string or function.                                     |
| `build`     | Constructing a structured value through mapping, defaults, or multiple steps.                                      |
| `map`       | Changing an item or collection shape without changing the source.                                                  |
| `convert`   | Changing a value between formats, units, protocols, or representations.                                            |
| `transform` | Applying a broader structural or semantic change, often across several fields.                                     |
| `check`     | Evaluating a condition and returning a boolean. Follow the boolean-returning function pattern.                     |
| `assert`    | Enforcing a condition by throwing, failing, or narrowing when the condition is false.                              |
| `handle`    | Implementing event or callback handling.                                                                           |

#### Action selection

Choose the action from the function's main operation, including directly wrapped helpers.

1. Use I/O verbs such as `fetch`, `list`, `create`, `update`, and `delete` for external, persisted, or not-yet-loaded data.
2. Use local verbs such as `get`, `set`, `build`, `compose`, `map`, `convert`, `transform`, and `infer` for already available data or local derivation.
3. Ignore return type and `async` when choosing the verb; the operation decides.

Example: a function that loads releases and returns the latest version is `fetchLatestPackageVersion`, not `getLatestPackageVersion`.

#### CRUD and persistence actions

Use `fetch`, `list`, `create`, `update`, and `delete` consistently for operations that read or write external, remote, persisted, or not-yet-loaded data. Prefer `fetch` for loading a specific resource or response. Prefer `list` when the operation enumerates a collection.

Bad:

```ts
async function getUser(id: string) {
  return api.users.get(id);
}

async function getUsers() {
  return api.users.list();
}
```

Good:

```ts
async function fetchUser(id: string) {
  return api.users.get(id);
}

async function listUsers() {
  return api.users.list();
}
```

#### Getter and setter actions

Reserve `get` and `set` for already available state, property access, cache access, cheap local derivation, and local assignment.

Bad:

```ts
function fetchName(user: User) {
  return user.name;
}

function fetchUserFromCache(id: string) {
  return usersById[id];
}
```

Good:

```ts
function getName(user: User) {
  return user.name;
}

function getUserFromCache(id: string) {
  return usersById[id];
}
```

#### Remove and delete actions

Use `remove` when detaching an item from a collection or relation. Use `delete` when the item itself is permanently erased.

Bad:

```ts
function deleteFilter(filterId: string, filters: Filter[]) {
  return filters.filter((filter) => filter.id !== filterId);
}
```

Good:

```ts
function removeFilter(filterId: string, filters: Filter[]) {
  return filters.filter((filter) => filter.id !== filterId);
}
```

#### Derivation and construction actions

Use these actions for deriving or constructing values:

| Action    | Use for                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `infer`   | Deriving a conclusion from available data or context.                                                                           |
| `compose` | Combining existing values into a simple value.                                                                                  |
| `build`   | Constructing a structured value through mapping, defaults, or multiple steps.                                                   |
| `create`  | Local factories such as `createClient`, `createLogger`, or `createFormBuilder` when `create` is the clearest conventional verb. |

Bad:

```ts
function getAccessLevel(user: User) {
  return user.permissions.includes("admin") ? "admin" : "member";
}

function composeUserCreationPayload(form: UserForm) {
  return {
    email: form.email.trim(),
    role: form.role ?? "member",
  };
}
```

Good:

```ts
function composePageUrl(pageSlug: string, pageId: string) {
  return `${pageSlug}-${pageId}`;
}

function inferAccessLevel(user: User) {
  return user.permissions.includes("admin") ? "admin" : "member";
}

function buildUserCreationPayload(form: UserForm) {
  return {
    email: form.email.trim(),
    role: form.role ?? "member",
  };
}

function createLogger(config: LoggerConfig) {
  return new Logger(config);
}
```

#### Transformation and conversion actions

Use `map`, `convert`, or `transform` for functions that turn one representation into another. Do not start function names with `to` or `from`; they are direction words, not actions. Use `to` and `from` inside a verb-first name when the direction matters.

Use this structure:

```text
map/convert/transform + source + To + target
```

Keep the source in the name unless the surrounding context already provides it, such as inside a dedicated `UserMapper`.

Choose the action by intent:

| Action      | Use for                                                          |
| ----------- | ---------------------------------------------------------------- |
| `map`       | Shape-to-shape changes, especially object or collection mapping. |
| `convert`   | Format, unit, protocol, or representation changes.               |
| `transform` | Larger structural or semantic changes.                           |

Bad:

```ts
function toUserDto(user: User) {
  return { id: user.id, email: user.email };
}

function fromUserRecord(record: UserRecord) {
  return new User(record);
}

function userDto(user: User) {
  return { id: user.id, email: user.email };
}

function mapToDto(user: User) {
  return { id: user.id, email: user.email };
}
```

Good:

```ts
function mapUserToDto(user: User) {
  return { id: user.id, email: user.email };
}

function mapUserRecordToUser(record: UserRecord) {
  return new User(record);
}

function convertPriceCentsToDollars(priceCents: number) {
  return priceCents / 100;
}

function transformLegacyUserToUser(legacyUser: LegacyUser) {
  return {
    id: legacyUser.user_id,
    email: legacyUser.email_address.trim().toLowerCase(),
  };
}
```

Acceptable when the source is provided by context:

```ts
class UserMapper {
  mapToDto(user: User) {
    return { id: user.id, email: user.email };
  }
}
```

### Name boolean-returning functions after their result

Functions that return a boolean must begin with `check`. After `check`, use the same boolean name that can store the result.

Use this structure:

```text
check + boolean prefix + entity + property/state/capability
```

This keeps the function action (`check`) separate from the boolean result (`isEmailValid`, `canUserEditDocument`, `shouldUpdateUrl`).

Bad:

```ts
function validEmail(email: string): boolean {
  return email.includes("@");
}

function userCanEditDocument(user: User, document: Document): boolean {
  return document.ownerId === user.id;
}

function permission(user: User, resource: Resource): boolean {
  return user.permissions.includes(resource.requiredPermission);
}

function checkIsValidEmail(email: string): boolean {
  return email.includes("@");
}

function checkUserCanEditDocument(user: User, document: Document): boolean {
  return document.ownerId === user.id;
}

const editPermission = userCanEditDocument(user, document);
```

Good:

```ts
function checkIsEmailValid(email: string): boolean {
  return email.includes("@");
}

function checkCanUserEditDocument(user: User, document: Document): boolean {
  return document.ownerId === user.id;
}

function checkHasUserPermission(user: User, resource: Resource): boolean {
  return user.permissions.includes(resource.requiredPermission);
}

const isEmailValid = checkIsEmailValid(email);
const canUserEditDocument = checkCanUserEditDocument(user, document);
const hasUserPermission = checkHasUserPermission(user, resource);
```

### Name assertion functions after the enforced condition

Assertion functions must begin with `assert`. After `assert`, use the same yes/no condition name that would be used for a boolean result.

Use this structure:

```text
assert + boolean prefix + entity + property/state/capability
```

Use `check` when the caller needs a boolean. Use `assert` when invalid state should stop execution, throw an error, fail a test, or narrow a type.

Bad:

```ts
function validateEmail(email: string): void {
  if (!checkIsEmailValid(email)) {
    throw new InvalidEmailError();
  }
}

function assertEmailValidity(email: string): void {
  if (!checkIsEmailValid(email)) {
    throw new InvalidEmailError();
  }
}
```

Good:

```ts
function assertIsEmailValid(email: string): void {
  if (!checkIsEmailValid(email)) {
    throw new InvalidEmailError();
  }
}

function assertCanUserEditDocument(user: User, document: Document): void {
  if (!checkCanUserEditDocument(user, document)) {
    throw new UserPermissionError();
  }
}
```

### Name events as facts that happened

Event names should describe what happened in the domain. Use a noun plus a past-tense verb or state, such as `userCreated`, `orderCancelled`, or `paymentFailed`.

Do not name events as commands. Commands ask the system to do something; events report that something already happened.

Bad:

```ts
emit("createUser", user);
emit("cancelOrder", order);
emit("paymentFail", payment);
```

Good:

```ts
emit("userCreated", user);
emit("orderCancelled", order);
emit("paymentFailed", payment);
```

### Use on and handle for event handling

Use `on` for event callback properties, parameters, and subscriptions. Use `handle` for the function that implements the event handling.

Bad:

```ts
type ButtonProps = {
  click: () => void;
};

function clickButton() {
  // ...
}

button.addEventListener("click", clickButton);
eventBus.subscribe("userCreated", userCreated);
```

Good:

```ts
type ButtonProps = {
  onClick: () => void;
};

function handleClick() {
  // ...
}

function handleUserCreated(event: UserCreatedEvent) {
  // ...
}

button.addEventListener("click", handleClick);
eventBus.subscribe("userCreated", handleUserCreated);
```
