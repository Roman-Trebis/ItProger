function slowScroll(id) {
  $("html, body").animate({
    scrollTop: $(id).offset().top - 50
  }, 500);
  return false;
}

$(".header-top .menu").on("click", function() {
  if($("header .mobile-menu").is(":visible"))
    $(this).html('<i class="fas fa-bars"></i>');
  else
    $(this).html('<i class="fas fa-times"></i>');

  $("header .mobile-menu").slideToggle();
});

$("#subscribe").on("click", function() {
  let email = $("#email").val();
  email = email.trim();
  if(email.split("@").length != 2 || email.split(".").length != 2) {
    $("#sub_form label").text("Вы ввели неверный email");
    $("#sub_form label").fadeIn();
  }

  setTimeout(function() {
    $("#sub_form label").fadeOut();
  }, 1500);
});

$('.video-play, #modal-video .close-button').on('click', function() {
  var $modal = $("#modal-video");
  var $iframe = $modal.find("iframe");

  if ($modal.is(":visible")) {
    var src = $iframe.attr("src");
    $iframe.attr("src", "");
    $iframe.attr("src", src);
  }

  $modal.toggle();
  $("body").toggleClass("overflow-hidden");
  resizeVideo();
});

$(document).on("keydown", function(e) {
  if (e.key === "Escape" && $("#modal-video").is(":visible")) {
    $("#modal-video .close-button").trigger("click");
  }
});

$(window).on('resize', function() {
  resizeVideo();
}).resize();

function resizeVideo() {
  $("iframe").each(function() {
    let width = $(this).width();
    $(this).css("height", width / 1.77 + "px");
  });
}
