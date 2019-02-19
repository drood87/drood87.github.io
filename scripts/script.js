const peopleCard = document.querySelector('#people');
const planetCard = document.querySelector('#planets');
const speciesCard = document.querySelector('#species');
const sectionDiv = document.querySelector('#contentHook');

function getPeopleData() {
  const peopleProm = fetch('https://swapi.co/api/people');
  const peopleData = peopleProm.then(data => data.json());
  const peopleNames = peopleData.then(data => data.results);
  const test = peopleNames
    .then(data => data.map())
    .then(data => console.log(data.name));

  console.log(test);
}

function getPlanetData() {
  fetch('https://swapi.co/api/planets').then(data =>
    data
      .json()
      .then(data => {
        data.results.map(arr => {
          const { name, population, diameter } = arr; // destructure into own variables
          createTextContent(name, population, diameter); // pass as arguments into function
        });
      })
      .catch(err => console.error(err))
  );

  fetch('https://swapi.co/api/planets').then(data =>
    data
      .json()
      .then(data => fetch(data.next))
      .then(data =>
        data
          .json()
          .then(data => {
            data.results.map(arr => {
              const { name, population, diameter } = arr; // destructure into own variables
              createTextContent(name, population, diameter); // pass as arguments into function
            });
          })

          .catch(err => console.error(err))
      )
  );

  // return planetData;
}

function getSpeciesData() {
  const species = fetch('https://swapi.co/api/species').then(data =>
    data
      .json()
      .then(data => console.log(data))
      .catch(err => console.error(err))
  );
}

function createTextContent(name, population, diameter) {
  const div = document.createElement('div');
  // console.log(!div.hasChildNodes());

  div.classList.add('content-card');
  div.innerHTML = `<h2 class="heading-secondary">Name</h2>
      <p class="content-card__description">${name}</p>
      <h2 class="heading-secondary">Population</h2>
      <p class="content-card__description">${population}</p>
      <h2 class="heading-secondary">Diameter</h2>
      <p class="content-card__description">${diameter}</p>`;
  sectionDiv.appendChild(div);

  // console.log(sectionDiv.hasChildNodes());
}

peopleCard.addEventListener('click', getPeopleData);
planetCard.addEventListener('click', getPlanetData);
speciesCard.addEventListener('click', getSpeciesData);
