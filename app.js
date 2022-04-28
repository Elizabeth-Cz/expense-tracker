// Declairing DOM variables
const balance = document.querySelector("#balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const inputDes = document.querySelector("#input-description");
const inputAmount = document.querySelector("#input-amount");
const entriesDiv = document.querySelector(".entries");

const account = {
  incomes: [],
  expenses: [],

  addExpense(description, amount) {
    this.expenses.push({
      description: inputDes.value,
      amount: parseInt(inputAmount.value) || 0,
    });
  },

  addIncome(description, amount) {
    this.incomes.push({
      description: inputDes.value,
      amount: parseInt(inputAmount.value) || 0,
    });
  },

  getAccountSummery() {
    let totalExpenses = 0;
    let totalIncomes = 0;
    let accountBalance = 0;
    this.expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount;
    });
    this.incomes.forEach((income) => {
      totalIncomes = totalIncomes + income.amount;
    });
    accountBalance = totalIncomes - totalExpenses;
    return accountBalance;
  },

  reset() {
    inputDes.value = "";
    inputAmount.value = "";
  },
};

// Render

const renderIncomeEntry = function () {
  //create divs
  const entryDiv = document.createElement("div");
  entryDiv.setAttribute("class", "entry");
  entriesDiv.appendChild(entryDiv);

  //create delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid fa-circle-xmark delete-btn");
  entryDiv.appendChild(deleteIcon);
  
  // delete icon function **NOT REMOVING ENTRY FROM ARRAY YET**
  deleteIcon.addEventListener("click", () => {
    deleteIcon.parentNode.remove();
  });
  //create entry_title
  const entryTitle = document.createElement("h4");
  entryTitle.setAttribute("id", "entry_title");
  entryDiv.appendChild(entryTitle);
  entryTitle.textContent = inputDes.value;

  //create entry_amount
  const entryAmount = document.createElement("h4");
  entryAmount.setAttribute("id", "entry_amount");
  entryAmount.classList.add("income");
  entryDiv.appendChild(entryAmount);
  entryAmount.textContent = inputAmount.value;
};

const renderExpenseEntry = function () {
  //create divs
  const entryDiv = document.createElement("div");
  entryDiv.setAttribute("class", "entry");
  entriesDiv.appendChild(entryDiv);

  //create delete icon
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid fa-circle-xmark delete-btn");
  entryDiv.appendChild(deleteIcon);

  // delete icon function
  deleteIcon.addEventListener("click", () => {
    deleteIcon.parentNode.remove();
  });

  //create entry_title
  const entryTitle = document.createElement("h4");
  entryTitle.setAttribute("id", "entry_title");
  entryDiv.appendChild(entryTitle);
  entryTitle.textContent = inputDes.value;

  //create entry_amount
  const entryAmount = document.createElement("h4");
  entryAmount.setAttribute("id", "entry_amount");
  entryAmount.classList.add("expense");
  entryDiv.appendChild(entryAmount);
  entryAmount.textContent = inputAmount.value;
};

// Event listeners

minusBtn.addEventListener("click", function () {
  if (inputAmount.value > 0 && inputDes.value) {
    account.addExpense();
    renderExpenseEntry();
    account.reset();
    console.log(account.getAccountSummery());
    balance.innerHTML = account.getAccountSummery();
  }
});

plusBtn.addEventListener("click", function () {
  if (inputAmount.value > 0 && inputDes.value) {
    account.addIncome();
    renderIncomeEntry();
    account.reset();
    console.log(account.getAccountSummery());
    balance.innerHTML = account.getAccountSummery();
  }
});
