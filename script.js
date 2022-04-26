const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
//Optional: Memory Functions
const memorySaveButton = document.querySelector('[data-memory-save]');
const memoryClearButton = document.querySelector('[data-memory-clear]');
const memoryRecallButton = document.querySelector('[data-memory-recall]');
//Random Button space
const helloButton = document.querySelector('[data-hello]');

//MDN: Classes are a template for creating objects. They encapsulate data with code to work on that data.
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.currentOperand == '0') {
      this.currentOperand = '';
    }
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
      // if previous operand is not empty, run the computation fxn
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
    //parseFloat converts strings back into numbers
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
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand;
    }
  }

  memorySave() {
    this.memoryValue = this.currentOperand;
    this.updateDisplay();
  }

  memoryClear() {
    this.memoryValue = '';
  }

  memoryRecall() {
    this.currentOperand = this.memoryValue;
    this.updateDisplay();
  }

  helloMessage() {
    alert("M+ = Memory Save \nM- = Memory Clear \nMR = Memory Recall");
  }
}
// With a class, we need to hook up the const variable buttons to the calculator object. This is done by calling new [ClassName]. Then pass everything from the constructor into it.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (e) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', (e) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (e) => {
  calculator.delete();
  calculator.updateDisplay();
});

//Optional: Memory Functions
memorySaveButton.addEventListener('click', (e) => {
  calculator.memorySave();
});

memoryClearButton.addEventListener('click', (e) => {
  calculator.memoryClear();
});

memoryRecallButton.addEventListener('click', (e) => {
  calculator.memoryRecall();
});

//Random Button space
helloButton.addEventListener('click', (e) => {
  calculator.helloMessage();
});