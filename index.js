"use strict";
//REGEXP
const checkName = "^[A-Za-z]+ [A-Za-z]+ *$";

////BUTTONS
const buttonConfirm = document.querySelector(".btn__confirm");
const buttonContinue = document.querySelector(".btn__continue");

///FIELDS

const cardHolder = document.getElementById("text");
const cardNumber = document.getElementById("card-num");
const cardMmExp = document.getElementById("mm");
const cardYyExp = document.getElementById("yy");
const cardCVC = document.getElementById("cvc");

///ERRORS
const errName = document.querySelector(".error__name");
const errCard = document.querySelector(".error__card");
const errExp = document.querySelector(".error__exp");
const errCvc = document.querySelector(".error__cvc");

////DISPLAYED CARD
const displayedNumber = document.querySelector(".card-front__number");
const displayedName = document.querySelector(".card-front__name");
const displayedMonth = document.querySelector(".month");
const displayedYear = document.querySelector(".year");
const displayedCvc = document.querySelector(".card-back__key");
////SUCCESS CLASS
const finishMsg = document.querySelector(".success");

////SYNCHRONISING INPUT AND CARD APPEARANCE

cardNumber.addEventListener("keyup", function () {
  displayedNumber.textContent = cardNumber.value;
});
cardHolder.addEventListener("keyup", function () {
  displayedName.textContent = cardHolder.value;
});
cardMmExp.addEventListener("keyup", function () {
  displayedMonth.textContent = cardMmExp.value;
});
cardYyExp.addEventListener("keyup", function () {
  displayedYear.textContent = cardYyExp.value;
});
cardCVC.addEventListener("keyup", function () {
  displayedCvc.textContent = cardCVC.value;
});

///INPUT LOGIC

document.querySelectorAll(".form__input").forEach(function (element) {
  element.addEventListener("keydown", function () {
    if (!errName.value) {
      errName.classList.remove("error__reveal");
    }
    cardHolder.classList.remove("form__input--wrong");
    if (!errCard.value) {
      errCard.classList.remove("error__reveal");
      cardNumber.classList.remove("form__input--wrong");
    }
    if (!errExp.value) {
      errExp.classList.remove("error__reveal");
      cardMmExp.classList.remove("form__input--wrong");
      cardYyExp.classList.remove("form__input--wrong");
    }
    if (!errCvc.value) {
      errCvc.classList.remove("error__reveal");
      cardCVC.classList.remove("form__input--wrong");
    }
  });
});

/// stupid separator for CARD NUMBER

cardNumber.onkeyup = function () {
  if (cardNumber.value.length > 0) {
    if (cardNumber.value.length === 4) cardNumber.value += " ";
    if (cardNumber.value.length === 9) cardNumber.value += " ";
    if (cardNumber.value.length === 14) cardNumber.value += " ";
  }
};

///BUTTON LOGIC

buttonConfirm.addEventListener("click", function (e) {
  e.preventDefault();

  ///Check card holder name field
  if (!cardHolder.value) {
    errName.classList.add("error__reveal");
    errName.textContent = "Please, enter your name.";
    cardHolder.classList.add("form__input--wrong");
  } else if (!cardHolder.value.match(checkName)) {
    errName.classList.add("error__reveal");
    cardHolder.classList.add("form__input--wrong");
    errName.textContent = "Please, provide a valid name.";
  }
  ///check card number field
  if (!cardNumber.value) {
    errCard.classList.add("error__reveal");
    cardNumber.classList.add("form__input--wrong");
    errCard.textContent = "Can't be blanc";
  } else if (!cardNumber.value.match("^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$")) {
    errCard.classList.add("error__reveal");
    errCard.textContent = "Wrong format";
    cardNumber.classList.add("form__input--wrong");
  }

  ///check expirations number field
  if (!cardMmExp.value || !cardYyExp.value) {
    errExp.classList.add("error__reveal");
    errExp.textContent = "Can't be blanc";
    cardMmExp.classList.add("form__input--wrong");
    cardYyExp.classList.add("form__input--wrong");
  } else if (!cardMmExp.value.match("^0[1-9]|1[0-2]$")) {
    errExp.classList.add("error__reveal");
    errExp.textContent = "Wrong date";
    console.log(cardMmExp.value);
    cardMmExp.classList.add("form__input--wrong");
  } else if (!cardYyExp.value.match("^[0-9]{2}$")) {
    errExp.classList.add("error__reveal");
    errExp.textContent = "Wrong date";
    cardYyExp.classList.add("form__input--wrong");
  }

  ///check CVC field

  if (!cardCVC.value) {
    errCvc.classList.add("error__reveal");
    errCvc.textContent = "Can't be blanc";
    cardCVC.classList.add("form__input--wrong");
  } else if (!cardCVC.value.match("^[0-9]{3}$")) {
    errCvc.classList.add("error__reveal");
    errCvc.textContent = "wrong number";
    cardCVC.classList.add("form__input--wrong");
  }

  ///check all fields are filled correct and not empty

  document.querySelectorAll(".form__input").forEach(function (element) {
    if (element.value && !element.classList.contains("form__input--wrong")) {
      document.querySelector(".form").style.display = "none";
      finishMsg.classList.add("reveal");
    }
  });
});
