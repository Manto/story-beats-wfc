import { BeatRequirement } from "./BeatRequirement";

/**
 * Individual node in the Universe story graph.
 *
 * Each node should be mapped to a single Ink story file,
 * but the actual implementation can vary.
 */
export class StoryBeat {
  readonly beatId: string = "";
  readonly resolution: BeatResolution = 0;
  readonly beatType: BeatType = BeatType.Unknown;
  readonly inkFilename: string = "";
  readonly requirements: BeatRequirement[] = [];
  readonly allowRepeatVisit: boolean = false;

  // How many times this beat has been played
  public visitCount: number = 0;

  constructor(
    beatId: string,
    params?: {
      resolution?: BeatResolution;
      beatType?: BeatType;
      inkFilename?: string;
      requirements?: BeatRequirement[];
      allowRepeatVisit?: boolean;
    }
  ) {
    this.beatId = beatId;
    if (params) {
      if (params.resolution !== undefined) {
        this.resolution = params.resolution;
      }
      if (params.beatType !== undefined) {
        this.beatType = params.beatType;
      }
      if (params.inkFilename !== undefined) {
        this.inkFilename = params.inkFilename;
      }
      if (params.requirements !== undefined) {
        this.requirements = params.requirements;
      }
      if (params.allowRepeatVisit !== undefined) {
        this.allowRepeatVisit = params.allowRepeatVisit;
      }
    }
  }
}

export type BeatResolution = -2 | -1 | 0 | 1 | 2;

export enum BeatType {
  Procedural = "PROCEDURAL",
  Dramatic = "DRAMATIC",
  Commentary = "COMMENTARY",
  Anticipation = "ANTICIPATION",
  Gratification = "GRATIFICATION",
  Bringdown = "BRINGDOWN",
  Pipe = "PIPE",
  Question = "QUESTION",
  Reveal = "REVEAL",
  Unknown = "Unknown",
}
