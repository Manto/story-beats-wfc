import { UniverseFactsType } from "./Universe";

export enum RequirementType {
  Fact = "FACT",
  History = "HISTORY",
}

export interface BeatRequirement {
  requirementType: RequirementType;
  hasMet: (facts: UniverseFactsType) => boolean;
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

  hasMet(facts: UniverseFactsType): boolean {
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
