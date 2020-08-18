### Data Structure for minutes

All the minutes should be in descending order of the meeting data of the following structure

```
{
  "meeting-date": {
    date: STRING,
    month: STRING,
    year: STRING,
  },
  type: STRING, // Special meeting type (optional)
  minutes: {
    main: [STRING],
    KEY: [STRING]
  },
},

```

##### Minutes

The `minutes` is an object type. The keys (STRING) which become become the headings and the value (Array of OBJECT/STRING) becomes the
bullet point discussed under the heading.

The value array can contain string or an object, which intern can have a key and and array of string and object as value.

Say we want to show the following notes

HEADING

- Point 1
- Point 2
  - SubPoint 1
  - SubPoint 2
- Point 3
- Point 4
- Point 5
  - SubPoint 1
    - SubSubPoint 1

The minutes object will become

```
  minutes : {
    "HEADING" : [
      "Point 1",
      { "Point 2" : [ "SubPoint 1", "SubPoint 2"] },
      "Point 3",
      "Point 4",
      {
        "Point 5" : [
          { "SubPoint 1" : [ "SubSubPoint 1" ] }
        ]
      }
    ]
  }
```

With this approach we can have as many nested pointed as we like.
