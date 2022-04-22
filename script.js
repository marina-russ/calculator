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
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    // if user presses decimal button but operand already has one, fxn will return instead of appending another decimal
    this.currentOperand = this.currentOperand.toString() + number.toString();
    //converts to string so that Javascript appends the number to the end of the Operand, instead of treating + as addition operation. [typing "1" and "3" gives us "13", not 4, etc.]
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') {
      return;
      // if the current operand is empty, stop running this fxn
    }
    if (this.previousOperand !== '') {
      this.compute();
      // if previous operand is not empty, run the compution fxn
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    //when an operation is clicked, the current operand is 'finished' and is set to be the previous operand
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    //converts strings back into numbers
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    }
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

// With a class, we need to hook up the const variable buttons to the calculator object. This is done by calling new [ClassName]. Then pass everything from the constructor into it.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});