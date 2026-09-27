import type { Backend } from "@/backend";
import { ProjectType } from "@/backend";
import { vi } from "vitest";

/**
 * A typed stand-in for the generated `Backend` actor. Only the methods the
 * frontend actually calls are implemented; everything else is a vi.fn so a
 * test can assert on the call shape without a live canister.
 *
 * This is a local mock, not the real backend: a suite built on it passes
 * identically against a canister whose methods are unimplemented stubs.
 */
export type MockBackend = {
  submitInquiry: ReturnType<typeof vi.fn>;
  listInquiries: ReturnType<typeof vi.fn>;
};

export function createMockBackend(
  overrides: Partial<MockBackend> = {},
): MockBackend {
  return {
    submitInquiry: vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: {
        id: 1n,
        name: "Ada",
        email: "ada@example.com",
        projectType: ProjectType.videoEditing,
        message: "A brief",
        createdAt: 0n,
      },
    })),
    listInquiries: vi.fn(async () => []),
    ...overrides,
  };
}

/** Cast a local mock to the generated actor type at the seam. */
export function asBackend(mock: MockBackend): Backend {
  return mock as unknown as Backend;
}
