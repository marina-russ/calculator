const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

//MDN: Classes are a template for creating objects. They encapsulate data with code to work on that data.
class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {

  }

  appendNumber(number) {
    this.currentOperand = number;
  }

  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
  }
}

// With a class, we need to hook up the const variable buttons to the calculator object. This is done by calling new [ClassName]. Then pass everything from the constructor into it.
const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})