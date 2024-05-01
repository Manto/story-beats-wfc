import { BeatRequirement } from "./BeatRequirement";

/**
 * Individual node in the Universe story graph.
 *
 * Each node should be mapped to a single Ink story file,
 * but the actual implementation can vary.
 */
export class StoryBeat {
  public beatId: string = "";
  public resolution: BeatResolution = 0;
  public beatType: BeatType = BeatType.Unknown;
  public inkFilename: string = "";
  public requirements: BeatRequirement[] = [];
  public allowRepeatVisit: boolean = false;
  public summary: string = "";
  public created: Date = new Date();
  public updated: Date = new Date();

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
      summary?: string;
      created?: Date;
      updated?: Date;
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
      if (params.summary !== undefined) {
        this.summary = params.summary;
      }
      if (params.created !== undefined) {
        this.created = params.created;
      }
      if (params.updated !== undefined) {
        this.updated = params.updated;
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
