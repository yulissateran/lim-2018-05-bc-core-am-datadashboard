

 window.computeUsersStats=(users, progress, courses) =>{
    const usersWithStats = users;
    const keysProgress = Object.keys(progress);
    let scoreOfCohortInExercises =0;
    let promedioPercentOfExercises='';
    let studentQuantiti = 0;
   try{ 
      for (const user of usersWithStats){
        for(const id of keysProgress){
          if(user.id === id ){
            let quizzsTotal = 0;
            let quizzCompleted = 0;
            let quizzScoreSum = 0;
            let readsTotals = 0;
            let readsCompleted = 0;
            studentQuantiti++
            if(Object.entries(progress[id]).length !== 0){
              const unitsOfCourses = progress[id][courses].units;  // console.log(unitsOfCourses)
              for (unit in unitsOfCourses) {
                let partsOfUnit = unitsOfCourses[unit].parts;       //console.log(partsOfUnit)
                for (part in partsOfUnit) {
                  let type = partsOfUnit[part].type;
                  let completed = partsOfUnit[part].completed;             //console.log(type)
                  if (type === 'quiz' ) {
                    quizzsTotal++
                    if (completed === 1){ quizzCompleted++ }
                      if ((partsOfUnit[part]).hasOwnProperty('score')){
                       quizzScoreSum += partsOfUnit[part].score}
                  }
                  //  if (type === 'practice') {  // console.log(propertysOfTheParts.completed);
                  //  if (propertysOfTheParts.completed === 1) { } }
                  if (type === 'read' ) {
                    readsTotals++
                    if (completed === 1) { readsCompleted++ }
                  }
                }
              } 
              user['stats'] = {};
              user.stats['reads'] = {};
              user.stats.reads['total'] = readsTotals;
              user.stats.reads['completed'] = readsCompleted;
              user.stats.reads['percent'] = Math.round((readsCompleted / readsTotals)*100);
              user.stats['quizzes'] = {};
              user.stats.quizzes['total'] = quizzsTotal;
              user.stats.quizzes['completed'] = quizzCompleted;
              user.stats.quizzes['percent'] = Math.round((quizzCompleted / quizzsTotal)*100);
              user.stats.quizzes['scoreSum']= quizzScoreSum;
              user.stats.quizzes['scoreAvg'] = Math.round((quizzScoreSum / quizzCompleted));
              user.stats['percent'] = progress[id][courses]['percent'];
              user.stats['exercises'] = {};
              user.stats.exercises['total'] = (Object.keys(unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
              user.stats.exercises['completed'] = unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] +
                unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'];
              user.stats.exercises['percent'] = Math.round(((unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['completed']) * 100));
            } else if (Object.entries(progress[id]).length === 0){
              user['stats'] = {};
              user.stats['reads'] = {};
              user.stats.reads['total'] = 0;
              user.stats.reads['completed'] = 0;
              user.stats.reads['percent'] = 0;
              user.stats['quizzes'] = {};
              user.stats.quizzes['total'] = 0;
              user.stats.quizzes['completed'] = 0;
              user.stats.quizzes['percent'] = 0;
              user.stats['percent'] = 0;
              user.stats['exercises'] = {};
              user.stats.exercises['total'] = 0;
              user.stats.exercises['completed'] = 0;
              user.stats.exercises['percent'] = 0;
            }
            scoreOfCohortInExercises += user.stats.exercises.percent;
            // console.log(quizzScoreSum );
          } 
         }
      }
    promedioPercentOfExercises = scoreOfCohortInExercises / studentQuantiti;
    //  containerOfPercentGeneral = document.getElementById('container-of-percent-general');
    //  containerOfPercentGeneral.innerHTML = 'porcentaje promedio de ejercicios:   ' + Math.round(promedioPercentOfExercises) + '%';
    //  console.log(promedioPercentOfExercises) 
    }catch(err){console.log(err.message) }
    // console.log(usersWithStats)
    return usersWithStats; 
  }


window.sortUsers = (users)=>{
  reverseGeneral(users);
  // const arraydeestudiantes=[]
  // users.sort( sortAlphabetic(users,users))
    for (const user of users) {
      if (user.role === 'student') {
        tablePercentUser.innerHTML +=
          `<tr>
                <td>${user.name}</td>
                <td>${user.stats.exercises.percent}%</td> 
                <td>${user.stats.reads.percent}%</td> 
                <td>${user.stats.quizzes.percent}%</td>
                <td>${user.stats.percent}</td>
              </tr>`
      };
    };
  
}
const Alphabetic = (users)=>{
  users.sort((a, b)=> {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  })}
  const reverseAlphabetic=(users)=>{
    users.sort((a, b) => {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) { return 1; }
      if (x > y) { return -1; }
      return 0;
    })
  }
