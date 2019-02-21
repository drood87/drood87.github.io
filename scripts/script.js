const peopleCard = document.querySelector('#people');
const planetCard = document.querySelector('#planets');
const speciesCard = document.querySelector('#species');
const sectionDiv = document.querySelector('#contentHook');
const planetApiPoint = 'https://swapi.co/api/planets';

function planets() {
  fetch(planetApiPoint).then(response =>
    response.json().then(rawData => {
      nextPageCheck(rawData.next); //url to next page
      filterData(rawData.results); //array with planets
    })
  );
}

function filterData(data) {
  data.map(planets => {
    const { name, population, diameter } = planets;
    createTextContent(name, population, diameter);
  });
}

function nextPageCheck(pageCheck) {
  if (pageCheck != null) {
    console.log(pageCheck);
  }
}

// function checkNextApiPage(data) {
//   fetch(data).then(data =>
//     data.json().then(dataNew => {
//       checkIfMorePages(dataNew);
//       dataNew.results.map(results => {
//         const { name, population, diameter } = results; //destructuring items into own variables
//         createTextContent(name, population, diameter);
//       });
//     })
//   );
// }

// function checkIfMorePages(dataNew) {
//   if (dataNew.next != null) {
//     checkNextApiPage(dataNew.next);
//   }
// }

function createTextContent(name, population, diameter) {
  const div = document.createElement('div');

  div.classList.add('content-card');
  div.innerHTML = `<h2 class="heading-secondary">Name</h2>
      <p class="content-card__description">${name}</p>
      <h2 class="heading-secondary">Population</h2>
      <p class="content-card__description">${population}</p>
      <h2 class="heading-secondary">Diameter</h2>
      <p class="content-card__description">${diameter}</p>`;
  sectionDiv.appendChild(div);
}

// peopleCard.addEventListener('click', getPeopleData);
planetCard.addEventListener('click', planets);
// speciesCard.addEventListener('click', getSpeciesData);
