import { StoryBeatsLoader } from "./StoryBeatsLoader";
import {
  BeatRequirement,
  ComparisonType,
  FactRequirement,
} from "./BeatRequirement";
import { BeatType, StoryBeat } from "./StoryBeat";

const trivialBeats = `
[
  {
    "beatId": "1",
    "resolution": 1,
    "beatType": "DRAMATIC",
    "inkFilename": "file1.ink",
    "allowRepeatVisit": true,
    "requirements": [
      {
        "type": "FACT",
        "factName": "Hello",
        "comparison": "EQ",
        "value": 123
      },
      {
        "type": "FACT",
        "factName": "Name",
        "comparison": "EQ",
        "value": "Bing"
      }
    ]
  },
  {
    "beatId": "2",
    "resolution": -1,
    "beatType": "PROCEDURAL",
    "inkFilename": "file2.ink",
    "allowRepeatVisit": false,
    "requirements": [
      {
        "type": "FACT",
        "FactRequirement": "FACT",
        "factName": "Hello",
        "comparison": "GT",
        "value": 100
      }
    ]
  }
]
`;

test("Load story beats from JSON", () => {
  const json = trivialBeats;
  const expectedStoryBeats: StoryBeat[] = [
    new StoryBeat("1", {
      resolution: 1,
      beatType: BeatType.Dramatic,
      inkFilename: "file1.ink",
      allowRepeatVisit: true,
      requirements: [
        new FactRequirement("Hello", ComparisonType.Equal, 123),
        new FactRequirement("Name", ComparisonType.Equal, "Bing"),
      ],
    }),
    new StoryBeat("2", {
      resolution: -1,
      beatType: BeatType.Procedural,
      inkFilename: "file2.ink",
      allowRepeatVisit: false,
      requirements: [
        new FactRequirement("Hello", ComparisonType.GreaterThan, 100),
      ],
    }),
  ];

  const storyBeats = StoryBeatsLoader.loadFromJson(json);
  expect(storyBeats).toEqual(expectedStoryBeats);
});

test("Throw error for duplicate beat ID", () => {
  const json = structuredClone(trivialBeats);
  const parsedJson = JSON.parse(json);
  parsedJson[1].beatId = parsedJson[0].beatId;
  const duplicateJson = JSON.stringify(parsedJson);

  expect(() => {
    StoryBeatsLoader.loadFromJson(duplicateJson);
  }).toThrow("Duplicate beat ID: 1");
});
