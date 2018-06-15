//declarando variables 
const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const containerListUsers = document.getElementById('containerListUsers');
const containerListProgress = document.getElementById('containerListProgress');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');
//arreglar variables
const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch'); 
let searchName = document.getElementById('searchName');
// Evento para el boton cohorts que liste los cohorts
cohortsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectorOfCohorts.classList.remove('hidden');
    
    getListOfCohorts();
});
// Evento para selector, que crea la llista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    getNameUsersOfCohort(selectorOfCohorts.value);
    searchStudents.classList.remove('hidden');
    titleListStudent.classList.remove('hidden');
});
btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        searchStudent(searchName.value);
    });



