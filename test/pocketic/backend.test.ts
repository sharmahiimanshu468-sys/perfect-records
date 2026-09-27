import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  // `listInquiries` is admin-only and traps for a non-admin caller, so the
  // empty-state read is asserted through the public write path instead: a
  // fresh canister has no inquiries, and the first submit returns id 0.
  const result = await actor.submitInquiry({
    name: "Ada",
    email: "ada@example.com",
    projectType: { videoEditing: null },
    message: "A brief",
  });
  expect(result).toMatchObject({ ok: { id: 0n, name: "Ada" } });
});

it("round-trips an inquiry through the real canister", async () => {
  const result = await actor.submitInquiry({
    name: "Grace",
    email: "grace@example.com",
    projectType: { posterDesign: null },
    message: "A poster for my single",
  });

  expect(result).toMatchObject({
    ok: {
      name: "Grace",
      email: "grace@example.com",
      projectType: { posterDesign: null },
      message: "A poster for my single",
    },
  });
});

it("rejects an inquiry with an empty name", async () => {
  const result = await actor.submitInquiry({
    name: "",
    email: "ada@example.com",
    projectType: { videoEditing: null },
    message: "A brief",
  });
  expect(result).toEqual({ err: { invalidName: null } });
});

it("rejects an inquiry with an email missing an @", async () => {
  const result = await actor.submitInquiry({
    name: "Ada",
    email: "not-an-email",
    projectType: { videoEditing: null },
    message: "A brief",
  });
  expect(result).toEqual({ err: { invalidEmail: null } });
});

it("rejects an inquiry with an empty message", async () => {
  const result = await actor.submitInquiry({
    name: "Ada",
    email: "ada@example.com",
    projectType: { videoEditing: null },
    message: "",
  });
  expect(result).toEqual({ err: { invalidMessage: null } });
});

it("does not expose inquiries to a non-admin caller", async () => {
  // A freshly created actor calls as the anonymous principal until an identity
  // is set, and `listInquiries` traps for anyone without the admin role.
  const guest = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(guest.listInquiries()).rejects.toThrow();
});
