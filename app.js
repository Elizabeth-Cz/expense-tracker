// Declairing DOM variables
const balance = document.querySelector("#balance");
const minusBtn = document.querySelector("#minus-btn");
const plusBtn = document.querySelector("#plus-btn");
const inputDes = document.querySelector("#input-description");
const inputAmount = document.querySelector("#input-amount");

const account = {
  incomes: [],
  expenses: [],

  addExpense(description, amount) {
    this.expenses.push({
      description: parseInt(inputDes.value),
      amount: parseInt(inputAmount.value),
    });
  },

  addIncome(description, amount) {
    this.incomes.push({
      description: parseInt(inputDes.value),
      amount: parseInt(inputAmount.value),
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

minusBtn.addEventListener("click", function () {
  account.addExpense();
  account.reset();
  console.log(account.getAccountSummery());
  balance.innerHTML = account.getAccountSummery();
});

plusBtn.addEventListener("click", function () {
  account.addIncome();
  account.reset();
  console.log(account.getAccountSummery());
  balance.innerHTML = account.getAccountSummery();
});
