//Declarando variables 
const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const prueba=document.getElementById('prueba');
const selectorOfCohorts = document.getElementById('selector-Of-Cohorts');
const containerListUsers = document.getElementById('containerListUsers');
const containerListProgress = document.getElementById('containerListProgress');
const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch'); 
let searchName = document.getElementById('searchName');
const readCounterCohort = document.getElementById('read-counter');
const completedReadStudent = document.getElementById('completed-read');
const percentReadStudent = document.getElementById('percent-read');
const exercisesCounterCohort = document.getElementById('exercises-counter');
const completedExercisesStudent = document.getElementById('completed-exercises');
const percentExercisesStudent = document.getElementById('percent-exercises');
const quizCounterCohort = document.getElementById('quiz-counter');
const completedQuizStudent = document.getElementById('completed-quiz');
const quizScoreStudent = document.getElementById('quiz-score');
const percentScoreStudent = document.getElementById('percent-score');

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



