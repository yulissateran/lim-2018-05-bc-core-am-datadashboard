const validatorPromQuizes =(a,b)=>{
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
              user.stats.quizzes['scoreAvg'] = Math.round(validatorPromQuizes(quizzScoreSum,quizzCompleted));
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
              user.stats.quizzes['scoreSum']= 0;
              user.stats.quizzes['scoreAvg']=0;
              user.stats['percent'] = 0;
              user.stats['exercises'] = {};
              user.stats.exercises['total'] = 0;
              user.stats.exercises['completed'] = 0;
              user.stats.exercises['percent'] = 0;
            }
            scoreOfCohortInExercises += user.stats.exercises.percent;
            console.log(quizzScoreSum);
            console.log(quizzCompleted );
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


window.sortUsers = (users,orderBy,orderDirection)=>{
  sort(users,orderBy,orderDirection);
  // const arraydeestudiantes=[]
  // users.sort( sortAlphabetic(users,users))
    for (const user of users) {
      if (user.role === 'student') {
        let divUser = document.createElement('div').
       
        divUser +=  `
                <h3>${user.name}</h3>
                <ul>
                  <li>ejercicios: ${user.stats.exercises.percent}</li> 
                  <li>lecturas: ${user.stats.reads.percent}</li> 
                  <li>quizzes: ${user.stats.quizzes.percent}</li>
                  <li>promedio de quizzes: ${user.stats.quizzes.scoreAvg}</li>
                  <li>completitud total: ${user.stats.percent}</li>
                </ul>`
              divUser+=classList.add("profile-user");
              containerDataUsers.appenChild(divUser)
      };

    }}

  const sort =(users,orderBy, orderDirection)=>{
    users.sort((a, b) => {
      let x ='';
      let y='';
      const asd = (x,y)=>{
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;}
      const des =(x,y)=>{
        if (x < y) { return 1; }
        if (x > y) { return -1; }
        return 0;
      }
      if(orderBy === 'name'){
        x = a.name.toLowerCase();
        y = b.name.toLowerCase();
        if(orderDirection ==='asd'){
         return asd(x,y);
        }else if(orderDirection==='des'){
         return des(x,y);
        }
      }
      else if(orderBy === 'percent'){  
       x = a.stats.percent;
       y = b.stats.percent;
        if(orderDirection==='asd'){
          return asd(x,y);
        }else if(orderDirection==='des'){
          return des(x,y);
        }}
      else if(orderBy === 'exercises'){
        x= a.stats.exercises.percent;
        y=b.stats.exercises.percent;
        if(orderDirection==='asd'){
          return asd(x,y);
        }else if(orderDirection==='des'){
          return des(x,y);
        }}
      else if(orderBy === 'quizzes'){
        x=a.stats.quizzes.percent;
        y = b.stats.quizzes.percent;
        if(orderDirection==='asd'){
          return asd(x,y);
        }else if(orderDirection==='des'){
          return des(x,y);
        }}
      else if(orderBy === 'prom-quizzes'){
        x= a.stats.quizzes.scoreAvg;
        y= b.stats.quizzes.scoreAvg;
        if(orderDirection==='asd'){
          return asd(x,y);
        }else if(orderDirection==='des'){
          return des(x,y);
        }}
      else if(orderBy === 'lecturas'){
        x =a.stats.reads.percent;
        y =b.stats.reads.percent;
        
        if(orderDirection==='asd'){
          return asd(x,y);
        }else if(orderDirection==='des'){
          return des(x,y);
        }}
    })
  }
 
  
