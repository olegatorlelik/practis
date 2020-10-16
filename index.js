const generatId = () => {
  return `${Math.round(Math.random() * 1e8).toString(16)}`;
};

const totalBalance = document.querySelector(".total__balance");
const totalMoneyIncome = document.querySelector(".total__money-income");
const totalMoneyExpenses = document.querySelector(".total__money-expenses");
const historyList = document.querySelector(".history__list");
const form = document.querySelector("#form");
const operationName = document.querySelector(".operation__name");
const operationAmount = document.querySelector(".operation__amount");

let dbOperation = [];

const renderOperation = (operation) => {
  const clssName =
    operation.amount < 0 ? "history__item-minus" : "history__item-plus";

  const listItem = document.createElement("li");
  listItem.classList.add("history__item");
  listItem.classList.add(clssName);
  listItem.innerHTML = `${operation.discription}<span class="history__money">${operation.amount} ₽</span>
  <button class="history_delete" data-id = "${operation.id}">x</button>`;
  return historyList.append(listItem);
};

const updateBalance = () => {
  const resaltIncome = dbOperation.filter((elem) => {
    return elem.amount > 0;
  });
  const summIncome = resaltIncome.reduce((acc, elem) => {
    return acc + elem.amount;
  }, 0);
  const resaltInspensis = dbOperation.filter((elem) => {
    return elem.amount < 0;
  });
  const sumInspensin = resaltInspensis.reduce((acc, elem) => {
    return acc + elem.amount;
  }, 0);
  const resaltBalse = summIncome + sumInspensin;
  totalMoneyIncome.textContent = summIncome + "₽";
  totalMoneyExpenses.textContent = sumInspensin + "₽";
  totalBalance.textContent = resaltBalse + "₽";
};

const init = () => {
  historyList.innerHTML = "";
  dbOperation.forEach((elem) => {
    renderOperation(elem);
  });
  updateBalance();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const operationAmountValue = operationAmount.value;
  const operationNameValue = operationName.value;
  operationNameValue.textContent = "";
  operationAmountValue.textContent = "";
  operationName.style.borderColor = "";
  operationAmount.style.borderColor = "";
  if (operationNameValue && operationAmountValue) {
    const operationObj = {
      id: generatId(),
      discription: operationNameValue,
      amount: +operationAmountValue,
    };
    dbOperation.push(operationObj);
    console.log(dbOperation);
    init();
  } else {
    if (!operationNameValue) operationName.style.borderColor = "red";
    if (!operationAmountValue) operationAmount.style.borderColor = "red";
  }
});
historyList.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains("history_delete")) {
    dbOperation = dbOperation.filter((elem) => {
      if (elem.id === target.dataset.id) {
        return false;
      } else {
        return true;
      }
    });
    init();
    console.log(dbOperation);
  }
});

init();
