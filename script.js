console.log('Hello World');

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', (e) => {
  console.log('clicked');
}));