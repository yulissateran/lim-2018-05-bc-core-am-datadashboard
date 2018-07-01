const arrayOfFileOfData = ['../data/cohorts.json', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json']

let cohort = '';
let courses = '';
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
        const options = {
              cohort: cohort,
              cohortData:{
                  users: users,
                  progress:progress
              },
              orderBy:'name',
              orderDirection:'ASD',
              search:'Lizeth'
            }

processCohortData(options);      
       
      })
    })
  };