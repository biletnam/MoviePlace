function loadSeatRow(row) {
  $.get("movieSeatRow.html", function(value) {
    var template = $.templates(value);
    var html = template.render(row);
    $("#seatBoxArea").append(html);
  });
}

function loadSeat(seat) {
  $.get("movieSeat.html", function(value) {
    var template = $.templates(value);
    var html = template.render(seat);
    $(".row" + seat["row"]).append(html);
  });
}

$("#loadSeatsBtn").on("click", function() {
  $("#welcomeTitle, #loadSeatsBtn").hide("fast");
  $("#seatsArea").show("fast");
  var seatLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (var j = 0; j < 10; j++) {
    var row = {};
    row["row"] = seatLabels[j];
    loadSeatRow(row);
    for (var i = 0; i < 10; i++) {
      var seat = {};
      seat["pos"] = i;
      seat["row"] = seatLabels[j];
      loadSeat(seat);
    }
  }
});