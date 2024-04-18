import { Universe } from "../src/engine/Universe";
import { StoryBeat } from "../src/engine/StoryBeat";

test("visitStory increments visit count and adds beat to history", () => {
  const universe = new Universe();
  const beat1 = new StoryBeat("beat1");
  const beat2 = new StoryBeat("beat2");

  universe.visitStory(beat1);
  expect(universe.visits[beat1.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId]);

  universe.visitStory(beat1);
  expect(universe.visits[beat1.beatId]).toBe(2);
  expect(universe.history).toEqual([beat1.beatId, beat1.beatId]);

  universe.visitStory(beat2);
  expect(universe.visits[beat2.beatId]).toBe(1);
  expect(universe.history).toEqual([beat1.beatId, beat1.beatId, beat2.beatId]);
});
