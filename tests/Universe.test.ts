import { Universe } from "../src/engine/Universe";
import { StoryBeat } from "../src/engine/StoryBeat";

test("visitStory increments visit count and adds beat to history", () => {
  const universe = new Universe();
  const beat1 = new StoryBeat("beat1");
  const beat2 = new StoryBeat("beat2");

  universe.visitStory(beat1);
  expect(universe.visits[beat1.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId]);

  universe.visitStory(beat2);
  expect(universe.visits[beat2.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId, beat2.beatId]);
});

test("visitStory does not increment visit count and does not add beat to history if allowRepeatVisit is false and beat has been visited before", () => {
  const universe = new Universe();
  const beat1 = new StoryBeat("beat1", { allowRepeatVisit: false });

  expect(universe.visitStory(beat1)).toBe(true);
  expect(universe.visits[beat1.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId]);

  expect(universe.visitStory(beat1)).toBe(false);
  expect(universe.visits[beat1.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId]);
});

test("visitStory increments visit count and adds beat to history if allowRepeatVisit is true and beat has been visited before", () => {
  const universe = new Universe();
  const beat1 = new StoryBeat("beat1", { allowRepeatVisit: true });

  expect(universe.visitStory(beat1)).toBe(true);
  expect(universe.visits[beat1.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId]);

  expect(universe.visitStory(beat1)).toBe(true);
  expect(universe.visits[beat1.beatId]).toBe(2);
  expect(universe.history).toEqual([beat1.beatId, beat1.beatId]);
});
