const pintarStudents=(users)=>{
    for (const user of users) {
  if (user.role === 'student') {
   
    let div = document.createElement('div');  
    let name = document.createElement('h3');
    let list = document.createElement('ul');
    let exercises = document.createElement('li');
    let reads = document.createElement('li');
    let quizzes = document.createElement('li');
    let average = document.createElement('li');
    let percent = document.createElement('li');
    name.innerHTML =user.name;
    exercises.innerHTML = `Ejercicios: ${user.stats.exercises.percent}`
    reads.innerHTML = `Lecturas: ${user.stats.reads.percent}`
    quizzes.innerHTML = `Quizzes: ${user.stats.quizzes.percent}`
    average.innerHTML = `Promedio/quizzes: ${user.stats.quizzes.scoreAvg}`
    percent.innerHTML = `Porcentaje total: ${user.stats.percent}` 
    div.appendChild(name);
    list.appendChild(exercises);
    list.appendChild(reads);
    list.appendChild(quizzes);
    list.appendChild(average);
    list.appendChild(percent);
    div.appendChild(list);
    tablePercentUser.appendChild(div);
    div.classList.add('div-user');
    // list.clasList.add('ul-progress') 
    exercises.classList.add('li-progress');
    reads.classList.add('li-progress');
    quizzes.classList.add('li-progress');
    average.classList.add('li-progress');
    percent.classList.add('li-progress');
  };
  };
  
  return users}
  const validatorPromQuizzes =(a,b)=>{
    if(a !==0 && b !== 0){
      return a/b;
    }else{return 0;}
  }
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
                user.stats.quizzes['scoreAvg'] = Math.round(validatorPromQuizzes(quizzScoreSum,quizzCompleted));
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
                user.stats.quizzes['scoreSum']=0;
                user.stats.quizzes['scoreAvg']=0;
                user.stats['percent'] = 0;
                user.stats['exercises'] = {};
                user.stats.exercises['total'] = 0;
                user.stats.exercises['completed'] = 0;
                user.stats.exercises['percent'] = 0;
              }
              scoreOfCohortInExercises += user.stats.exercises.percent;
            } 
           }
        }
      promedioPercentOfExercises = scoreOfCohortInExercises / studentQuantiti;
      }catch(err){console.log(err.message) }
      //console.log(usersWithStats)
      
      return usersWithStats; 
    }
  
  
  window.sortUsers = (users,orderBy,orderDirection)=>{

    let sortUsers = users;
    if (orderBy === 'name') {
        sortUsers.sort((a, b) => {
            x = a.name.toLowerCase(), y = b.name.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
        });
    }
    if (orderBy === 'completitud') {
        sortUsers.sort((a, b) => {
            return a.stats.percent - b.stats.percent;
        });
    }
    if (orderBy === 'ejercicios') {
        sortUsers.sort((a, b) => {
            return a.stats.exercises.completed - b.stats.exercises.completed;
        });
    }
    if (orderBy === 'quizzes') {
        sortUsers.sort((a, b) => {
            return  a.stats.quizzes.completed - b.stats.quizzes.completed;
        });
    }
    if (orderBy === 'prom-quizzes') {
        sortUsers.sort((a, b) => {
            return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg;
        });
    }

    if (orderBy === 'lecturas') {
        sortUsers.sort((a, b) => {
            return a.stats.reads.completed - b.stats.reads.completed;
        });
    }

    if (orderDirection === 'DES') {
        sortUsers = sortUsers.reverse();

    }
    return sortUsers;
}
   
  //Buscar estudiantes por nombre
  window.filterUsers = (users,search) => {
    let usersFiltered = [];
    users.forEach(userWithStats => {
        if (userWithStats.name.includes(search)) {
            usersFiltered.push(userWithStats);
        }
    });
    return usersFiltered; 
  }
  
  
    window.processCohortData =(options) =>{
      const users = options.cohortData.users;
      const progress = options.cohortData.progress;
      const courses = Object.keys(options.cohort.coursesIndex);
      const orderBy = options.orderBy;
      const orderDirection = options.orderDirection;
      const search = options.search;
      let students = computeUsersStats(users,progress,courses); //Array con los usuarios de ese cohort
      //console.log('arreglo users'+students);
       students = sortUsers(students,orderBy,orderDirection);
      //console.log('ordenado'+students);
      if(search !== ''){
        students = filterUsers(students,search);
      //console.log('filtrado'+students);
      
      }
      //console.log('resultadofinal'+students)
      return  pintarStudents(students);
    }
  