
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
const pintarStudents = (users) => {
    for (const user of users) {
        if (user.role === 'student') {
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
            // tableUsers.innerHTML += 
            // `<tr>
            //              <td>${user.name}</td>
            //              <td>${user.stats.exercises.percent}%</td> 
            //              <td>${user.stats.reads.percent}%</td> 
            //              <td>${user.stats.quizzes.percent}%</td>
            //              <td>${user.stats.quizzes.scoreAvg}%</td>
            //              <td>${user.stats.percent}%</td>
            //            </tr>` 
        };
    };
    return profilesUsers
}
//Creando la lista de cohorts 
const getListOfCohorts = () => {
    fetch('../data/cohorts.json')
        .then((response) => response.json())
        .then((cohorts) => {
            options.cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
            cohorts.forEach(cohort => selectorOfCohorts.innerHTML += `<option>${cohort.id}</option>`)
            console.log(options);
        })

}
//lista de alumnos
const getNameUsersOfCohort = () => {
    fetch('../data/cohorts/lim-2018-03-pre-core-pw/users.json')
        .then((response) => response.json())
        .then((users) => {
            fetch('../data/cohorts/lim-2018-03-pre-core-pw/progress.json')
                .then((response) => response.json())
                .then((progress) => {
                    options.cohortData.users = users
                    options.cohortData.progress = progress
                    console.log(options);
                    // processCohortData(options);
                    return pintarStudents(processCohortData(options))

                })
        })
};
// Evento para listar los cohorts
document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
   getListOfCohorts();
})
// Evento para selector, crea la lista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    if (selectorOfCohorts.value === 'lim-2018-03-pre-core-pw'){
        getNameUsersOfCohort();
        // profilesUsers.classList.remove('hidden')
    }else{
             
        }
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
    options.search = inputSearchStudent.value.toLowerCase();
   console.log(options)
    profilesUsers.innerHTML = ''
    // getNameUsersOfCohort()
    return getNameUsersOfCohort() 
     
});

