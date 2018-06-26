
//Declarando variables 
const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const percent = document.getElementById('percent');
const titleRead = document.getElementById('title-read');
const titleExercises = document.getElementById('title-exercises');
const titleQuiz = document.getElementById('title-quiz');
const student = document.getElementById('student');
const nameStudent = document.getElementById('name-student');
const selectorOfCohorts = document.getElementById('selector-Of-Cohorts');
const containerListUsers = document.getElementById('containerListUsers');
const containerListProgress = document.getElementById('containerListProgress');
const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');

const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch');
let searchName = document.getElementById('searchName');

const containerDataUsers = document.getElementById('container-data-users')

const readCounterCohort = document.getElementById('read-counter');
const completedReadStudent = document.getElementById('completed-read');
const percentReadStudent = document.getElementById('percent-read');
const exercisesCounterCohort = document.getElementById('exercises-counter');
const completedExercisesStudent = document.getElementById('completed-exercises');
const percentExercisesStudent = document.getElementById('percent-exercises');
const quizCounterCohort = document.getElementById('quiz-counter');
const completedQuizStudent = document.getElementById('completed-quiz');
const quizScoreStudent = document.getElementById('quiz-score');
const percentQuizStudent = document.getElementById('percent-quiz');
const percentScoreStudent = document.getElementById('percent-score');

// Evento para el boton cohorts que liste los cohorts
document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    //se llenan las opciones
    getListOfCohorts();
})
// Evento para selector, que crea la lista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    if (selectorOfCohorts.value === 'lim-2018-03-pre-core-pw'){
        getNameUsersOfCohort();
        searchStudents.classList.remove('hidden');
    
        containerDataUsers.classList.remove('hidden');
        tablePercentUser.classList.remove('hidden')
    }else{
            alert('aún no hay datos de este cohort')
        }
 
});

// //evento para
// btnSearch.addEventListener('click', (e) => {
//         e.preventDefault();
//         searchStudent(searchName.value);
//     });

// yuli recuerda guardar este ejemplo
// const perros = [
//     {
//         name : 'shiro',
//         edad : 13,
//     },
//     {
//         name : 'boby',
//         edad : 12,
//     }
// ];


//Función para los títulos de los datos de las alumnas
const getTitleDatos = () => {
    titleRead.classList.remove('hidden');
    titleExercises.classList.remove('hidden');
    titleQuiz.classList.remove('hidden');
    student.classList.remove('hidden');
}

//Función mostrar nombre de usuaria
const showStudentInfo = (name) => {
    nameStudent.innerHTML = name;
}

//Evento para el boton, que busca las estudiantes por nombre completo
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchStudent(searchName.value);
});

const printData = (percentCohortStudent, quizCounter, completedQuizCounter, quizAccumulatedScore, readCounter, completedReadCounter, exercisesCounter, completedExercisesCounter) =>{

//Imprimiendo Percent General
percent.innerHTML = "";
let liPercent = document.createElement('li');
liPercent.innerHTML = 'Percent: ' + percentCohortStudent;
percent.appendChild(liPercent);
//Imprimiendo datos de Read
readCounterCohort.innerHTML = "";
completedReadStudent.innerHTML = "";
percentReadStudent.innerHTML = "";
let liReadCounter = document.createElement('li');
let licompletedRead = document.createElement('li');
let lipercentRead = document.createElement('li');
liReadCounter.innerHTML = 'Cantidad de Lecturas: ' + readCounter;
readCounterCohort.appendChild(liReadCounter);
licompletedRead.innerHTML = 'Lecturas Completadas: ' + completedReadCounter;
completedReadStudent.appendChild(licompletedRead);
lipercentRead.innerHTML = 'Porcentaje de Lectturas Completadas: ' + Math.round((completedReadCounter / readCounter) * 100) + '%';
percentReadStudent.appendChild(lipercentRead);
//Imprimiendo datos de Exercises
exercisesCounterCohort.innerHTML = "";
completedExercisesStudent.innerHTML = "";
percentExercisesStudent.innerHTML = "";
let liExercisesCounter = document.createElement('li');
let licompletedExercises = document.createElement('li');
let lipercentExercises = document.createElement('li');
liExercisesCounter.innerHTML = 'Cantidad de Ejercicios: ' + exercisesCounter;
exercisesCounterCohort.appendChild(liExercisesCounter);
licompletedExercises.innerHTML = 'Ejercicios Completados: ' + completedExercisesCounter;
completedExercisesStudent.appendChild(licompletedExercises);
lipercentExercises.innerHTML = 'Porcentaje de Ejercicios Completados: ' + Math.round((completedExercisesCounter / exercisesCounter) * 100) + '%';
percentExercisesStudent.appendChild(lipercentExercises);
//Imprimiendo datos de Quiz
quizCounterCohort.innerHTML = "";
completedQuizStudent.innerHTML = "";
quizScoreStudent.innerHTML = "";
percentQuizStudent.innerHTML = "";
percentScoreStudent.innerHTML = "";
let liQuizCounter = document.createElement('li');
let liCompletedQuiz = document.createElement('li');
let liQuizScore = document.createElement('li');
let liPercentQuiz = document.createElement('li');
let liPercentScore = document.createElement('li');
liQuizCounter.innerHTML = 'Cantidad de Quiz: ' + quizCounter;
quizCounterCohort.appendChild(liQuizCounter);
liCompletedQuiz.innerHTML = 'Quiz Completados: ' + completedQuizCounter;
completedQuizStudent.appendChild(liCompletedQuiz);
liQuizScore.innerHTML = 'Score: ' + quizAccumulatedScore;
quizScoreStudent.appendChild(liQuizScore);
liPercentQuiz.innerHTML = 'Porcentaje de Quiz Completados: ' + Math.round((completedQuizCounter / quizCounter)*100);
percentQuizStudent.appendChild(liPercentQuiz);
liPercentScore.innerHTML = 'Promedio de Quiz: ' + Math.round((quizAccumulatedScore / completedQuizCounter));
percentScoreStudent.appendChild(liPercentScore);

}


// const dataComidas = {
//     shiro : {
//         comida : 'ricocan',
//         precio : 10
//     },
//     boby : {
//         comida : 'mimaskot',
//         precio : 19
//     }
// }

// const keyDataComidas = Object.keys(dataComidas);

// for(const perro of perros) {
//     console.log(perro)
//     for (const namePerro of keyDataComidas) {
//          if (perro.name === namePerro) {
//              console.log(dataComidas[namePerro].comida);
//          }   
//     }
// }
