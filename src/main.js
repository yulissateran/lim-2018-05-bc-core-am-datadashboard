//Declarando variables 
const selectorOfCohorts = document.getElementById('selector-Of-Cohorts');
const containerListUsers = document.getElementById('containerListUsers');
const containerListProgress = document.getElementById('containerListProgress');
const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch'); 
let searchName = document.getElementById('searchName');

// Evento para el boton cohorts que liste los cohorts
// DOMContentLoaded: Cuando el HTML termina de cargar
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    //se llenan las opciones
    getListOfCohorts();
})
// Evento para selector, que crea la lista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    getUsersOfCohort(selectorOfCohorts.value);
    searchStudents.classList.remove('hidden');
    titleListStudent.classList.remove('hidden');
});
//Evento para el boton, que busca las estudiantes por nombre completo
btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        searchStudent(searchName.value);
    });



