// JavaScript for the Mercedes-Benz Electric website

// ----- Feedback form -----
// When the user clicks submit, check the fields and show a thank you message.
var form = document.getElementById("feedbackForm");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    var name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var model = document.getElementById("modelInterest").value;
    var message = document.getElementById("message").value;

    if (name == "" || email == "" || phone == "" || model == "" || message == "") {
      alert("Please fill in all the fields.");
      return;
    }

    if (email.indexOf("@") == -1) {
      alert("Please enter a valid email address.");
      return;
    }

    // hide the form and show the thank you message
    form.style.display = "none";
    document.getElementById("thankYou").style.display = "block";
  });
}

// ----- Model detail page -----
// The links on the models page look like: model-detail.html?model=night
// We read the "model" part from the address and change the picture and text.
var modelImage = document.getElementById("modelImage");

if (modelImage) {
  var params = new URLSearchParams(window.location.search);
  var model = params.get("model");

  var modelName = document.getElementById("modelName");
  var modelText = document.getElementById("modelText");

  if (model == "night") {
    modelName.innerText = "EQV Night Edition";
    modelImage.src = "assets/images/cars/eqv-black-side.jpg";
    modelText.innerText = "A black EQV with a dark, elegant look. Great for business trips.";
  } else if (model == "rear") {
    modelName.innerText = "EQV Signature Rear";
    modelImage.src = "assets/images/cars/eqv-red-rear.jpg";
    modelText.innerText = "This EQV has a nice rear design with red tail lights.";
  } else if (model == "long-range") {
    modelName.innerText = "EQV Long Range";
    modelImage.src = "assets/images/cars/eqv-original.png";
    modelText.innerText = "Made for long trips. It has a bigger battery so you can drive further.";
  } else if (model == "cabin") {
    modelName.innerText = "EQV Luxury Cabin";
    modelImage.src = "assets/images/cars/eqv-original-1.png";
    modelText.innerText = "The inside of this EQV is very comfortable with lots of space.";
  } else {
    // if there is no model in the address, show the default one
    modelName.innerText = "EQV 300 Executive";
    modelImage.src = "assets/images/cars/eqv-white.jpg";
    modelText.innerText = "A white electric van for business and family travel.";
  }
}
