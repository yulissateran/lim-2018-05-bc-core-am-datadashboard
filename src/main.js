

// // Informacion de la API
// const url = 'https://api.datamuse.com/words';
// const queryParams = '?sl=';

// // Selectore de elementos html
// const inputField = document.querySelector('#input');
// const submit = document.querySelector('#submit');
// const responseField = document.querySelector('#responseField');

// // AJAX función
// const getSuggestions = () => {
//     const wordQuery = inputField.value;
//     const endpoint = `${url}${queryParams}${wordQuery}`;

//     fetch(endpoint)
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Request failed!');
//     }, networkError => {
//         console.log(networkError.message)
//     }).then(jsonResponse => {
//         procesandorespuesta(jsonResponse);
//     })
// }

// //borra los resultados anteriores y muestra los resultados en la página web
// const displaySuggestions = (event) => {
//     event.preventDefault();
//     while (responseField.firstChild) {
//         responseField.removeChild(responseField.firstChild);
//     }
//     getSuggestions();
// };

// submit.addEventListener('click', displaySuggestions);










// // Formatea la respuesta para que se vea presentable en la página web 
// const procesandorespuesta = (res) => {
//     if (!res) { console.log(res.status); }// Maneja si res es falsey
//     if (!res.length) 
//     { responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
//         return;
//     }

//     // Crea una matriz vacía para contener las cadenas de HTML
//     let wordList = [];
//     // Pasa por la respuesta y termina a los 10
//     for (let i = 0; i < Math.min(res.length, 10); i++) {
//         // creando una lista de palabras
//         wordList.push(`<li>${res[i].word}</li>`);
//     }
//     // Une la matriz de cadenas HTML en una cadena
//     wordList = wordList.join("");

//     // Manipula responseField para representar la respuesta modificada
//     responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
//     return
// }

// // Representa la respuesta antes de que se modifique
// const procesandorespuestaenbruto = (res) => {// Toma las primeras 10 palabras de res
//     let trimmedResponse = res.slice(0, 10);//Manipula responseField para representar la respuesta sin formato
//     responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
// }

// // Representa el JSON que se devolvió cuando se resuelve Promise from fetch.
// const procesandorespuestajson = (res) => {
//     let rawJson = {};// Crea un objeto vacío para almacenar el JSON en pares clave - valor
//     for (let key in response) {
//         rawJson[key] = response[key];
//     }// Convierte JSON en una cadena y agrega saltos de línea para que sea más fácil de leer
//     rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
//     // Manipula responseField para mostrar el JSON devuelto.
//     responseField.innerHTML = `<pre>${rawJson}</pre>`;
// }