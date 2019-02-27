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
    createTextContentPlanet(name, population, diameter);
  });
}

//check if array has a method with another page

function nextPageCheck(pageCheck) {
  if (pageCheck != null) {
    nextPageData(pageCheck);
  }
}

// ===================================================================================
// Above example with fetch().then API
// Bottom code is written in async/await syntax.
// Used both methods for training purposes
// ===================================================================================

// get Data from people API fetch call
async function peopleData() {
  sectionDiv.innerHTML = '';
  const peoplesArr = await fetch(peopleApiPoint).then(res => res.json());

  getResultsDataPeople(peoplesArr.results);
  checkForNextPagePeople(peoplesArr.next);
}

async function getResultsDataPeople(results) {
  results.map(async res => {
    // homeworld will return an URL that needs to be resolved in different function

    const { name, birth_year, homeworld } = res;

    // call the reference to the function
    //that returns the resolved promise of the name of homeworld
    const homeworldName = await nameHomeworld(homeworld);

    createTextContentPeople(name, birth_year, homeworldName);
  });
}

//get Data from Species fetch API call
async function getSpeciesData() {
  try {
    sectionDiv.innerHTML = '';
    const species = await fetch(speciesApiPoint).then(r => r.json());

    getResultsDataSpecies(species.results);
    checkForNextPageSpecies(species.next);
  } catch (err) {
    console.error(err);
  }
}

async function getResultsDataSpecies(results) {
  results.map(async res => {
    // homeworld will return an URL that needs to be resolved in different function

    const { name, designation, homeworld } = res;

    // call the reference to the function
    //that returns the resolved promise of the name of homeworld
    const homeworldName = await nameHomeworld(homeworld);

    createTextContentSpecies(name, homeworldName, designation);
  });
}

//async function to fetch the name of the homeworld, argument is the URL passed in from
//species/ people function
async function nameHomeworld(homeworld) {
  const homeworldPromise = await fetch(homeworld).then(r => r.json()); // resolve promise and return object with data
  const homeworldName = await homeworldPromise.name; // store the data from the object in own variable

  return homeworldName; // this variable will hold the value I want in that function
}

// function to test if json file has more than one page

async function checkForNextPagePeople(next) {
  // last page has a value of null so we check if the next method returns null.. if not we rinse repeat the function
  if (next != null) {
    const getResults = await fetch(next).then(res => res.json());
    checkForNextPagePeople(getResults.next);
    getResultsDataPeople(getResults.results);
  }
}

async function checkForNextPageSpecies(next) {
  // last page has a value of null so we check if the next method returns null.. if not we rinse repeat the function
  if (next != null) {
    const getResults = await fetch(next).then(res => res.json());
    checkForNextPageSpecies(getResults.next);
    getResultsDataSpecies(getResults.results);
  }
}

function createTextContentPeople(name, birth_year, homeworldName) {
  const div = document.createElement('div');

  div.classList.add('content-card');
  div.innerHTML = `<h2 class="heading-secondary">Name</h2>
      <p class="content-card__description">${name}</p>
      <h2 class="heading-secondary">Birth Year</h2>
      <p class="content-card__description">${birth_year}</p>
      <h2 class="heading-secondary">Homeworld</h2>
      <p class="content-card__description">${homeworldName}</p>`;
  sectionDiv.appendChild(div);
}

function createTextContentPlanet(name, population, diameter) {
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

function createTextContentSpecies(name, homeworldName, designation) {
  const div = document.createElement('div');

  div.classList.add('content-card');
  div.innerHTML = `<h2 class="heading-secondary">Species</h2>
      <p class="content-card__description">${name}</p>
      <h2 class="heading-secondary">Home Planet</h2>
      <p class="content-card__description">${homeworldName}</p>
      <h2 class="heading-secondary">Designation</h2>
      <p class="content-card__description">${designation}</p>`;
  sectionDiv.appendChild(div);
}

peopleCard.addEventListener('click', peopleData);
planetCard.addEventListener('click', planets);
speciesCard.addEventListener('click', getSpeciesData);
