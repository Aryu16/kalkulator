const calculator = document.querySelector('.calculator');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = undefined;
}

function deleteLastDigit() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = undefined;
  previousOperand = '';
}

function updateDisplay() {
  currentOperandTextElement.innerText = currentOperand;
  previousOperandTextElement.innerText = previousOperand;
}

const numberButtons = document.querySelectorAll('[value]');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.value);
    updateDisplay();
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.value);
    updateDisplay();
  })
});

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

clearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener('click', () => {
  deleteLastDigit();
  updateDisplay();
});