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
