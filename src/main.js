//declarando variables 
const cohortsBtn = document.getElementById('cohorts-btn');
const selector = document.getElementById('selector');
const listStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const searchBtn = document.getElementById('search');

// Evento para el boton cohorts que liste los cohorts
cohortsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selector.classList.remove('hidden');
    
    getCohorts();
});

// Evento para selector, que crea la llista de alumnas según el cohort
selector.addEventListener('change', (e) => {
    e.preventDefault();
    getUsers(selector.value);
    searchStudents.classList.remove('hidden');
    listStudent.classList.remove('hidden');
});


//Evento para buscar estudiantes por nombre

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    FilterUsers(enterName.value);
});
