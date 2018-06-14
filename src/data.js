//Declaración de variables
const testBtnLima = document.getElementById('testBtnLima');
const testBtnChile = document.getElementById('testBtnChile');
const testBtnMexico = document.getElementById('testBtnMexico');
const searchBtn = document.getElementById('search');
let enterName = document.getElementById('enter-name');
const cohortLima = document.getElementById('cohort-Lima');
const getUsersEndpoints = '/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const getUsersProgressEndpoint = '/data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const getUsersGlobalEndpoint = '/data/cohorts.json';
const resultUsers = document.getElementById('response-container');
const filterAlumnas = document.getElementsByClassName('search-alumnas')[0];
const selector = document.getElementById('selector');

//Lista de Cohorts
const getCohorts = () => {
  let filtrarIdCohorts = [];
  fetch(getUsersGlobalEndpoint, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((dataCohorts) => {
      dataCohorts.forEach(cohort => {
        let listIdCohorts = document.createElement('option');
        listIdCohorts.innerText = cohort.id;
        selector.appendChild(listIdCohorts);
      })
    })
}

// FILTER STUDENTS BY ZONE
const getUsers = (timezone) => {
  let filterUsers = [];
  fetch(getUsersEndpoints, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((users) => {
      users.forEach(user => {
        if (user.timezone === timezone) {
          filterUsers.push(user);
        }
      });
      debugger
      listUsers(filterUsers);
    })
};

const listUsers = (lstUsers) => {
  resultUsers.innerHTML = '';
  lstUsers.forEach(user => {
    let liUser = document.createElement('li');
    liUser.innerText = user.name;
    resultUsers.appendChild(liUser);
  });
}

testBtnLima.addEventListener('click', (e) => {
  e.preventDefault();
  //getUsers('America/Lima');
  filterAlumnas.classList.remove('hidden');
  getCohorts();
});

testBtnChile.addEventListener('click', (e) => {
  e.preventDefault();
  getUsers('America/Chile');
});

testBtnMexico.addEventListener('click', (e) => {
  e.preventDefault();
  getUsers('America/Mexico');

});


// FILTER STUDENTS BY NAME
const FilterUsers = (users) => {
  let filterUsersName = [];
  fetch(getUsersEndpoints, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
    })
    .then((requestusers) => {
      requestusers.forEach(user => { // recorrer la data
        if (user.name === users) {
          filterUsersName.push(user); //adicionar elemento al array
        }
      });
      listUsers(filterUsersName);
    })
};

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  FilterUsers(enterName.value);
});