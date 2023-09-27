
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let birthDay = document.getElementById("day").value;
  let birthMonth = document.getElementById("month").value;
  let birthYear = document.getElementById("year").value;

  let date = new Date();
  let currentDay = date.getDate();
  let currentMonth = 1 + date.getMonth();
  let currentYear = date.getFullYear();
  let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (birthDay > currentDay) {
    currentDay = currentDay + daysInMonths[currentMonth - 1];
    currentMonth = currentMonth - 1;
  }
  if(birthMonth > currentMonth){
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  document.querySelector(".year").innerText = currentYear - birthYear;
  document.querySelector(".month").innerText = currentMonth - birthMonth;
  document.querySelector(".day").innerText = currentDay - birthDay;
});
