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
            paintUsersCohort(arrayNameUser);
        })
};

