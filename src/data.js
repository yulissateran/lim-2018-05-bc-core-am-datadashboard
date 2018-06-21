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
            prueba.classList.remove('hidden');
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
                //Datos de Quiz
                if (type === 'quiz') {
                    quizCounter++;
                    if (part.completed === 1) {
                        completedQuizCounter++;
                        quizAccumulatedScore = quizAccumulatedScore + part.score;
                    }
                }
                //Datos de exercises
                if (type === 'practice') {
                    exercisesCounter++;
                    if (part.completed === 1) {
                        completedExercisesCounter = completedExercisesCounter + part.completed;
                    }
                }
                //Datos de read
                if (type === 'read') {
                    readCounter++;
                    if (part.completed === 1) {
                        completedReadCounter++;
                    }
                }
                //Imprimiendo datos de Read
                readCounterCohort.innerHTML = "";
                completedReadStudent.innerHTML = "";
                percentReadStudent.innerHTML = "";
                let liReadCounter = document.createElement('li');
                let licompletedRead = document.createElement('li');
                let lipercentRead = document.createElement('li');
                liReadCounter.innerHTML = readCounter;
                readCounterCohort.appendChild(liReadCounter);
                licompletedRead.innerHTML = completedReadCounter;
                completedReadStudent.appendChild(licompletedRead);
                lipercentRead.innerHTML = (completedReadCounter / readCounter) * 100;
                percentReadStudent.appendChild(lipercentRead);
                //Imprimiendo datos de Exercises
                exercisesCounterCohort.innerHTML = "";
                completedExercisesStudent.innerHTML = "";
                percentExercisesStudent.innerHTML = "";
                let liExercisesCounter = document.createElement('li');
                let licompletedExercises = document.createElement('li');
                let lipercentExercises = document.createElement('li');
                liExercisesCounter.innerHTML = exercisesCounter;
                exercisesCounterCohort.appendChild(liExercisesCounter);
                licompletedExercises.innerHTML = completedExercisesCounter;
                completedExercisesStudent.appendChild(licompletedExercises);
                lipercentExercises.innerHTML = (completedExercisesCounter / exercisesCounter) * 100;
                percentExercisesStudent.appendChild(lipercentExercises);
                //Imprimiendo datos de Quiz
                quizCounterCohort.innerHTML = "";
                completedQuizStudent.innerHTML = "";
                quizScoreStudent.innerHTML = "";
                percentScoreStudent.innerHTML = "";
                let liQuizCounter = document.createElement('li');
                let liCompletedQuiz = document.createElement('li');
                let liQuizScore = document.createElement('li');
                let liPercentScore = document.createElement('li');
                liQuizCounter.innerHTML = quizCounter;
                quizCounterCohort.appendChild(liQuizCounter);
                liCompletedQuiz.innerHTML = completedQuizCounter;
                completedQuizStudent.appendChild(liCompletedQuiz);
                liQuizScore.innerHTML = quizAccumulatedScore;
                quizScoreStudent.appendChild(liQuizScore);
                liPercentScore.innerHTML = (quizAccumulatedScore / quizCounter);
                percentScoreStudent.appendChild(liPercentScore);
                
            }
        } 
    } catch (error) {
        console.log('Data Incompleta');
    }
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
            paintUsersCohort(arrayNameUser);
        })
};

