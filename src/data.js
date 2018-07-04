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
     for(const course of courses){
      for (const user of usersWithStats){
        for(const id of keysProgress){
          if(user.id === id){
            let quizzsTotal = 0;
            let quizzCompleted = 0;
            let quizzScoreSum = 0;
            let readsTotals = 0;
            let readsCompleted = 0;
            studentQuantiti++
          
              if (Object.entries(progress[id]).length !== 0 && course === Object.keys(progress[id])){
              console.log(Object.keys(progress[id]));
              console.log(user);
              const unitsOfCourses = progress[id][course].units;
              // console.log(progress[id][course]);  // console.log(unitsOfCourses)
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
              user.stats['percent'] = progress[id][course]['percent'];
              user.stats['exercises'] = {};
              user.stats.exercises['total'] = (Object.keys(unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
              user.stats.exercises['completed'] = unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] +
                unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'];
              user.stats.exercises['percent'] = Math.round(((unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['completed']) * 100));
            } else{
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
    }
    promedioPercentOfExercises = scoreOfCohortInExercises / studentQuantiti;
    }catch(err){console.log(err.message) ;}  
    console.log(usersWithStats);
    return usersWithStats; 
  }


window.sortUsers = (users,orderBy,orderDirection)=>{
  
    users.sort((a, b) => {
      let x = '';
      let y = '';
      const asd = (x, y) => {
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;}
      const des = (x, y) => {
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;}  
    if (orderDirection === 'ASC') {
      if(orderBy === 'name'){
         x = a.name.toLowerCase();
         y = b.name.toLowerCase();
        return asd(x,y);
       
      }
      if(orderBy==='percent'){
         x = a.stats.percent;
         y = b.stats.percent;
        return asd(x,y)
      }
      if (orderBy ==='exercises') { 
        x = a.stats.exercises.completed;
        y = b.stats.exercises.completed;
        return asd(x, y)
      }
      if (orderBy === 'quizzes') {
        x = a.stats.quizzes.completed;
        y = b.stats.quizzes.completed;
        return asd(x, y) 
       }
      if (orderBy === 'quizzes-avg') { 
        x = a.stats.quizzes.scoreAvg;
        y = b.stats.quizzes.scoreAvg;
        return asd(x, y)
      }
      if (orderBy === 'reads') { 
        x = a.stats.reads.completed;
        y = b.stats.reads.completed;
        return asd(x, y)
      }    
   }else if(orderDirection ==='DES'){
      if (orderBy === 'name') {
        x = a.name.toLowerCase();
        y = b.name.toLowerCase();
        return des (x, y);
      }
      if (orderBy === 'percent') {
        x = a.stats.percent;
        y = b.stats.percent;
        return des(x, y)
      }
      if (orderBy === 'exercises') { 
        x = a.stats.exercises.completed;
        y = b.stats.exercises.completed;
        return des(x, y)
      }
      if (orderBy === 'quizzes') { 
        x = a.stats.quizzes.completed;
        y = b.stats.quizzes.completed;
        return des(x, y)
      }
      if (orderBy === 'quizzes-avg') {
        x = a.stats.quizzes.scoreAvg;
        y = b.stats.quizzes.scoreAvg;
        return des(x, y)
      }
      if (orderBy === 'reads') {
        x = a.stats.reads.completed;
        y = b.stats.reads.completed;
        return des(x, y)
       }
        } 
    return users;
  })  
return users
}
//Buscar estudiantes por nombre
window.filterUsers = (users, search) => {
  let usersFiltered = [];
  users.forEach(userWithStats => {
    let x = userWithStats.name;
    y = x.toLowerCase();
    if (y.includes(search)) {
      usersFiltered.push(userWithStats);
    }
  });
  return usersFiltered;
}
  window.processCohortData =(options) =>{
    console.log(options)
    const users = options.cohortData.users;
    const progress = options.cohortData.progress;
    const courses = Object.keys(options.cohort.coursesIndex);
    console.log(courses);
    const orderBy = options.orderBy;
    const orderDirection = options.orderDirection;
    const search = options.search;
    let students = computeUsersStats(users,progress,courses); //Array con los usuarios de ese cohort
    students = sortUsers(students,orderBy,orderDirection);//Array ordenado
    if(search !== ''){
     students = filterUsers(students,search);
     console.log(students);
     console.log('hola'); 
    };
    console.log(students)
     return students;
  }




