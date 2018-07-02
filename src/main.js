// let tableUsers = document.getElementById('table-body')
let profilesUsers = document.getElementById('profiles-users');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');
//order 
let btnOrderASC = document.getElementById('asd');
let btnOrderDESC = document.getElementById('des');
let selectOrder = document.getElementById('select-order')
let selectDirection = document.getElementById('order-direction')


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
        profilesUsers.classList.remove('hidden')
    }else{
            alert('aún no hay datos de este cohort')
        }
 
});

//Evento de boton para ordenar
btnOrder.addEventListener('click', (e) => {
    
})

//Evento de boton para ordenar de forma ascendente
btnAscendente.addEventListener('click', (e) => { 
    e.preventDefault();
   
})

//Evento de boton para ordenar de forma descendente
btnDescendente.addEventListener('click', (e) => {
    e.preventDefault();
    
})

