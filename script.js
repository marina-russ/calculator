const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//MDN: Classes are a template for creating objects. They encapsulate data with code to work on that data.
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
    // we call clear() when the calculator is first created, so that all inputs are cleared and set to their default values
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {

  }

  //converts to string so that Javascript appends the number to the end of the Operand, instead of treating + as addition operation.
  //typing "1" and "3" gives us "13", not 4.
  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();

  }

  chooseOperation(operation) {

  }

  compute() {

  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
  }
}

// With a class, we need to hook up the const variable buttons to the calculator object. This is done by calling new [ClassName]. Then pass everything from the constructor into it.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})