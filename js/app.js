$(() => {});

$("#meeting-detailed-close").click(() => {
  toggleMeetingsDetails(false);
});

$(".calender-date-item").click(() => {
  toggleMeetingsDetails(true);
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
