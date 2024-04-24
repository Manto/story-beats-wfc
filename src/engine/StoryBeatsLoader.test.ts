import { StoryBeatsLoader } from "./StoryBeatsLoader";
import { BeatRequirement, ComparisonType } from "./BeatRequirement";
import { BeatType, StoryBeat } from "./StoryBeat";

test("Load story beats from JSON", () => {
  const json = `
    [
      {
        "beatId": "1",
        "resolution": 1,
        "beatType": "DRAMATIC",
        "inkFilename": "file1.ink",
        "allowRepeatVisit": true,
        "requirements": [
          {
            "factName": "Hello",
            "comparison": "EQ",
            "value": 123
          },
          {
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
            "factName": "Hello",
            "comparison": "GT",
            "value": 100
          }
        ]
      }
    ]
  `;

  const expectedStoryBeats: StoryBeat[] = [
    new StoryBeat("1", {
      resolution: 1,
      beatType: BeatType.Dramatic,
      inkFilename: "file1.ink",
      allowRepeatVisit: true,
      requirements: [
        new BeatRequirement("Hello", ComparisonType.Equal, 123),
        new BeatRequirement("Name", ComparisonType.Equal, "Bing"),
      ],
    }),
    new StoryBeat("2", {
      resolution: -1,
      beatType: BeatType.Procedural,
      inkFilename: "file2.ink",
      allowRepeatVisit: false,
      requirements: [
        new BeatRequirement("Hello", ComparisonType.GreaterThan, 100),
      ],
    }),
  ];

  const storyBeats = StoryBeatsLoader.loadFromJson(json);
  expect(storyBeats).toEqual(expectedStoryBeats);
});

test("Throw error for duplicate beat ID", () => {
  const json = `
    [
      {
        "beatId": "1",
        "resolution": 1,
        "beatType": "PROCEDURAL",
        "inkFilename": "file1.ink",
        "allowRepeatVisit": true,
        "requirements": [
          {
            "factName": "Hello",
            "comparison": "Equal",
            "value": 123
          },
          {
            "factName": "Name",
            "comparison": "Equal",
            "value": "Bing"
          }
        ]
      },
      {
        "beatId": "1",
        "resolution": -1,
        "beatType": "PROCEDURAL",
        "inkFilename": "file2.ink",
        "allowRepeatVisit": false,
        "requirements": [
          {
            "factName": "Hello",
            "comparison": "GreaterThan",
            "value": 100
          }
        ]
      }
    ]
  `;

  expect(() => {
    StoryBeatsLoader.loadFromJson(json);
  }).toThrowError("Duplicate beat ID: 1");
});
