const arrayOfFileOfData = ['../data/cohorts.json', '../data/cohorts/lim-2018-03-pre-core-pw/users.json', '../data/cohorts/lim-2018-03-pre-core-pw/progress.json']

let cohort = '';
let courses = '';
//Creando la lista de cohorts 
const getListOfCohorts = () => {
  fetch(arrayOfFileOfData[0], { method: 'GET' })
  .then((response) => response.json())
  .then((cohorts) => {
     cohort = cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    cohorts.forEach(cohort => selectorOfCohorts.innerHTML+=`<option>${cohort.id}</option>`)
  })
}
// Nombres de estudiantes por cohort
const getNameUsersOfCohort = () => {
  fetch(arrayOfFileOfData[1], { method: 'GET' })
    .then((response) => response.json())
    .then((users) => {
      fetch(arrayOfFileOfData[2], { method: 'GET' })         
      .then((response) =>  response.json())
      .then((progress) => {  
        const options = {
              cohort: cohort,
              cohortData:{
                  users: users,
                  progress:progress
              },
              orderBy:'name',
              orderDirection:'ASD',
              search:'Lizeth'
            }

processCohortData(options);      
       
      })
    })
  };

// const dataUsers = [
//   {
//     name: 'Guerrero',
//     goles: 30,
//   },
//   {
//     name: 'Flores',
//     goles: 15,
//   },
//   {
//     name: 'Carrillo',
//     goles: 4,
//   },
//   {
//     name: 'Carrillo',
//     goles: 8,
//   },
//   {
//     name: 'Farfán',
//     goles: 15,
//   },
//   {
//     name: 'Cueva',
//     goles: 16,
//   }
// ]

// // filtrar usuarios

// const search = () => {
//   const nuevoUsers = dataUsers.filter((user) => {
//     return user.goles > 10
//   });
//   return nuevoUsers.forEach((user)=>{
//     console.log(user.name)
//   })
// }

// search();

// const perros = [
//   {
//     name: 'shiro',
//     edad: 13,
//   },
//   {
//     name: 'boby',
//     edad: 12,
//   }
// ];

// const dataComidas = {
//   shiro: {
//     comida: 'ricocan',
//     precio: 10
//   },
//   boby: {
//     comida: 'mimaskot',
//     precio: 19
//   }
// }

// const keyDataComidas = Object.keys(dataComidas);
// // console.log(keyDataComidas)

// for (const perro of perros) {
//   // console.log(perro)
//   for (const namePerro of keyDataComidas) {
//     if (perro.name === namePerro) {
//       // console.log(dataComidas[namePerro].comida);
//       perro['alimentación' ]= (dataComidas[namePerro]);
      
//     }
//   }
//  }  // console.log(perros);
