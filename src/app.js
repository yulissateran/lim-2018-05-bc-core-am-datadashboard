const arrayOfFileOfData = ['../data/cohorts.json', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json']
let tablePercentUser = document.getElementById('table-percent-users');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');
let courses = '';
//Creando la lista de cohorts 
const getListOfCohorts = () => {
  fetch(arrayOfFileOfData[0], { method: 'GET' })
  .then((response) => response.json())
  .then((responseFromCohorts) => {
    courses = Object.keys(responseFromCohorts[31].coursesIndex);
    responseFromCohorts.forEach(cohort => selectorOfCohorts.innerHTML+=`<option>${cohort.id}</option>`)
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
        const newArrayOfUsers= data.computeUsersStats(users, progress, courses);
        try{
          for (const user of newArrayOfUsers) {
            if (user.role==='student') {
              tablePercentUser.innerHTML += 
              `<tr>
                <td>${user.name}</td>
                <td>${user.stats.exercises.percent}%</td> 
                <td>${user.stats.reads.percent}%</td> 
                <td>${user.stats.quizzes.percent}%</td>
              </tr>` 
            }; 
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
