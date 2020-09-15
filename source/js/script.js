/* Меню */
var navToggle = document.querySelector(".page-header__nav-toggle");
var mainNav = document.querySelector(".page-header__main-nav");
var x = true;

navToggle.classList.remove("page-header__nav-toggle--nojs");
navToggle.disabled = false;
mainNav.classList.remove("page-header__main-nav--nojs");

navToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (x) {
    mainNav.classList.add("page-header__main-nav--opened");
    navToggle.classList.add("page-header__nav-toggle--close");
    navToggle.focus();
    x = false;
  } else {
    mainNav.classList.remove("page-header__main-nav--opened");
    navToggle.classList.remove("page-header__nav-toggle--close");
    navToggle.focus();
    x = true;
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mainNav.classList.contains("page-header__main-nav--opened")) {
      evt.preventDefault();
      mainNav.classList.remove("page-header__main-nav--opened");
      navToggle.classList.remove("page-header__nav-toggle--close");
      navToggle.focus();
      x = true;
    }
  }
});

/* Карта */
var mapPicture = document.querySelector(".contacts__map-picture");
var map;
var marker;
var icon;

mapPicture.classList.remove("contacts__map-picture--nojs");

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.9387, lng: 30.323},
    zoom: 14.25,
    disableDefaultUI:true
  });

  icon = {
      // scaledSize: new google.maps.Size(50, 50),
      // origin: new google.maps.Point(0, 0),
      // anchor: new google.maps.Point(25, 50),
      url: "../img/map-pin.png"
  };

  marker = new google.maps.Marker({
    position: { lat: 59.93838, lng: 30.3231},
    map: map,
    icon: icon
  });
}
//
// function myFunction(x) {
//     if (x.matches) { // If media query matches
//         document.body.style.backgroundColor = "yellow";
//     } else {
//         document.body.style.backgroundColor = "pink";
//     }
// }
//
// var x = window.matchMedia("(max-width: 768px)");
// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes


/* Проверка формы
если есть */
var contactForm = document.querySelector(".form");
if (contactForm !== null) {
  var catName = contactForm.querySelector(".form__input-field--name");
  var catWeight = contactForm.querySelector(".form__input-field--weight");
  var userEmail = contactForm.querySelector(".form__input-field--email");
  var userPhone = contactForm.querySelector(".form__input-field--phone");
  var submitButton = contactForm.querySelector(".form__submit-button");

  catName.required = false;
  catWeight.required = false;
  userEmail.required = false;
  userPhone.required = false;

  submitButton.addEventListener("click", function () {
    catName.required = true;
    catWeight.required = true;
    userEmail.required = true;
    userPhone.required = true;
  });
}

/* Виджет "Живой пример"
для мобильной версии
если есть */
var exampleWidget = document.querySelector(".example__widget");
if (exampleWidget !== null) {
  var pictureBefore = exampleWidget.querySelector(".example__picture-wrapper--before");
  var pictureAfter = exampleWidget.querySelector(".example__picture-wrapper--after");
  var buttonBefore = exampleWidget.querySelector("#example-before");
  var buttonAfter = exampleWidget.querySelector("#example-after");
  var rangeControl = exampleWidget.querySelector(".example__range-control");


  buttonBefore.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonBefore.checked = true;
    buttonAfter.checked = false;
    pictureBefore.classList.add("example__picture-wrapper--active");
    pictureAfter.classList.remove("example__picture-wrapper--active");
    rangeControl.classList.add("example__range-control--before");
    rangeControl.classList.remove("example__range-control--after");
  });

  buttonAfter.addEventListener("click", function (evt) {
    evt.preventDefault();
    buttonBefore.checked = false;
    buttonAfter.checked = true;
    pictureBefore.classList.remove("example__picture-wrapper--active");
    pictureAfter.classList.add("example__picture-wrapper--active");
    rangeControl.classList.add("example__range-control--after");
    rangeControl.classList.remove("example__range-control--before");
  });
}
