let courses = '';
let nameOfCohort = '';
let profileUser ='';
let nameUser ='';
let exercisesPercent='';
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
      .then((response) => {
        if (response.status !== 200) {
         alert('Error')
        }
        return response.json();
        })
      .then((users) => {
        // console.log(courses);
        fetch(progressOfUsersOfLim2018_03_precore_pw, { method: 'GET' })         
        .then((response) => {
          if (response.status !== 200) {
            alert('Error')
          }
          return response.json();
        })
        .then((progress) => {          
          //  console.log(users, progress, courses);
         const usersWithState= data.computeUsersStats(users, progress, courses);
          console.log(usersWithState);
         try{for (const user of usersWithState) {
           console.log(user);
           profileUser = document.createElement('div');
           nameUser = document.createElement('h6')
           exercisesPercent= document.createElement('p')
           nameUser.innerText=user.name;
           exercisesPercent.innerHTML = 'puntuación en ejercicios:  '+user.stats.exercises.percent + '%';
           console.log(user.stats.exercises.percent);
           console.log(nameUser);
           console.log(exercisesPercent.value);
           profileUser.appendChild(nameUser);
           profileUser.appendChild(exercisesPercent);
           profileUsers.appendChild(profileUser);
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