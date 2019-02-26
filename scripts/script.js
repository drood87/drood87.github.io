const peopleCard = document.querySelector('#people');
const planetCard = document.querySelector('#planets');
const speciesCard = document.querySelector('#species');
const sectionDiv = document.querySelector('#contentHook');
const planetApiPoint = 'https://swapi.co/api/planets';
const peopleApiPoint = 'https://swapi.co/api/people/';
const speciesApiPoint = 'https://swapi.co/api/species/';

function planets() {
  sectionDiv.innerHTML = '';

  fetch(planetApiPoint).then((
    response // initial API call for 1st page
  ) =>
    response.json().then(rawData => {
      nextPageCheck(rawData.next); //url to next page
      filterData(rawData.results); //array with planets
    })
  );
}

function nextPageData(nextPage) {
  console.log(nextPage);
  fetch(nextPage).then(response =>
    response.json().then(rawData => {
      nextPageCheck(rawData.next); //url to next page
      filterData(rawData.results); //array with planets
    })
  );
}

function filterData(data) {
  console.log(data);
  data.map(planets => {
    const { name, population, diameter } = planets;
    createTextContent(name, population, diameter);
  });
}

//check if array has a method with another page

function nextPageCheck(pageCheck) {
  if (pageCheck != null) {
    nextPageData(pageCheck);
  }
}

async function peopleData() {
  const peoplesArr = await fetch(peopleApiPoint).then(res => res.json());

  peoplesArr.results.map(async res => {
    const { name, birth_year } = res; // quickly destructure the values into respective variables
    const homeworld = res.homeworld; // homeworld key holds another url
    const data = await peopleHomeworld();
    console.log(name, birth_year, data);

    async function peopleHomeworld() {
      // make another async function that resolves the next  API call to that URL to get the value
      const peopleHomeworld = await fetch(homeworld).then(r => r.json()); // resolve promise and return object with data
      const homeworldName = await peopleHomeworld.name; // store the data from the object in own variable
      // console.log(homeworldName, `name`); // homeworldName is actually resolved
      return await homeworldName; // this variable will hold the value I want in that function
    } // upon trying to call the function it will show another promise but not my return value
  });
}

async function getSpeciesData() {
  const species = await fetch(speciesApiPoint).then(r => r.json());

  console.log(species.results);
}

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

peopleCard.addEventListener('click', peopleData);
planetCard.addEventListener('click', planets);
speciesCard.addEventListener('click', getSpeciesData);
