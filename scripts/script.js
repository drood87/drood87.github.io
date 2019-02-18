const peopleCard = document.querySelector('#people');
const planetCard = document.querySelector('#planets');
const speciesCard = document.querySelector('#species');

function sayHi() {
  console.log('Hi 👍');
}

peopleCard.addEventListener('click', sayHi);
planetCard.addEventListener('click', sayHi);
speciesCard.addEventListener('click', sayHi);
