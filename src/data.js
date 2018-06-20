//Declarando variables 
const CohortsOfLaboratoria = '../data/cohorts.json';
const cohortLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressOfUsersOfLim2018_03_precore_pw = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

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
            getUsersProgress(user.id);
        });
        createElementLi.appendChild(createElement_A);
        containerListUsers.appendChild(createElementLi);
    });
}
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
            let progressUser = progressStudents[idStudent];
            deagregateTypes(progressUser);
        })
};

const deagregateTypes = (progressUser) => {
    let intro = progressUser['intro'];
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
            for (partKey in unit.parts) {
                let part = unit.parts[partKey];
                let type = part.type;
                if (type === 'quiz') {
                    quizCounter++;
                    if (part.completed === 1) {
                        completedQuizCounter++;
                        quizAccumulatedScore = quizAccumulatedScore+part.score;
                    }
                } 

                if (type === 'practice') {
                    exercisesCounter++;
                    if (part.completed === 1) {
                        completedExercisesCounter++;
                    }
                }

                if (type === 'read') {
                    readCounter++;
                    if (part.completed === 1) {
                        completedReadCounter++;
                    }
                }

            }
        }        
    } catch (error) {
        console.log('Data Incompleta');
    }
    console.log('Datos de Lectura');
    console.log('# total de lecturas presentes en el cohort: ' + readCounter);
    console.log('# de lecturas completadas por el usuario: ' + completedReadCounter);
    console.log('% de lecturas completadas: ' + (completedReadCounter/readCounter)*100);
    console.log('Datos de Ejercicios');
    console.log('# total de ejercicios autocorregidos en el cohort: ' + exercisesCounter);
    console.log('# de ejercicios autocorregidos completadas por el usuario: ' + completedExercisesCounter);
    console.log('% de ejercicios autocorregidos completadas: ' + (completedExercisesCounter/exercisesCounter)*100);
    console.log('Datos de Quiz');
    console.log('# total de quizzes en cursos del cohort: ' + quizCounter);
    console.log('# de quizzes completadas por el usuario: ' + completedQuizCounter);
    console.log('Suma de score de los quizzes completados: ' + quizAccumulatedScore);
    console.log('Promedio de puntuaciones en quizzes completados: ' + (quizAccumulatedScore));

};

const createContainerForScore = (scoreForStudent) => {
    containerListProgress.innerHTML = "";
    let createElement_Li = document.createElement('li');
    createElement_Li.innerText = scoreForStudent;
    let createElementP = document.createElement('p');
    createElementP.innerText = "Porcentaje de completidud de todos los cursos";
    containerListProgress.appendChild(createElementP);
    containerListProgress.appendChild(createElement_Li);

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

