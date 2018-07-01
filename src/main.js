// const containerDataUsers = document.getElementById('container-data-users')
let tablePercentUser = document.getElementById('table-percent-users');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');


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
    
        // containerDataUsers.classList.remove('hidden');
        tablePercentUser.classList.remove('hidden')
    }else{
            alert('aún no hay datos de este cohort')
        }
 
});