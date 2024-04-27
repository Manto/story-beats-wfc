import { UniverseFactsType } from "./Universe";

export enum RequirementType {
  Fact = "FACT",
  History = "HISTORY",
}

export interface BeatRequirement {
  requirementType: RequirementType;
  hasMet: (facts: UniverseFactsType, visits: Record<string, number>) => boolean;
}

export class HistoryRequirement implements BeatRequirement {
  requirementType: RequirementType = RequirementType.History;
  readonly beatId: string = "";
  readonly comparison: ComparisonType = ComparisonType.Equal;
  readonly value: number = 0;

  hasMet(facts: UniverseFactsType, visits: Record<string, number>): boolean {
    const beatVisits = visits[this.beatId] || 0;

    if (this.comparison === ComparisonType.Equal) {
      return this.value === beatVisits;
    }
    if (this.comparison === ComparisonType.NotEqual) {
      return this.value !== beatVisits;
    }
    if (this.comparison === ComparisonType.GreaterThan) {
      return beatVisits > this.value;
    }
    if (this.comparison === ComparisonType.LessThan) {
      return beatVisits < this.value;
    }
    return false;
  }
}

export class FactRequirement implements BeatRequirement {
  requirementType: RequirementType = RequirementType.Fact;
  readonly factName: string = "";
  readonly comparison: ComparisonType = ComparisonType.Equal;
  readonly value: string | number = "";

  constructor(
    factName: string,
    comparison: ComparisonType,
    value: string | number
  ) {
    this.factName = factName;
    this.comparison = comparison;
    this.value = value;
  }

  hasMet(facts: UniverseFactsType, visits: Record<string, number>): boolean {
    const factValue = facts[this.factName];

    // If fact cannot be found, return undefined.
    if (factValue === undefined) {
      return false;
    }
    if (this.comparison === ComparisonType.Equal) {
      return this.value === factValue;
    }
    if (this.comparison === ComparisonType.NotEqual) {
      return this.value !== factValue;
    }
    if (this.comparison === ComparisonType.GreaterThan) {
      return factValue > this.value;
    }
    if (this.comparison === ComparisonType.LessThan) {
      return factValue < this.value;
    }
    return false;
  }
}

// TODO: Add support for Array.include and exclude
export enum ComparisonType {
  Equal = "EQ",
  NotEqual = "NE",
  GreaterThan = "GT",
  LessThan = "LT",
}
