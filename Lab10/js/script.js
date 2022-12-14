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

      if(day > 0 && day < 6) {
        return true;
      }

      return false;
    }

    return this.#countDays(isWorkingDay);
  }

  getWeekendsCount() {
    function isWeekend(date) {
      let day = date.getDay();

      if(day == 0 || day == 6) {
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

    while(currentDate <= this.firingDate) {
      if(condition(currentDate)) {
        count++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  }
}

const addButton = document.getElementById('add-btn');
const searchButton = document.getElementById('search-btn');

addButton.addEventListener('click', () => add());
searchButton.addEventListener('click', () => find());

function add() {
  const surname = document.getElementById('add-surname').value.trim();
  
  if (localStorage.getItem(surname) != null) {
    alert("There is employee with such surname.");

    return;
  }

  const hiringDate = new Date(document.getElementById('add-hiring-date').value);
  const firingDate = new Date(document.getElementById('add-firing-date').value);
  
  if (!isDateValid(hiringDate, firingDate)) {
    alert("Hiring date can't be less than firing date.");
    
    return;
  }
  
  const tax = parseInt(document.getElementById('add-tax').value);
  localStorage.setItem(surname, JSON.stringify(
      new Employee(surname, tax, new Date(hiringDate), new Date(firingDate))
  ));

  alert("Employee was added successfully!");
}

function isDateValid(hiringDate, firingDate) {
  return hiringDate.getTime() < firingDate.getTime();
}

function find() {
  const surname = document.getElementById('employee-id').value.trim();
  let data = localStorage.getItem(surname);

  if(data != null) {
    let obj = JSON.parse(data);
    displayEmployee(new Employee(obj.surname, obj.tax, new Date(obj.hiringDate), new Date(obj.firingDate)));

    return;
  }

  alert('There is no employee with such surname.');
}

function displayEmployee(employee) {
  document.getElementById('surname').value = employee.surname;
  document.getElementById('tax').value = employee.tax;
  document.getElementById('hiring-date').value = employee.hiringDate.toDateString();
  document.getElementById('firing-date').value = employee.firingDate.toDateString();
  document.getElementById('income').value = employee.getIncome();
  document.getElementById('work-days').value = employee.getWorkingDays();
  document.getElementById('weekends').value = employee.getWeekendsCount();
}
