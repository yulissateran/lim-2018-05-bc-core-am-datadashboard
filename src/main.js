let profilesUsers = document.getElementById('profiles-users');
const selectorOfCohorts = document.getElementById('select-cohorts');
const selectOrder = document.getElementById('select-order');
const btnSearch = document.getElementById('btn-search');
let inputSearchStudent = document.getElementById('search');
let options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null,
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: ''
}
const getListOfCohorts = () => {
    fetch('../data/cohorts.json')
        .then((response) => response.json())
        .then((cohorts) => {
            dataCohorts = cohorts;
            console.log(dataCohorts)
            cohorts.forEach(cohort => selectorOfCohorts.innerHTML += `<option>${cohort.id}</option>`)
            console.log(options);
        })
return selectorOfCohorts
}
const pintarStudents = (users) => {
    for (const user of users) {
        console.log(users);
            profilesUsers.innerHTML += `
        <div class='div-user'>
        <h3>${user.name}</h3>
        <ul>
        <li class='li-progress'>Ejercicios: ${user.stats.exercises.percent}</li>
        <li class='li-progress'>Lecturas: ${user.stats.reads.percent}</li>
        <li class='li-progress'>Quizzes:${user.stats.quizzes.percent}</li>
        <li class='li-progress'>Promedio/quizzes: ${user.stats.quizzes.scoreAvg}</li>
        <li class='li-progress'>Porcentaje total: ${ user.stats.percent}</li>
        </ul>
        </div>`  
    };
    return profilesUsers
}

//Creando la lista de cohorts 
let users = '';
//lista de alumnos
const getNameUsersOfCohort = () => {
  fetch('../data/cohorts.json')
    .then((response) => response.json())
    .then((cohorts) => {
      fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
        .then((response) => response.json())
        .then((responseUsers) => {
          fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
            .then((response) => response.json())
            .then((progress) => {
              options.cohort = cohorts.find(item => item.id === selectorOfCohorts.value);
              console.log(options.cohort);
              users = responseUsers.filter((user) => user.signupCohort === options.cohort.id);
              options.cohortData.users = users
              options.cohortData.progress = progress
              
              return pintarStudents(processCohortData(options))

            })
        })
    });
};
// Evento para listar los cohorts
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
   getListOfCohorts();
})
// Evento para selector, crea la lista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault(); 
        getNameUsersOfCohort();     
});



selectOrder.addEventListener('change', (e) => {
    e.preventDefault();
    options.orderBy = selectOrder.value;
    let optionTextValue = selectOrder.options[selectOrder.selectedIndex];
    options.orderDirection = optionTextValue.text.substr(-3);
    profilesUsers.innerHTML =''
    getNameUsersOfCohort() 
});


btnSearch.addEventListener('click',(e) =>{
    e.preventDefault();
    options.search = inputSearchStudent.value.toL;
   console.log(options)
    profilesUsers.innerHTML = ''
    return getNameUsersOfCohort()     
});