const completedGeneral=(users)=>{
    users.sort((a, b)=> {
      var x = a.stats.percent;
      var y = b.stats.percent;
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;  });  
} 

//Creando la lista de cohorts 
const getListOfCohorts = () => {
    fetch(CohortsOfLaboratoria, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((responseCohorts) => {
            responseCohorts.forEach(cohort => {
                let nameOfCohort = document.createElement('option');
                nameOfCohort.value = cohort.id;
                nameOfCohort.innerText = cohort.id;
                selectorOfCohorts.appendChild(nameOfCohort);
            })
        })
}
// Filtrando estudiantes por cohort
const getUsersOfCohort = (nameOfCohort) => {
    let arrayOfUsersOfOneCohort = [];
    fetch(cohortLim2018_03_precore_pw, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((responseUsersOfCohort) => {
            responseUsersOfCohort.forEach(user => {
                if (user.signupCohort === nameOfCohort) {
                    arrayOfUsersOfOneCohort.push(user);
                }
            });
            paintUsersCohort(arrayOfUsersOfOneCohort);
        })
};
// Pinta la ista de usuarias del cohort y le da un "enlace" hacia progress
const paintUsersCohort = (arrayOfUsersOfOneCohort) => {
    containerListUsers.innerHTML = '';
    arrayOfUsersOfOneCohort.forEach(user => {
        let createElementLi = document.createElement('li');
        let createElement_A = document.createElement('a');
        createElement_A.innerHTML = user.name,
            createElement_A.setAttribute('href', 'javascript;');
        createElement_A.addEventListener('click', (e) => {
            e.preventDefault();
            getUsersProgress(user);
            getTitleDatos();

        });
        createElementLi.appendChild(createElement_A);
        containerListUsers.appendChild(createElementLi);
    });
}
//Traer progreso
const getUsersProgress = (Student) => {
    fetch(progressOfUsersOfLim2018_03_precore_pw, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((progressStudents) => {
            let progressUser = progressStudents[Student.id];
            deagregateTypes(progressUser);
            showStudentInfo(Student.name);
        })
};

const deagregateTypes = (progressUser) => {
    let intro = progressUser['intro'];
    let percentCohortStudent = "";
    //contadores quizzes
    let quizCounter = 0;
    let completedQuizCounter = 0;
    let quizAccumulatedScore = 0;
    //contadores read
    let readCounter = 0;
    let completedReadCounter = 0;
    //contadores exercises
    let exercisesCounter = 0;
    let completedExercisesCounter = 0;

    try {
        //recorremos las unidades
        for (unitKey in intro.units) {
            let unit = intro.units[unitKey];
            percentCohortStudent = intro.percent;
            //console.log('percent ' + percentCohortStudent)
            for (partKey in unit.parts) {
                let part = unit.parts[partKey];
                let type = part.type;

                    //Datos de Quiz
                    if (type === 'quiz') {
                        quizCounter++;
                        if (part.completed === 1) {
                            completedQuizCounter++;
                            quizAccumulatedScore += part.score;
                        }
                    }

                    //Datos de read
                    if (type === 'read') {
                        readCounter++;
                        if (part.completed === 1) {
                            completedReadCounter++;
                        }
                    }

                    //Datos de exercises
                    for (exercisesKey in part.exercises) {
                        let exercise = part.exercises[exercisesKey];
                    if (type === 'practice') {
                        exercisesCounter++;
                        if (exercise.completed === 1) {
                            completedExercisesCounter += exercise.completed;
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.log('Error')
    }
    //console.log('percent ' + percentCohortStudent);
    printData(percentCohortStudent, quizCounter, completedQuizCounter, quizAccumulatedScore, readCounter, completedReadCounter, exercisesCounter, completedExercisesCounter);

};


const reverseGeneral = (users) => {
  users.sort((a, b) => {
    var x = a.stats.percent;
    var y = b.stats.percent;
    if (x < y) { return 1; }
    if (x > y) { return -1; }
    return 0;
  });
} 
