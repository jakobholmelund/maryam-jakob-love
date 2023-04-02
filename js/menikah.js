// Get that hamburger menu cookin' //

document.addEventListener("DOMContentLoaded", function() {
  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener("click", function() {
        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);
        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

// Smooth Anchor Scrolling
$(document).on("click", 'a[href^="#"]', function(event) {
  event.preventDefault();
  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top
    },
    500
  );
});

// When the user scrolls down 20px from the top of the document, show the scroll up button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //document.getElementById("toTop").style.display = "block";
  } else {
    //document.getElementById("toTop").style.display = "none";
  }
}

// Preloader
$(document).ready(function($) {
  $(".preloader-wrapper").fadeOut();
  $("body").removeClass("preloader-site");

  $("#submitRSVPForm").on("click", function () {
    const formData = $("#myForm").serializeArray();
    const invite_code = $("#invite_code").val();
    const NameRSVP = $("#NameRSVP").val();
    const Email = $("#Email").val();
    const Phone = $("#Phone").val();
    const Comming = $('input[name="Comming"]:checked').val();
    const NameList = $("#NameList").val();
    const Camping = $("#Camping").val();

    // Perform input validation if necessary

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbzwXACFxVzb0vIJlpkkc6eU4AnNrr5E4Ikrrtvf-KNSCrWhYJk-f2CO6Y0WlT38NTRz/exec",
      method: "POST",
      data: {
        invite_code: invite_code,
        NameRSVP: NameRSVP,
        Email: Email,
        Phone: Phone,
        Comming: Comming,
        NameList: NameList,
        Camping: Camping,
      },
      success: function (response) {
        const feedbackElement = $("#feedback");
        feedbackElement.removeClass("is-hidden");

        if (response.result === 'success') {
          console.log("Form submitted successfully");
          feedbackElement.addClass("is-success");
          feedbackElement.text("Form submitted successfully"); // Or use response.message if it's available in the success response
        } else {
          console.error("Error submitting form");
          feedbackElement.addClass("is-danger");
          feedbackElement.text(response.message);
        }

        setTimeout(function () {
          feedbackElement.addClass("is-hidden");
        }, 5000);
      },
      error: function (error) {
        console.error("Error submitting form", error);
        const feedbackElement = $("#feedback");
        feedbackElement.removeClass("is-hidden");
      
        // Customize the feedback element appearance based on the API response
        feedbackElement.addClass("is-danger"); // Add a class for error feedback
        const errorMessage = error.responseJSON && error.responseJSON.message
          ? error.responseJSON.message
          : "An error occurred. Please try again.";
        feedbackElement.text(errorMessage); // Update the feedback text with the message from the API or a default error message
      
        // Optionally, hide the feedback element after a certain time
        setTimeout(function () {
          feedbackElement.addClass("is-hidden");
        }, 5000);
      },
    });
  });
});
$(window).on("load", function() {
  setTimeout(function() {
    $(".preloader-wrapper").fadeOut();
    $("body").removeClass("preloader-site");
  }, 100); // You can adjust the timeout value as needed
});
