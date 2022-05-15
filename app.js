let account = [];
let incomes = 0;
let expenses = 0;
const yValues = [incomes, expenses];
const barColors = ["#adc698", "#c05746"];
// const xValues = ["Incomes", "Expenses"];

const balance = document.querySelector("#balance");
const balanceContainer = document.querySelector(".container_balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const inputDes = document.querySelector("#input-description");
const inputAmount = document.querySelector("#input-amount");
const entriesDiv = document.querySelector(".entries");

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

const sumAccount = function (incomes, expenses) {
  let accountBalance = 0;
  if (account.length > 0) {
    accountBalance = account.reduce((a, b) => a + b);
  } else if (account.length === 0) {
    balance.innerHTML = "0";
  }
  balance.innerHTML = accountBalance;
  // applying styling according to balance
  if (accountBalance > 0) {
    balanceContainer.style.backgroundColor = "#adc698";
    balance.style.color = "#f6f4f4";
  } else if (accountBalance < 0) {
    balanceContainer.style.backgroundColor = "#c05746";
    balance.style.color = "#f6f4f4";
  } else {
    balanceContainer.style.backgroundColor = "#f6f4f4";
    balance.style.color = "gray";
    balance.innerHTML = "0";
  }
};

const renderEntry = function (v) {
  //create entry div
  const entryDiv = document.createElement("div");
  entryDiv.setAttribute("class", "entry");
  entriesDiv.appendChild(entryDiv);

  //create delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid fa-circle-xmark x");

  //create entry title
  const entryTitle = document.createElement("h4");
  entryTitle.setAttribute("id", "entry_title");
  entryTitle.textContent = inputDes.value;

  //create info div with amount and date
  const entryInfo = document.createElement("div");

  //create entry amount
  const entryAmount = document.createElement("h4");
  entryAmount.setAttribute("id", "entry_amount");
  entryAmount.textContent = inputAmount.value;
  if (v) {
    entryAmount.setAttribute("class", "income");
  } else {
    entryAmount.setAttribute("class", "expense");
  }

  const entryDate = document.createElement("h3");
  entryDate.setAttribute("class", "entry_date");
  entryDate.textContent = getTime();

  entryInfo.append(entryAmount, entryDate);
  entryDiv.append(deleteIcon, entryTitle, entryInfo);
};

plusBtn.addEventListener("click", () => {
  if (inputAmount.value) {
    account.push(parseInt(inputAmount.value));
    incomes += parseInt(inputAmount.value);
    renderEntry(1);
    sumAccount();
  }
  inputDes.value = "";
  inputAmount.value = "";

  console.log(incomes);
  yValues[0] = incomes;
  console.log(yValues);
  drawChart();
});

minusBtn.addEventListener("click", () => {
  if (inputAmount.value) {
    account.push(parseInt(-inputAmount.value));
    expenses += parseInt(inputAmount.value);
    renderEntry(0);
    sumAccount();
  }
  inputDes.value = "";
  inputAmount.value = "";

  console.log(expenses);
  yValues[1] = expenses;
  console.log(yValues);
  drawChart();
});

const delBtn = document.addEventListener("click", function (e) {
  if (e.target.classList.contains("x")) {
    const iconList = Array.from(document.querySelectorAll(".x"));
    iconIndex = iconList.indexOf(e.target);

    // the amount to deduct from sum
    // console.log(account[iconIndex].amount);
    account.splice(iconIndex, 1);
    console.log(iconIndex);
    e.target.parentElement.remove();
    sumAccount();
    console.log(yValues);
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

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["transaction", "amount"],
    ["incomes", incomes],
    ["expenses", expenses],
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

// function addData(chart, label, data) {
//   chart.data.labels.push(label);
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.push(data);
//   });
//   chart.update();
// }

// function removeData(chart) {
//   chart.data.labels.pop();
//   chart.data.datasets.forEach((dataset) => {
//     dataset.data.pop();
//   });
//   chart.update();
// }
