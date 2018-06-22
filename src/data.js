window.data = {
  computeUsersStats(users, progress, courses) {
    const usersWithStats = users;
    const keysProgress = Object.keys(progress);
    let scoreOfCohort =0;
    let promedioPercentOfQuizzs='';

    let studentQuantiti = 0;
   try{ 
      for (const user of usersWithStats){
       for(const id of keysProgress){
          if(user.id === id && user.role === 'student'){
            let quizzsTotal = 0;
            let quizzCompleted = 0;
            let readsTotals = 0;
            let readsCompleted = 0;
            studentQuantiti++
            if(Object.entries(progress[id]).length !== 0){
              const unitsOfCourses = progress[id][courses].units;  // console.log(unitsOfCourses)
              for (unit in unitsOfCourses) {
               
                let partsOfUnit = unitsOfCourses[unit].parts;       //console.log(partsOfUnit)
                for (part in partsOfUnit) {
                  let propertysOfTheParts = partsOfUnit[part]; //console.log(propertysOfTheParts.completed)
                  let type = propertysOfTheParts.type;              //console.log(type)
                  if (type === 'quiz' ) {
                    quizzsTotal++
                    if (propertysOfTheParts.completed === 1) { quizzCompleted++ }
                  }
                  //  if (type === 'practice') {  // console.log(propertysOfTheParts.completed);
                  //  if (propertysOfTheParts.completed === 1) { } }
                    if (type === 'read' ) {
                      readsTotals++
                      if (propertysOfTheParts.completed === 1) { readsCompleted++ }
                 }
               }
             } 
             user['stats'] = {};
             user.stats['reads'] = {};
              user.stats.reads['total'] = readsTotals;
              user.stats.reads['completed'] = readsCompleted;
              user.stats.reads['percent'] = (readsCompleted / readsTotals)*100;
             user.stats['quizzes'] = {};
              user.stats.quizzes['total'] = quizzsTotal;
              user.stats.quizzes['completed'] = quizzCompleted;
              user.stats.quizzes['percent'] = (quizzCompleted / quizzsTotal)*100;
             user.stats['percent'] = progress[id][courses]['percent'];
             user.stats['exercises'] = {};
              user.stats.exercises['total'] = (Object.keys(unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises'])).length;
              user.stats.exercises['completed'] = unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['01-coin-convert']['completed'] +
                unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['exercises']['02-restaurant-bill']['completed'];
              user.stats.exercises['percent'] = ((unitsOfCourses['02-variables-and-data-types']['parts']['06-exercises']['completed']) * 100);


            // user.stats['reads']= progress[id][courses]['percent'];
            } else if (Object.entries(progress[id]).length === 0){
                  
             // console.log(user)
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
            scoreOfCohort += user.stats.exercises.percent;
          } 
         
        }
      }
      console.log(usersWithStats.length);
      console.log(studentQuantiti);
     console.log(scoreOfCohort /usersWithStats.length);
     console.log(scoreOfCohort / studentQuantiti);
     
     promedioPercentOfQuizzs = scoreOfCohort / studentQuantiti;
     containerOfPercentGeneral = document.getElementById('container-of-percent-general');
     containerOfPercentGeneral.innerHTML = 'porcentaje general de ejercicios:   ' + promedioPercentOfQuizzs;
      //  console.log(scoreOfCohort);
     console.log(promedioPercentOfQuizzs) 
    }catch(err){console.log(err.message) }
    console.log(usersWithStats)
    return usersWithStats; 
  },
  dato() { }
}

