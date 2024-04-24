// Data loader class for initializing a group of story beats
// from JSON file or other data source.

import {
  BeatRequirement,
  FactRequirement,
  RequirementType,
} from "./BeatRequirement";
import { StoryBeat } from "./StoryBeat";

export class StoryBeatsLoader {
  // Load story beats from a JSON file.
  public static loadFromJson(json: string): StoryBeat[] {
    const storyBeats: StoryBeat[] = [];
    const storyBeatIds: string[] = [];

    // Parse the JSON file
    const data = JSON.parse(json);

    // For each story beat in the JSON file
    for (const beatData of data) {
      // Check for duplicate beat IDs
      if (storyBeatIds.includes(beatData.beatId)) {
        throw new Error(`Duplicate beat ID: ${beatData.beatId}`);
      }
      storyBeatIds.push(beatData.beatId);

      const beat = new StoryBeat(beatData.beatId, {
        resolution: beatData.resolution,
        beatType: beatData.beatType,
        inkFilename: beatData.inkFilename,
        allowRepeatVisit: beatData.allowRepeatVisit,
      });

      // Add requirements to the story beat
      if (beatData.requirements) {
        for (const reqData of beatData.requirements) {
          if (reqData.type === RequirementType.Fact) {
            const req = new FactRequirement(
              reqData.factName,
              reqData.comparison,
              reqData.value
            );
            beat.requirements.push(req);
          } else if (reqData.type === RequirementType.History) {
            //
          } else {
            // Throw error for unknown requirement type
            throw new Error(`Unknown requirement type: ${reqData.type}`);
          }
        }
      }

      storyBeats.push(beat);
    }

    return storyBeats;
  }
}
