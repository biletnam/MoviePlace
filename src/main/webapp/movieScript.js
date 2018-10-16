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

function countFreeSeats() {
  return $('.freeSeat').length;
}

function showOperatingText(type) {
  var freeCount = countFreeSeats();
  if (type === "free") {
    if (freeCount < 1) {
      $("#seatsOutputText").text("Sorry, all seats are sold out!");
    } else {
      $("#seatsOutputText").text("There is " + freeCount
          + " free sits in the theater, you can pick any!");
    }
  } else if (type === "freeSeat") {
    $("#seatsOutputText").text("This seat is free, you can reserve it!");
  }
  //alert("free seats count - " + freeCount);
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

$(document).on("mouseenter", '.freeSeat', function () {
  showOperatingText("free");
});

$(document).on("mouseleave", '.freeSeat', function () {
  showOperatingText("free");
});