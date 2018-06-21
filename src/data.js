window.data = {
  computeUsersStats(users, progress, courses) {
    const usersWithStats = users;
    const keysProgress = Object.keys(progress);
    let scoreOfCohort =0;
    let promedioCohort='';
    try{ 
      for (const user of usersWithStats){
       for(const id of keysProgress){
          if(user.id === id){
            //exercises
           if(Object.entries(progress[id]).length !== 0){

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
            user.stats.exercises['percent'] = ((progress[id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['completed'])*100);
            
            //reads
              
             
             const unitsOfCourses = progress[id][courses].units;  // console.log(unitsOfCourses)
            
             for (unit in unitsOfCourses) {
               let partsOfUnit = unitsOfCourses[unit].parts;       //console.log(partsOfUnit)
               for (part in partsOfUnit) {
                 let propertysOfTheParts = partsOfUnit[part];      console.log(propertysOfTheParts.completed)
                 let type = propertysOfTheParts.type;              //console.log(type)
                    if (type === 'quiz'){
                      if (propertysOfTheParts.completed === 1) { }
                    } if (type === 'practice') {
                      // console.log(propertysOfTheParts.completed);
                      if (propertysOfTheParts.completed === 1) {  }
                    }  if (type === 'read') {
                      if (propertysOfTheParts.completed === 1) { }
                    }
                  }
                } 

            // user.stats['reads']= progress[id][courses]['percent'];
            } else if (Object.entries(progress[id]).length === 0){
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
    }catch(err){console.log(err.message) }
    return usersWithStats; 
  },
  dato() { }
}

 //ejercicios
    // let idOfUser = users[0].id 
    // let ejercicioshechos =  progress[idOfUser][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['completed'];
    // let objetoejercicios = progress[idOfUser][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises'];
    // let llavesejercicios = (Object.keys(progress[idOfUser][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
    // console.log(llavesejercicios);
    // let ejerciciosexistentes= llavesejercicios.length
    // let porcentajeejercicios = ((ejercicioshechos/ejerciciosexistentes)*100 +'%');

//ejercicios 2
//  user['stats']={};
//         user.stats['exercises']={};
//         user.stats.exercises['total'] = (Object.keys(progress[user.id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
//         user.stats.exercises['completed'] = progress[user.id][courses]['units']['02-variables-and-data-types']['parts']['06-exercises']['completed']
//         user.stats.exercises['percent'] = ((user.stats.exercises['completed'] / user.stats.exercises['total'])*100);
//         user.stats['percent']= progress[user.id][courses]['percent'];
//         user.stats['reads']= progress[user.id][courses]['percent'];
//         let llavesdelaspartes =Object.keys(progress[user.id][courses]['units']['02-variables-and-data-types']['parts']);
//         console.log(llavesdelaspartes);









/*
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
      responseFromCohorts.forEach(cohort => {
        let nameOfCohort = document.createElement('option');
        nameOfCohort.value = cohort.id;
        nameOfCohort.innerText = cohort.id;
        selectorOfCohorts.appendChild(nameOfCohort);
      })
    })
  }
  // Filtrando estudiantes por cohort
  const getNameUsersOfCohort = (NameOfCohort) => {
    let arrayOfUsersOfOneCohort = [];
    fetch(cohortLim2018_03_precore_pw, { method: 'GET' })
      .then((response) => {
        if (response.status !== 200) {
          alert('Error')
        }
        return response.json();
        })
      .then((responseOfCohort) => {
        responseOfCohort.forEach(user => {
          if (user.signupCohort === NameOfCohort) {
            arrayOfUsersOfOneCohort.push(user);
          }
        });
        paintUsersFromCohort(arrayOfUsersOfOneCohort);
      })
  }; 
  //pinta la ista de usuarias del cohort y le da un "enlace" hacia progres
  const paintUsersFromCohort = (arrayOfUsersOfOneCohort) => {
    containerListUsers.innerHTML = '';
    arrayOfUsersOfOneCohort.forEach(user => {
      let createElementLi = document.createElement('li');
      let createElement_A = document.createElement('a');
      createElement_A.innerHTML = user.name,
      createElement_A.setAttribute('href', 'javascript;');
      createElement_A.addEventListener('click', (e)=>{
        e.preventDefault();
        getUsersProgress(user.id);
      });
      createElementLi.appendChild(createElement_A);
      containerListUsers.appendChild(createElementLi);
      });
  }
  //Buscar estudiantes por nombre
  const searchStudent = (student) => {
    let arrayNameUser = [];
    fetch(cohortLim2018_03_precore_pw, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
      })
      .then((dataOfUsers) => {
        dataOfUsers.forEach(user => { // recorrer la data
          if (user.name === student) {
            arrayNameUser.push(user); //adicionar elemento al array
          }
        });
        paintUsersFromCohort(arrayNameUser);
      })
  };
  //Traer progreso
  const getUsersProgress = (idStudent) => {
    fetch(progressOfUsersOfLim2018_03_precore_pw, { method: 'GET' })
    .then((response) => {
      if (response.status !== 200) {
        alert('Error')
      }
      return response.json();
      })
      .then((progressStudents) => {
        let progressUser = progressStudents[idStudent]["intro"]["percent"];
        createContainerForScore(progressUser)
         console.log(progressUser);
      })
  };
  const createContainerForScore=(scoreForStudent)=>{
    containerListProgress.innerHTML="";
    let createElement_Li = document.createElement('li');
    createElement_Li.innerText = scoreForStudent;
    let createElementP = document.createElement('p');
    createElementP.innerText = "Porcentaje de completidud de todos los cursos";
    containerListProgress.appendChild(createElementP);
    containerListProgress.appendChild(createElement_Li);
    
  }
  */
