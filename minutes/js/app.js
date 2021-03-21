/*
 *	Author: Anant Kaushik | MSE-SS | CMU
 *  Copyright (c) 2020 CMU
 */

const convertNotesJsonToHtml = (json) => {
  let notes = "";

  if (Array.isArray(json)) {
    json.map((val) => {
      notes += convertNotesJsonToHtml(val);
    });
  } else if (typeof json === "object") {
    for (const key in json) {
      notes += `<li>${key}</li>`;
      notes += `<ul class="plus">`;
      notes += convertNotesJsonToHtml(json[key]);
      notes += `</ul>`;
    }
  } else if (typeof json === "string") {
    return `<li>${json}</li>`;
  }

  return notes;
};

const noteHtml = (data) => {
  const { minutes } = data;

  // Initialise
  var note = $(`<div class="meeting-detailed"><ul class="md-notes-main"></ul></div>`);
  note.find(".md-notes-main").html(convertNotesJsonToHtml(minutes["main"]));

  let restOfTheNotes = [];

  for (const key in minutes) {
    if (key == "main") continue;

    // Add header
    restOfTheNotes += `<div class="note-type">${key}</div>`;

    // notes
    restOfTheNotes += `<ul class="plus">`;
    restOfTheNotes += convertNotesJsonToHtml(minutes[key]);
    restOfTheNotes += `</ul>`;
  }

  note.append(restOfTheNotes);

  return note.html();
};

new Vue({
  el: '#minutes',
  data: {
    tree: minutes.reduce((accum, current) => {
      const { date = 'N/A', month = 'N/A', year = 'N/A' } = current['meeting-date'] || {};

      accum[year] = accum[year] || {};
      accum[year][month] = accum[year][month] || {};
      accum[year][month][date] = current;

      return accum;
    }, {})
  },
  methods: {
    noteHtml: noteHtml,
  },
  mounted: () => {
    $('.panel-title a').on('click', function(){
      $(this).toggleClass('dropup');
    });
  },
});
