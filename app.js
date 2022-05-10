const account = [];
const balance = document.querySelector("#balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const inputDes = document.querySelector("#input-description");
const inputAmount = document.querySelector("#input-amount");
const entriesDiv = document.querySelector(".entries");

// ADD ENTRY DATE
// const d = new Date();
// const month = d.getMonth() + 1;
// const day = d.getDate();
// console.log(month);
// console.log(day);
// const timeStamp = `${day}.${month}`;
// console.log(timeStamp);

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

  //create entry amount
  const entryAmount = document.createElement("h4");
  entryAmount.setAttribute("id", "entry_amount");
  entryAmount.textContent = inputAmount.value;
  if (v) {
    entryAmount.setAttribute("class", "income");
  } else {
    entryAmount.setAttribute("class", "expense");
  }
  entryDiv.append(deleteIcon, entryTitle, entryAmount);
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
