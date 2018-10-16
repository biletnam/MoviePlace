function loadSeat(seat) {
  $.get("movieSeat.html", function(value) {
    var template = $.templates(value);
    var html = template.render(seat);
    $("#seatBoxArea").append(html);
  });
}

$("#loadSeatsBtn").on("click", function() {
  $("#welcomeTitle, #loadSeatsBtn").hide("fast");
  $("#seatsArea").show("fast");
  for (var i = 0; i < 10; i++) {
    var seat = {};
    seat["place"] = "A" + i;
    loadSeat(seat);
  }
});