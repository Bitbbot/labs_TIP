"use strict";

class Employee {
  constructor(surname, tax, hiringDate, firingDate) {
    this.surname = surname;
    this.tax = tax;
    this.hiringDate = hiringDate;
    this.firingDate = firingDate;
  }

  getWorkingDays() {
    function isWorkingDay(date) {
      let day = date.getDay();

      if (day > 0 && day < 6) {
        return true;
      }

      return false;
    }

    return this.#countDays(isWorkingDay);
  }

  getWeekendsCount() {
    function isWeekend(date) {
      let day = date.getDay();

      if (day == 0 || day == 6) {
        return true;
      }

      return false;
    }

    return this.#countDays(isWeekend);
  }

  getIncome() {
    return this.getWorkingDays() * this.tax * 8;
  }

  #countDays(condition) {
    let currentDate = new Date(this.hiringDate);
    let count = 0;

    while (currentDate <= this.firingDate) {
      if (condition(currentDate)) {
        count++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  }
}

const searchButton = document.getElementById("search-btn");

let employees = [
  new Employee("Ostrovsky", 20, new Date(2020, 4, 25), new Date(2021, 1, 30)),
  new Employee("Musk", 15, new Date(2021, 11, 25), new Date(2021, 12, 1)),
  new Employee("Belousov", 12, new Date(2021, 10, 23), new Date(2022, 11, 30)),
  new Employee("Petrovich", 14, new Date(2021, 4, 25), new Date(2022, 11, 30)),
  new Employee("Navalny", 17, new Date(2020, 4, 25), new Date(2022, 1, 30)),
  new Employee("Pingvin", 24, new Date(2020, 4, 25), new Date(2022, 5, 30)),
  new Employee("George", 13, new Date(2020, 4, 25), new Date(2021, 5, 1)),
];

searchButton.addEventListener("click", () => find());

function find() {
  let employeeId = parseInt(document.getElementById("employee-id").value);
  let employee = employees.find((item, id) => id === employeeId);

  if (typeof employee == "undefined") {
    alert("There is no employee with such id.");

    return;
  }

  displayEmployee(employee);
}

function displayEmployee(employee) {
  document.getElementById("surname").value = employee.surname;
  document.getElementById("tax").value = employee.tax;
  document.getElementById("hiring-date").value =
    employee.hiringDate.toDateString();
  document.getElementById("firing-date").value =
    employee.firingDate.toDateString();
  document.getElementById("income").value = employee.getIncome();
  document.getElementById("work-days").value = employee.getWorkingDays();
  document.getElementById("weekends").value = employee.getWeekendsCount();
}
