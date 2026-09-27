import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";

/**
 * A controllable IntersectionObserver. Tests drive entry and exit explicitly so
 * the re-arm behaviour is asserted without depending on real scroll timing.
 */
type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly callback: ObserverCallback;
  readonly targets = new Set<Element>();

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }

  takeRecords() {
    return [];
  }

  /** Simulate every observed target entering or leaving the viewport. */
  emit(isIntersecting: boolean) {
    const entries = [...this.targets].map(
      (target) =>
        ({
          target,
          isIntersecting,
          intersectionRatio: isIntersecting ? 1 : 0,
        }) as unknown as IntersectionObserverEntry,
    );
    this.callback(entries);
  }
}

function latestObserver(): MockIntersectionObserver {
  const observer =
    MockIntersectionObserver.instances[
      MockIntersectionObserver.instances.length - 1
    ];
  if (!observer) throw new Error("no IntersectionObserver was created");
  return observer;
}

describe("scroll reveal re-arms on every viewport entry", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("flips data-revealed true on entry and back to false on exit", () => {
    render(
      <Reveal>
        <p>Revealed content</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Revealed content").parentElement;
    expect(wrapper).toHaveAttribute("data-revealed", "false");

    act(() => latestObserver().emit(true));
    expect(wrapper).toHaveAttribute("data-revealed", "true");

    // Leaving the viewport re-arms the animation...
    act(() => latestObserver().emit(false));
    expect(wrapper).toHaveAttribute("data-revealed", "false");

    // ...so the next entry replays it, in either scroll direction.
    act(() => latestObserver().emit(true));
    expect(wrapper).toHaveAttribute("data-revealed", "true");
  });

  it("re-runs the stat counter each time it re-enters the viewport", () => {
    // Drive rAF synchronously so the count-up settles without real time.
    let now = 0;
    const frames: FrameRequestCallback[] = [];
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
      frames.push(cb);
      return frames.length;
    });
    vi.stubGlobal("cancelAnimationFrame", () => {});
    vi.spyOn(performance, "now").mockImplementation(() => now);

    render(<CountUp value={52} suffix="" />);

    expect(screen.getByText("0")).toBeInTheDocument();

    act(() => latestObserver().emit(true));
    // Run the animation to completion.
    now = 2000;
    act(() => {
      while (frames.length > 0) {
        const cb = frames.shift();
        cb?.(now);
      }
    });
    expect(screen.getByText("52")).toBeInTheDocument();

    // Leaving the viewport resets it, so the next entry replays the count.
    act(() => latestObserver().emit(false));
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
