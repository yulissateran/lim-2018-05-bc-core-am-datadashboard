// <!DOCTYPE html>
// <html>
//  <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//   <link rel="stylesheet" href="style.css" />
//   <title>Data Dashboard</title>
//  </head>
//  <body>
//   <header class="header">
//    <h1 id="" class="">Laboratoria Datadashboard</h1>
//   </header>
//   <main>
//   </main>
//   <form class="search-students" action="">
//    <button id="cohorts-btn">Cohorts</button>
//    <select id ="selectorOfCohorts" class = "hidden"></select>
//    <div id = "search-students" class = "search-students hidden">
//     <h2>Cursos de este cohort:</h2>
//     <p id="courses-of-the-cohort"></p>
//     <h2 id="list-students" class="list-students hidden">Lista de alumnas</h2>
//     <button id="btnSearch">Buscar</button>
//     <input id="searchName"/><!--
//     <button>Ordenar</button>
//     <button id="prueba">Prueba</button>-->
//     <br/>
//    </div>
//    <section id = "profile-users">

//    </section> 
//   </form>
// <script src="data.js"></script>
//   <script src="app.js"></script>
// <script src="main.js"></script>

  

//  </body>
// </html>
//main.js
//declarando variables 
const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const profileUsers = document.getElementById('profile-users');
const selectorOfCohorts = document.getElementById('selectorOfCohorts');
const cohortsBtn = document.getElementById('cohorts-btn');
const titleListStudent = document.getElementById('list-students');
const searchStudents = document.getElementById('search-students');
const btnSearch = document.getElementById('btnSearch');
let searchName = document.getElementById('searchName');
// Evento para el boton cohorts que liste los cohorts
cohortsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    selectorOfCohorts.classList.remove('hidden');

    getListOfCohorts();
});
// Evento para selector, que crea la lista de alumnas según el cohort
selectorOfCohorts.addEventListener('change', (e) => {
    e.preventDefault();
    if (selectorOfCohorts.value === 'lim-2018-03-pre-core-pw') {
        getNameUsersOfCohort(selectorOfCohorts.value);
        // getNamesOfCoursesByCohort(selectorofCohorts.value)
        searchStudents.classList.remove('hidden');
        titleListStudent.classList.remove('hidden');
    } else {
        alert('aún no hay datos de este cohort')
    }

});
//evento para
btnSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchStudent(searchName.value);
});
//app.js
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
          //  console.log(use}r);
           profileUser = document.createElement('div');
           nameUser = document.createElement('h6')
           exercisesPercent= document.createElement('p')
           nameUser.innerText=user.name;
           exercisesPercent.innerHTML = 'ejercicios completados:  ' + user.stats.exercises['percent'] + '%';
          //  console.log(user.stats.exercises.percent);
          //  console.log(nameUser);
          //  console.log(exercisesPercent.innerText);
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

window.data = {
    computeUsersStats(users, progress, courses) {
        const usersWithStats = users;
        const keysProgress = Object.keys(progress);
        let scoreOfCohort = 0;
        let promedioCohort = '';
        try {
            for (const user of usersWithStats) {
                for (const id of keysProgress) {
                    if (user.id === id) {
                        //exercises
                        if (Object.entries(progress[id]).length !== 0) {

                            user['stats'] = {};
                            user.stats['percent'] = progress[id][courses]['percent'];
                            user.stats['exercises'] = {};
                            user.stats['reads'] = {};
                            user.stats['quizzes'] = {};
                            user.stats.quizzes['total'] = 0;
                            user.stats.quizzes['completed'] = 0;
                            user.stats.quizzes['percent'] = 0
                            user.stats.reads['total'] = 0;
                            user.stats.reads['completed'] = 0;
                            user.stats.reads['percent'] = 0;
                            user.stats.exercises['total'] = (Object.keys(progress[id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
                            user.stats.exercises['completed'] = progress[id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] +
                                progress[id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'];
                            user.stats.exercises['percent'] = ((progress[id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['completed']) * 100);

                            //reads


                            const unitsOfCourses = progress[id][courses].units;  // console.log(unitsOfCourses)

                            for (unit in unitsOfCourses) {
                                let partsOfUnit = unitsOfCourses[unit].parts;       //console.log(partsOfUnit)
                                for (part in partsOfUnit) {
                                    let propertysOfTheParts = partsOfUnit[part]; console.log(propertysOfTheParts.completed)
                                    let type = propertysOfTheParts.type;              //console.log(type)
                                    if (type === 'quiz') {
                                        if (propertysOfTheParts.completed === 1) { }
                                    } if (type === 'practice') {
                                        // console.log(propertysOfTheParts.completed);
                                        if (propertysOfTheParts.completed === 1) { }
                                    } if (type === 'read') {
                                        if (propertysOfTheParts.completed === 1) { }
                                    }
                                }
                            }

                            // user.stats['reads']= progress[id][courses]['percent'];
                        } else if (Object.entries(progress[id]).length === 0) {
                            user['stats'] = {};
                            user.stats['exercises'] = {};
                            user.stats.exercises['total'] = 2;
                            user.stats.exercises['completed'] = 0;
                            user.stats.exercises['percent'] = 0;
                            user.stats['percent'] = 0;
                            // console.log(user)
                        }
                        scoreOfCohort += user.stats.percent;
                    }

                }
            }
            promedioCohort += 'promedio del cohort:   ' + scoreOfCohort / usersWithStats.length;
            //  console.log(scoreOfCohort);
            //  console.log(promedioCohort) 
        } catch (err) { console.log(err.message) }
        return usersWithStats;
    },
    dato() { }
}

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


// const keyDataComidas = Object.keys(dataComidas);

// for(const perro of perros) {
//     console.log(perro)
//     for (const namePerro of keyDataComidas) {
//          if (perro.name === namePerro) {
//              console.log(dataComidas[namePerro].comida);
//          }   
//     }
// }
