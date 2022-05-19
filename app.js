let account = [];
let incomes = [];
// let expenses = [];
const expenses = [
  // { title: "rent", amount: 950 },
  // { title: "car wash", amount: 30 },
  // {
  //   title: "nails",
  //   amount: 20,
  // },
];
// const expensesTitles = expenses.map((x) => x.title);
// const expensesAmounts = expenses.map((x) => x.amount);
// const expensesData = [expensesTitles, expensesAmounts];
// console.log(expensesData);
let sumIncomes = 0;
let sumExpenses = 0;
// console.log(Object.values(expenses));
const yValues = [sumIncomes, sumExpenses];
const barColors = ["#adc698", "#c05746"];
// const xValues = ["Incomes", "Expenses"];

const balance = document.querySelector("#balance");
// const balanceContainer = document.querySelector(".container_balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const titleInput = document.getElementById("input-description");
const amountInput = document.getElementById("input-amount");
const entriesDiv = document.querySelector(".entries");
const incomesEl = document.getElementById("money-plus");
const expensesEl = document.getElementById("money-minus");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

function getTime() {
  const d = new Date();
  let month = d.getMonth() + 1;
  switch (month) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
  }
  const day = d.getDate();
  const timeStamp = `${month} ${day}`;
  return timeStamp;
}

const sumAccount = function () {
  if (incomes.length > 0) {
    sumIncomes = incomes.reduce((a, b) => a + b);
  } else if (incomes.length === 0) {
    sumIncomes = 0;
  }
  if (expenses.length > 0) {
    sumExpenses = expenses.reduce((sum, current) => {
      return sum + current.amount;
    }, 0);
  } else if (expenses.length === 0) {
    sumExpenses = 0;
  }
  let accountBalance = sumIncomes - sumExpenses;

  balance.innerHTML = accountBalance;
  // applying styling according to balance
  if (accountBalance > 0) {
    balance.style.backgroundColor = "#adc698";
    balance.style.color = "#f6f4f4";
  } else if (accountBalance < 0) {
    balance.style.backgroundColor = "#c05746";
    balance.style.color = "#f6f4f4";
  } else {
    balance.style.backgroundColor = "#f6f4f4";
    balance.style.color = "gray";
    balance.innerHTML = "0";
  }
  console.log(`incomes:${sumIncomes}`);
  console.log(`expenses: ${sumExpenses}`);
  console.log(accountBalance);
  incomesEl.innerHTML = sumIncomes;
  expensesEl.innerHTML = sumExpenses;
  drawChart();
};

const renderEntry = function (v) {
  //create entry div
  const entryDiv = document.createElement("div");
  entriesDiv.appendChild(entryDiv);

  //create delete icon
  const deleteIcon = document.createElement("i");

  //create entry title
  const entryTitle = document.createElement("p");
  entryTitle.setAttribute("class", "entry_title");
  entryTitle.textContent = titleInput.value;

  //create info div with amount and date
  const entryInfo = document.createElement("div");

  //create entry amount
  const entryAmount = document.createElement("p");
  entryAmount.textContent = amountInput.value;
  if (v) {
    entryDiv.setAttribute("class", "entry entry--income");
    entryAmount.setAttribute("class", "income entry_amount");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-circle-xmark income-delete btn-delete"
    );
  } else {
    entryDiv.setAttribute("class", "entry entry--expense");
    entryAmount.setAttribute("class", "expense entry_amount");
    deleteIcon.setAttribute(
      "class",
      "fa-solid fa-circle-xmark expense-delete btn-delete"
    );
  }
  const entryDate = document.createElement("p");
  entryDate.setAttribute("class", "entry_date");
  entryDate.textContent = getTime();

  entryInfo.append(entryAmount, entryDate);
  entryDiv.append(entryTitle, entryInfo, deleteIcon);
  titleInput.value = "";
  amountInput.value = "";
};

plusBtn.addEventListener("click", () => {
  if (amountInput.value) {
    incomes.push(parseInt(amountInput.value));
    renderEntry(1);
    sumAccount();
    console.log(incomes);
  }
});

minusBtn.addEventListener("click", () => {
  if (amountInput.value) {
    // let isTitleEqual = (element) => titleInput.value === element.title;
    // const i = expenses.findIndex(isTitleEqual);
    // console.log(i);
    // if (i >= 0) {
    //   expenses[i].amount += parseInt(amountInput.value);
    // }
    expenses.push({
      title: titleInput.value,
      amount: parseInt(amountInput.value),
    });

    renderEntry(0);
    sumAccount();
  }
  console.log(expenses);
});

const delBtn = document.addEventListener("click", function (e) {
  if (e.target.classList.contains("income-delete")) {
    const iconList = Array.from(document.querySelectorAll(".income-delete"));
    iconIndex = iconList.indexOf(e.target);
    incomes.splice(iconIndex, 1);
    e.target.parentElement.remove();
    sumAccount();
  } else if (e.target.classList.contains("expense-delete")) {
    const iconList = Array.from(document.querySelectorAll(".expense-delete"));
    iconIndex = iconList.indexOf(e.target);
    expenses.splice(iconIndex, 1);
    console.log(iconIndex);
    e.target.parentElement.remove();
    sumAccount();
  }
});

var coll = document.querySelector(".collapsible");

coll.addEventListener("click", function () {
  this.classList.toggle("active");
  const footer = this.previousElementSibling;
  if (footer.style.display === "flex") {
    footer.style.display = "none";
  } else {
    footer.style.display = "flex";
  }
});

// drawChart();
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["expense", "amount"],
    ["incomes", sumIncomes],
    ["expenses", sumExpenses],
  ]);

  var options = {
    backgroundColor: "none",
    // is3D: true,
    slices: {
      0: { color: barColors[0] },
      1: { color: barColors[1] },
    },
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("myChart")
  );

  chart.draw(data, options);
}
