/*
 *	Author: Anant Kaushik | MSE-SS | CMU
 *  Copyright (c) 2020 CMU
 */

$(() => {
  setupMinutes(minutes);
});

const toggleMeetingsDetails = (val = true) => {
  if (val) {
    $("#meetings-calendar").addClass("hidden");
    $("#meeting-detailed").removeClass("hidden");
  } else {
    $("#meetings-calendar").removeClass("hidden");
    $("#meeting-detailed").addClass("hidden");
  }
};

const createCalenderDiv = (meetingDate, key, type) => {
  let deanTag =
    type === "dean" ? `<div class="type"><small>w/</small>Dean</div>` : "";
  return `<div class="calender-date-item" data-id="${key}">
            <div class="date">${meetingDate.date}</div>
            ${deanTag}
            <div class="month">${meetingDate.month}</div>
            <div class="line"></div>
        </div>`;
};

const handleShowMinutes = (event, json) => {
  let target = $(event.currentTarget);
  let id = target.data("id");
  let minutes = json[id];

  // Setup date
  let meetingDate = minutes["meeting-date"];

  $("#md-date").html(meetingDate.date);
  $("#md-month").html(meetingDate.month);
  $("#md-year").html(meetingDate.year);

  setupMinutesDetails(minutes["minutes"], minutes["type"]);
  toggleMeetingsDetails(true);
};

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

const setupMinutesDetails = (minutes, type) => {
  // Initialise
  $("#md-notes").html(`<ul class="plus" id="md-notes-main"></ul>`);
  $("#md-type").addClass("hidden");

  if (type == "dean") {
    $("#md-type").removeClass("hidden");
  }

  $("#md-notes-main").html(convertNotesJsonToHtml(minutes["main"]));

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

  $("#md-notes").append(restOfTheNotes);
};

const setupMinutes = (json) => {
  let calenderDivs = "";
  json.forEach((minutes, key) => {
    calenderDivs += createCalenderDiv(
      minutes["meeting-date"],
      key,
      minutes["type"]
    );
  });

  // Add calender values
  $("#meetings-calendar").html(calenderDivs);

  // Setup actions
  $("#meeting-detailed-close").click(() => {
    toggleMeetingsDetails(false);
  });

  $("#nav-minutes").click(() => {
    toggleMeetingsDetails(false);
  });

  $(".calender-date-item").click((event) => handleShowMinutes(event, json));
};
