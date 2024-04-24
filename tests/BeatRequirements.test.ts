import {
  BeatRequirement,
  ComparisonType,
  FactRequirement,
} from "../src/engine/BeatRequirement";
import { UniverseFactsType } from "../src/engine/Universe";

test("Basic BeatRequirements validation logic", () => {
  const facts: UniverseFactsType = {
    Hello: 123,
    Name: "Bing",
  };
  const eqReq = new FactRequirement("Hello", ComparisonType.Equal, 123);
  expect(eqReq.hasMet(facts)).toBe(true);

  const eqReq2 = new FactRequirement("Name", ComparisonType.Equal, "Bing");
  expect(eqReq2.hasMet(facts)).toBe(true);

  const neqReq = new FactRequirement("Hello", ComparisonType.NotEqual, 123);
  expect(neqReq.hasMet(facts)).toBe(false);

  const gtReq = new FactRequirement("Hello", ComparisonType.GreaterThan, 100);
  expect(gtReq.hasMet(facts)).toBe(true);

  const ltReq = new FactRequirement("Hello", ComparisonType.LessThan, 200);
  expect(ltReq.hasMet(facts)).toBe(true);
});

// https://stackoverflow.com/questions/5630123/javascript-string-integer-comparisons
test("FactRequirement req value type mismatch", () => {
  const facts: UniverseFactsType = {
    Hello: 123,
    Name: "Bing",
  };
  const eqReq = new FactRequirement("Name", ComparisonType.GreaterThan, 1);
  expect(eqReq.hasMet(facts)).toBe(false);
});
