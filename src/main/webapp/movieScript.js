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

function countSeats(type) {
  if (type === "picking") {
    return $('.pickingSeat').length;
  } else if (type === "reserved") {
    return $('.reservedSeat').length;
  } else {
    return $('.freeSeat').length;
  }
}

function showOperatingText(type) {
  var freeCount = countSeats("free");
  var pickedCount = countSeats("picking");
  var reservedCount = countSeats("reserved");
  if (freeCount < 1) {
    $("#seatsOutputText").text("Sorry, all seats are sold out");
    return;
  }
  if (type === "freeSeat") {
    $("#seatsOutputText").text("This seat is free, you can reserve it");
    return;
  }
  if (type === "pickingSeat") {
    $("#seatsOutputText").text("This is one of your desired seats, you can uncheck it");
    return;
  }
  if (type === "reservedSeat") {
    $("#seatsOutputText").text("This seat is already reserved");
    return;
  }
  if (type === "picked") {
    $("#seatsOutputText").text("You picked this seat and now can buy it!");
    return;
  }
  if (type === "unpicked") {
    $("#seatsOutputText").text("You removed this seat from your desired seats list");
    return;
  }
  if (type === "reserved") {
    $("#seatsOutputText").text("You successfully brought your tikets, enjoy the movie!");
    return;
  }
  $("#seatsOutputText").text("There are " + freeCount + " free seats, "
      + reservedCount + " reserved and " + pickedCount + " picked now");
}

function ticketTextUpdate() {
  var pickedCount = countSeats("picking");
  $("#seatsTicketText").text("One ticket price - 100 rur, tickets picked - " + pickedCount
      + ", PRICE TOTAL - " + (pickedCount * 100) + " rur");
}

$("#loadSeatsBtn").on("click", function() {
  $("#welcomeTitle, #loadSeatsBtn").hide();
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

$(document).on("mouseenter", '.pickingSeat', function () {
  showOperatingText("pickingSeat");
});

$(document).on("mouseenter", '.reservedSeat', function () {
  showOperatingText("reservedSeat");
});

$(document).on("mouseleave", '.seat', function () {
  showOperatingText("free");
});

$(document).on("click", '.freeSeat', function () {
  var seat = $(this).attr('id');
  showOperatingText("picked");
  $("#" + seat).removeClass("freeSeat");
  $("#" + seat).addClass("pickingSeat");
  ticketTextUpdate();
  if (countSeats("picking") < 2) {
    $("#buyTicketArea").show("fast");
  }
});

$(document).on("click", '.pickingSeat', function () {
  var seat = $(this).attr('id');
  showOperatingText("unpicked");
  $("#" + seat).removeClass("pickingSeat");
  $("#" + seat).addClass("freeSeat");
  if (countSeats("picking") < 1) {
    $("#buyTicketArea").hide("fast");
  }
  ticketTextUpdate();
});

//here begins pop-up function copypasted code
$(document).ready(function() {
  $('body').append('<div id="blackout"></div>');
  var boxWidth = 400;

  function centerBox() {
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();
    var disWidth = (winWidth - boxWidth) / 2;
    var disHeight = scrollPos + 150;
    $('.popup-box').css({'width' : boxWidth+'px', 'left' : disWidth+'px', 'top' : disHeight+'px'});
    $('#blackout').css({'width' : winWidth+'px', 'height' : winHeight+'px'});
    return false;
  }

  $(window).resize(centerBox);
  $(window).scroll(centerBox);
  centerBox();

  $('[class*=popup-link]').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = 1;
    var scrollPos = $(window).scrollTop();
    $('#popup-box-'+id).show();
    $('#blackout').show();
    $('html, body').css('overflow', 'hidden');
    $('html').scrollTop(scrollPos);

    //buy ticket logic is here
    showOperatingText("reserved");
    var pickingCount = countSeats("picking");
    var seats = "";
    $(".ticketSeatsCount").text(pickingCount);
    $(".ticketPrice").text((pickingCount * 100) + " rur");
    $('.pickingSeat').each(function() {
      var seatId = this.id;
      seats = seats + seatId.substr(4, seatId.length) + ", ";
    });
    seats = seats.substr(0, (seats.length - 2));
    $(".ticketSeats").text(seats);
    $(".pickingSeat").addClass("reservedSeat");
    $(".pickingSeat").removeClass("pickingSeat");
    ticketTextUpdate();
    $("#buyTicketArea").hide("fast");
    //end of buy ticket logic
  });

  $('[class*=popup-box]').click(function(e) {
    e.stopPropagation();
  });

  $('html').click(function() {
    var scrollPos = $(window).scrollTop();
    $('[id^=popup-box-]').hide();
    $('#blackout').hide();
    $("html,body").css("overflow","auto");
    $('html').scrollTop(scrollPos);
  });

  $('.close').click(function() {
    var scrollPos = $(window).scrollTop();
    $('[id^=popup-box-]').hide();
    $('#blackout').hide();
    $("html, body").css("overflow","auto");
    $('html').scrollTop(scrollPos);
  });
});
//pop-up copypaste ends here