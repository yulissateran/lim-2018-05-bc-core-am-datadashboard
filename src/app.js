const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const profileUsers = document.getElementById('profile-users');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');
let courses = '';
let nameOfCohort = '';
let profileUser ='';
let nameUser ='';
let totalPercent='';
let exercisesPercent='';
let readsPercent='';
let quizzPercent='';
let containerOfPercentGeneral = '';
//Creando la lista de cohorts 
const getListOfCohorts = () => {
    fetch(CohortsOfLaboratoria, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
      })
   .then((responseFromCohorts) => {
     courses = Object.keys(responseFromCohorts[31].coursesIndex);
      responseFromCohorts.forEach(cohort => {
        nameOfCohort = document.createElement('option');
        nameOfCohort.value = cohort.id;
        nameOfCohort.innerText = cohort.id;
        selectorOfCohorts.appendChild(nameOfCohort);
      })
    })
  }
// Nombres de estudiantes por cohort
    const getNameUsersOfCohort = () => {
      fetch(cohortLim2018_03_precore_pw, { method: 'GET' })
      .then((response) => { return response.json() })
      .then((users) => {
      
        fetch(progressOfUsersOfLim2018_03_precore_pw, { method: 'GET' })         
        .then((response) => {return response.json()})
        .then((progress) => {          
          const usersWithState= data.computeUsersStats(users, progress, courses);
          try{
           for (const user of usersWithState) {
               profileUser = document.createElement('div');
               nameUser = document.createElement('h3')
               nameUser.innerText = user.name;
               profileUser.appendChild(nameUser);
               profileUsers.appendChild(profileUser);
               if (user.role==='student') {
                   console.log(user);
                   exercisesPercent = document.createElement('p')
                   exercisesPercent.innerHTML = 'Ejercicios:  ' + user.stats.exercises['percent'] + '%';
                   readsPercent = document.createElement('p');
                   readsPercent.innerHTML = 'Lecturas:   ' + user.stats.reads['percent']+ '%';
                   quizzPercent = document.createElement('p'); 
                   quizzPercent.innerHTML = 'Quizz:    ' + (user.stats.quizzes)['percent'] + '%';
                   profileUser.appendChild(exercisesPercent);
                   profileUser.appendChild(readsPercent);
                   profileUser.appendChild(quizzPercent);
                   
               } else if (user.role === 'instructor') { 

               } else { }
          
         };
        }catch(err){
          console.log(err.message)
        }
        })
      })
    };



const perros = [
  {
    name: 'shiro',
    edad: 13,
  },
  {
    name: 'boby',
    edad: 12,
  }
];

const dataComidas = {
  shiro: {
    comida: 'ricocan',
    precio: 10
  },
  boby: {
    comida: 'mimaskot',
    precio: 19
  }
}

const keyDataComidas = Object.keys(dataComidas);
// console.log(keyDataComidas)

for (const perro of perros) {
  // console.log(perro)
  for (const namePerro of keyDataComidas) {
    if (perro.name === namePerro) {
      // console.log(dataComidas[namePerro].comida);
      perro['alimentación' ]= (dataComidas[namePerro]);
      
    }
  }
 }  // console.log(perros);
