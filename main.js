const form = document.querySelector("form");

const dayError = document.querySelector(".day-error");
const monthError = document.querySelector(".month-error");
const yearError = document.querySelector(".year-error");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

let date = new Date();
let currentDay = date.getDate();
let currentMonth = 1 + date.getMonth();
let currentYear = date.getFullYear();
let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let birthDay = document.getElementById("day").value;
  let birthMonth = document.getElementById("month").value;
  let birthYear = document.getElementById("year").value;

  if (birthDay > currentDay) {
    currentDay = currentDay + daysInMonths[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }
  if (birthMonth > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  if (
    !dayInput.validity.valid ||
    !monthInput.validity.valid ||
    !yearInput.validity.valid
  ) {
    showError();

    event.preventDefault();

    document.querySelector(".year").innerText = "--";
    document.querySelector(".month").innerText = "--";
    document.querySelector(".day").innerText = "--";
  } else {
    document.querySelector(".year").innerText = currentYear - birthYear;
    document.querySelector(".month").innerText = currentMonth - birthMonth;
    document.querySelector(".day").innerText = currentDay - birthDay;
    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";
  }

  function showError() {
    if (dayInput.validity.valueMissing) {
      dayError.textContent = "This field is required";
    } else if (birthDay > daysInMonths[birthMonth - 1] || birthDay < 0) {
      dayError.textContent = "Must be a valid day";
    } else if (dayInput.validity.patternMismatch) {
      dayError.textContent = "The value should be a number";
    }

    if (monthInput.validity.valueMissing) {
      monthError.textContent = "This field is required";
    } else if (birthMonth > 12 || birthMonth < 0) {
      monthError.textContent = "Must be a valid month";
    } else if (monthInput.validity.patternMismatch) {
      monthError.textContent = "The value should be a number";
    }

    if (yearInput.validity.valueMissing) {
      yearError.textContent = "This field is required";
    } else if (birthYear > currentYear) {
      yearError.textContent = "Must be in the past";
    } else if (birthYear < 0) {
      yearError.textContent = "Must be a valid year";
    } else if (yearInput.validity.patternMismatch) {
      yearError.textContent = "You should enter four digits";
    }
  }
});
