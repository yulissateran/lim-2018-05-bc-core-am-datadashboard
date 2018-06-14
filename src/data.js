//Declarando variables
let enterName = document.getElementById('enter-name');
const cohortLima = document.getElementById('cohort-Lima');
const getUsersEndpoints = '/data/cohorts/lim-2018-03-pre-core-pw/users.json';
const getUsersProgressEndpoint = '/data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const getUsersGlobalEndpoint = '/data/cohorts.json';
const resultUsers = document.getElementById('response-container');
const prueba = document.getElementById('prueba');

//Creando la lista de cohorts 
const getCohorts = () => {
    fetch(getUsersGlobalEndpoint, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((dataCohorts) => {
            dataCohorts.forEach(cohort => {
                let listIdCohorts = document.createElement('option');
                listIdCohorts.value = cohort.id;
                listIdCohorts.innerText = cohort.id;
                selector.appendChild(listIdCohorts);
            })
        })
}

// Filtrando estudiantes por cohort
const getUsers = (signupCohort) => {
    let filterUsers = [];
    fetch(getUsersEndpoints, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((users) => {
            users.forEach(user => {
                if (user.signupCohort === signupCohort) {
                    filterUsers.push(user);
                }
            });
            listUsers(filterUsers);
        })
};
//crea la ista de usuarias del cohort y le da un enlace hacia progres
const listUsers = (lstUsers) => {
    resultUsers.innerHTML = '';
    lstUsers.forEach(user => {
        let liUser = document.createElement('li');
        let aUser = document.createElement('a');
        aUser.innerHTML = user.name,
        aUser.setAttribute('href', 'javascript;');
        aUser.addEventListener('click', (e)=>{
            e.preventDefault();
            getUsersProgress(user.id);
        });
        liUser.appendChild(aUser);
        resultUsers.appendChild(liUser);
    });
}

//Traer progreso
const getUsersProgress = (idUser) => {
    let filterUsersProgress = [];
    fetch(getUsersProgressEndpoint, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((progressUsers) => {
            let progressUser = progressUsers[idUser];
            console.log(progressUser);
        })
};

//Buscar estudiantes por nombre
const FilterUsers = (users) => {
    let filterUsersName = [];
    fetch(getUsersEndpoints, { method: 'GET' })
        .then((response) => {
            if (response.status !== 200) {
                alert('Error')
            }
            return response.json();
        })
        .then((requestusers) => {
            requestusers.forEach(user => { // recorrer la data
                if (user.name === users) {
                    filterUsersName.push(user); //adicionar elemento al array
                }
            });
            listUsers(filterUsersName);
        })
};



