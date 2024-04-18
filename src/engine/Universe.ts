import { StoryBeat } from "./StoryBeat";

/**
 * Top level object, used to:
 * 1. Describe and keep track of the entire story graph.
 * 2. Keep track of variables (or facts).
 * 3. Performs the next story beat collapse.
 */
export class Universe {
  public static inkVersionCurrent = 21;

  private _facts: UniverseFactsType = {};

  // How many times a particular story beat has been visited.
  // Key is the beatId, value is the visit count.
  private _visits: Record<string, number> = {};

  // The story beats traversed by the player.
  private _history: string[] = [];

  get facts() {
    return this._facts;
  }

  get visits() {
    return this._visits;
  }

  get history() {
    return this._history;
  }

  /**
   * Store a visit to a new story beat.
   * @param storyBeat The ID of the story beat.
   */
  public visitStory(beat: StoryBeat): void {
    const beatId = beat.beatId;
    if (this._visits[beatId]) {
      this._visits[beatId]++;
    } else {
      this._visits[beatId] = 1;
    }

    this._history.push(beatId);
  }
}

/**
 * UniverseFactsType is a simple key-value store for facts.
 * It contains variables from the ink engine, and other game state.
 */
export type UniverseFactsType = Record<string, string | number | boolean>;

/**
 * Convention for variable names for capturing inter-beat states:
 *
 *
 */
