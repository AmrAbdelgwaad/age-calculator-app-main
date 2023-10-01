const form = document.querySelector("form");
const labels = document.querySelectorAll("label");

const dayError = document.getElementById("day-error");
const monthError = document.getElementById("month-error");
const yearError = document.getElementById("year-error");

const inputs = document.querySelectorAll("input");
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const outputYear = document.querySelector(".year");
const outputMonth = document.querySelector(".month");
const outputDay = document.querySelector(".day");

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

    labels.forEach((label) => {
      label.style.color = "hsl(0, 100%, 67%)";
    });

    inputs.forEach((input) => {
      input.style.borderColor = "hsl(0, 100%, 67%)";
    });

    outputYear.innerText = "- -";
    outputMonth.innerText = "- -";
    outputDay.innerText = "- -";
  } else {
    outputYear.innerText = currentYear - birthYear;
    outputMonth.innerText = currentMonth - birthMonth;
    outputDay.innerText = currentDay - birthDay;

    dayError.textContent = "";
    monthError.textContent = "";
    yearError.textContent = "";

    labels.forEach((label) => {
      label.style.color = null;
    });

    inputs.forEach((input) => {
      input.style.borderColor = null;
    });
  }

  function showError() {
    if (dayInput.validity.valueMissing) {
      dayError.textContent = "This field is required";
    } else if (birthDay > 31 || birthDay <= 0) {
      dayError.textContent = "Must be a valid day";
    }

    if (monthInput.validity.valueMissing) {
      monthError.textContent = "This field is required";
    } else if (birthMonth > 12 || birthMonth <= 0) {
      monthError.textContent = "Must be a valid month";
    }
    if (yearInput.validity.valueMissing) {
      yearError.textContent = "This field is required";
    } else if (birthYear > currentYear) {
      yearError.textContent = "Must be in the past";
    } else if (birthYear <= 0) {
      yearError.textContent = "Must be a valid year";
    }
  }
});
