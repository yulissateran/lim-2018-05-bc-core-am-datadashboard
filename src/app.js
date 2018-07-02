
const arrayOfFileOfData = ['../data/cohorts.json', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json']
const btnCohorts =document.getElementById('btn-cohorts');
let containerCohorts = document.getElementById('continer-cohorts');
let divCohort ="";
let nameCohort="";
let cohort = '';
let courses = '';

btnCohorts.addEventListener('click',()=>{
  getListOfCohorts
});
//Creando la lista de cohorts 
const getListOfCohorts = () => {
  fetch(arrayOfFileOfData[0], { method: 'GET' })
  .then((response) => response.json())
  .then((cohorts) => {
     cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    cohorts.forEach(cohort => selectorOfCohorts.innerHTML+=`<option>${cohort.id}</option>`)
  })
}


// Nombres de estudiantes por cohort
const getNameUsersOfCohort = () => {
  fetch(arrayOfFileOfData[1], { method: 'GET' })
    .then((response) => response.json())
    .then((users) => {
      fetch(arrayOfFileOfData[2], { method: 'GET' })         
      .then((response) =>  response.json())
      .then((progress) => {  
      let search = document.getElementById('buscador').value;
      let orderBy = document.getElementById('select-order').value
      let orderDirection = document.getElementById('order-direction').value
        const options = {
              cohort: cohort,
              cohortData:{
                  users: users,
                  progress:progress
              },
              orderBy,
              orderDirection,
              search,
            }
processCohortData(options);
pintarStudents(processCohortData(options))      
       
      })
    })
  };

