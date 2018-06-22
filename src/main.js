const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch'); 
let searchName = document.getElementById('searchName');
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
        getNameUsersOfCohort(selectorOfCohorts.value);
        // getNamesOfCoursesByCohort(selectorofCohorts.value)
        searchStudents.classList.remove('hidden');
        titleListStudent.classList.remove('hidden');}else{
            alert('aún no hay datos de este cohort')
        }
 
});
//evento para
btnSearch.addEventListener('click', (e) => {
        e.preventDefault();
        searchStudent(searchName.value);
    });

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
