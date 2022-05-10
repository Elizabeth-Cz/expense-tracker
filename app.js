const account = [];
const balance = document.querySelector("#balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const inputDes = document.querySelector("#input-description");
const inputAmount = document.querySelector("#input-amount");
const entriesDiv = document.querySelector(".entries");
// const addEntryToggle = document.querySelector(".fa-caret-up");
// const footer = document.querySelector(".footer-collapsed");

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
  // const hour = d.getHours();
  // let minute = d.getMinutes();
  // if (minute < 10) {
  //   minute = `0${minute}`;
  // }
  const timeStamp = `${month} ${day}`;
  return timeStamp;
}

const sumAccount = function () {
  if (account.length === 0) {
    balance.innerHTML = "0";
  }
  let accountBalance = 0;
  account.forEach((item) => {
    accountBalance = accountBalance + item.amount;
    // console.log(accountBalance);
    if (accountBalance >= 0) {
      balance.style.color = "#386641";
    } else if (accountBalance < 0) {
      balance.style.color = "#86090b";
    }
    balance.innerHTML = accountBalance;
  });
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

  // create entry date
  // const d = new Date();
  // const month = d.getMonth() + 1;
  // const day = d.getDate();
  // const timeStamp = `${day}.${month}`;

  const entryDate = document.createElement("h3");
  entryDate.setAttribute("class", "entry_date");
  entryDate.textContent = getTime();

  entryInfo.append(entryAmount, entryDate);
  entryDiv.append(deleteIcon, entryTitle, entryInfo);
};

plusBtn.addEventListener("click", () => {
  if (inputAmount.value) {
    account.push({
      description: inputDes.value,
      amount: parseInt(inputAmount.value),
    });
    sumAccount();
    renderEntry(1);
  }
  inputDes.value = "";
  inputAmount.value = "";
  console.log(account);
});

minusBtn.addEventListener("click", () => {
  if (inputAmount.value) {
    account.push({
      description: inputDes.value,
      amount: parseInt(-inputAmount.value),
    });
    sumAccount();
    renderEntry(0);
  }
  inputDes.value = "";
  inputAmount.value = "";
  console.log(account);
});

const delBtn = document.addEventListener("click", function (e) {
  if (e.target.classList.contains("x")) {
    const iconList = Array.from(document.querySelectorAll(".x"));
    iconIndex = iconList.indexOf(e.target);

    // the amount to deduct from sum
    console.log(account[iconIndex].amount);
    account.splice(iconIndex, 1);
    console.log(iconIndex);
    e.target.parentElement.remove();
    sumAccount();
  }
});

// addEntryToggle.addEventListener("click", () => {
//   footer.classList.toggle("footer");
// });
