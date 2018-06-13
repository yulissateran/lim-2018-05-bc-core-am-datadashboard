

let usuariasDelCohort = "/data/cohorts/lim-2018-03-pre-core-pw/users.json";
const progresoDeUsuarias = "/data/cohorts/lim-2018-03-pre-core-pw/progress.json"
const listaDeCohorts = "/data/cohorts.json";

let usuarias ="";
let method= "GET";
let traerDatos = ()=>{ 
  fetch(usuariasDelCohort)
  .then((response) => response.json())
  .then((data) => data)
  .catch((err)=> {
  console.log(err.message)
  });

};
document.getElementById('SalidadeDatos').innerHTML = traerDatos();
// console.log(traerDatos(usuariasDelCohort));
document.getElementById('plasmarDatos').addEventListener('click', traerDatos(usuariasDelCohort));

// const traerprogreso = () => {
//   fetch(progresoDeUsuarias)
//     .then((response) => response.json())
//     .then((progres) => {
//       console.log(progres);
//     }).catch((err) => {
//       console.log(err.message);
//     });
// };
// document.getElementById('plasmarProgreso').addEventListener('click', traerprogreso()); 

// const traercohorts = () => {
//   fetch(listaDeCohorts)
//     .then((response) => response.json())
//     .then((cohorts) => {
//       //  procesandorespuesta(data);
//       //  arreglo.push(data);
//       // console.log(progres["00hJv4mzvqM3D9kBy3dfxoJyFV82"]);
//       console.log(JSON.stringify(cohorts));
//       console.log(cohorts[0]);
//     }).catch((err) => {
//       console.log(err.message);
//     });
// };

// document.getElementById('plasmarProgreso').addEventListener('click', traercohorts()); 
// fetch('https://api-to-call.com/endpoint')
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error('Request failed!');
//   }, networkError => console.log(networkError.message)
//   ).then(jsonResponse => {
//     return jsonResponse;
//   });