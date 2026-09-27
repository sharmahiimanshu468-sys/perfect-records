mixin () {
  public query func getApiDoc() : async Text {
    "# Perfect Records Official — Backend API

## Purpose

This canister stores inquiries submitted through the Perfect Records Official
website. Each inquiry captures a prospective client's name, email, requested
project type, and message so the studio can follow up on production, video
editing, and poster design work.

## Public methods

### `submitInquiry(input : InquiryInput) : async Result<Inquiry, InquiryError>`

Stores a new inquiry and returns the created record on success.

`InquiryInput` is a record with these fields:

- `name : Text` — the submitter's name. Must be non-empty.
- `email : Text` — the submitter's email address. Must contain `@`.
- `projectType : ProjectType` — one of `#videoEditing`, `#posterDesign`,
  `#fullTrackProduction`, `#devotionalSpiritual`, `#customComposition`,
  `#mixingMastering`, or `#other`.
- `message : Text` — the inquiry body. Must be non-empty.

On success the result is `#ok(inquiry)`, where `inquiry` is:

- `id : Nat` — a monotonically increasing identifier assigned by the canister.
- `name`, `email`, `projectType`, `message` — the submitted values.
- `createdAt : Nat` — the creation time in nanoseconds since the Unix epoch
  (the absolute value of the canister's `Time.now()`).

On failure the result is `#err(error)` with one of:

- `#invalidName` — `name` was empty.
- `#invalidEmail` — `email` did not contain `@`.
- `#invalidMessage` — `message` was empty.

Validation is performed in order: name, then email, then message. The first
failing check is returned.

### `listInquiries() : async [Inquiry]`

Returns every stored inquiry as an array, in insertion order (oldest first).

This is an admin-only query. A caller without the `#admin` permission receives
a trap with the message `Unauthorized: Only admins can view inquiries`.

## Authentication and authorization

- `submitInquiry` is open to any caller, including anonymous callers. It does
  not require a signed-in identity and does not check permissions.
- `listInquiries` requires the `#admin` role in the canister's access-control
  state. The first caller to initialize access control receives the owner role;
  subsequent callers receive the default role and must be granted `#admin`
  before they can list inquiries.
- The app's frontend pins an Internet Identity derivation origin, published at
  `/.well-known/ii-derivation-origin` when available. An agent already holding
  the user's Internet Identity authorization derives the correct per-app
  principal against that origin (for example
  `icp identity link web <name> --app <host>`). Such a delegation acts with the
  user's full authority in this app until it expires.
- Registration happens only when a caller signs in through the app's own
  frontend. A principal that never did so is unregistered even when it belongs
  to the app's owner, and a signed-in caller derived against a different origin
  is a different principal than the one the frontend registered. A direct API
  caller must call `_initialize_access_control` once as a signed-in caller
  before any role-guarded call, including guarded queries.

## Units and encodings

- `createdAt` is a `Nat` count of nanoseconds since the Unix epoch.
- `id` is a `Nat` starting at `0` and incrementing by one per stored inquiry.
- `projectType` is a Candid variant; the OQL projection renders it as the text
  tag name (`videoEditing`, `posterDesign`, and so on).
- Optional values are represented as Candid `opt`; absent values are `null`.

## Mutation retry safety

`submitInquiry` is not idempotent. Every successful call appends a new inquiry
and consumes a new `id`, so retrying a call that already succeeded creates a
duplicate record. Do not retry automatically on an ambiguous outcome; confirm
with the user before resubmitting.

## Errors, traps, and limits

- `submitInquiry` reports validation failures as `#err` variants rather than
  traps, so callers can branch on them.
- `listInquiries` traps for unauthorized callers; the trap message is
  `Unauthorized: Only admins can view inquiries`.
- There is no pagination on `listInquiries`; it returns the full array.
- There is no delete or update endpoint; stored inquiries are immutable.
";
  };
};
