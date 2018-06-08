/*const requestUsers = new XMLHttpRequest();
requestUsers.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/users.json")
requestUsers.onload = function () {
    if (requestUsers.status >= 200 && requestUsers.status < 400) {
        // Success!
        const dataUsers = JSON.parse(requestUsers.responseText);
        console.log(dataUsers);
        //console.log(`${dataUsers.id} empezó : ${dataUsers.start}`);
    } else {
        // We reached our target server, but it returned an error

    }

};
requestUsers.send();
console.log(requestUsers); */

const prueba = () => {
    if (requestUsers.status >= 200 && requestUsers.status < 400) {
        // Success!
        const dataUsers = JSON.parse(requestUsers.responseText);
        console.log(dataUsers);
        //console.log(`${dataUsers.id} empezó : ${dataUsers.start}`);
    } else {
        // We reached our target server, but it returned an error

    }

};
const requestUsers = new XMLHttpRequest();
requestUsers.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/users.json")
requestUsers.onload = prueba;
requestUsers.send();
console.log(requestUsers);


const requestProgress = new XMLHttpRequest();
requestProgress.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/progress.json")
requestProgress.onload = function () {
    if (requestProgress.status >= 200 && requestProgress.status < 400) {
        // Success!
        const dataProgress = JSON.parse(requestProgress.responseText);
        console.log(dataProgress);
    } else {
        // We reached our target server, but it returned an error

    }

};
requestProgress.send();
console.log(requestProgress);


const requestGlobal = new XMLHttpRequest();
requestGlobal.open("GET", "/data/cohorts.json")
requestGlobal.onload = function () {
    if (requestGlobal.status >= 200 && requestGlobal.status < 400) {
        // Success!
        const dataGlobal = JSON.parse(requestGlobal.responseText);
        console.log(dataGlobal);
    } else {
        // We reached our target server, but it returned an error

    }

};
requestGlobal.send();
console.log(requestGlobal);
