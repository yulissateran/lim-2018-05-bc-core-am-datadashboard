let dataUsers= new XMLHttpRequest();
dataUsers.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/users.json")
dataUsers.onload = function() {
    if (dataUsers.status >= 200 && dataUsers.status < 400) {
      // Success!
      let dataU = JSON.parse(dataUsers.responseText);
      console.log(dataU);
    } else {
      // We reached our target server, but it returned an error
  
    }
    
  };
  dataUsers.send();
  console.log(dataUsers);


let dataProgress= new XMLHttpRequest();
dataProgress.open("GET", "/data/cohorts/lim-2018-03-pre-core-pw/progress.json")
dataProgress.onload = function() {
    if (dataProgress.status >= 200 && dataProgress.status < 400) {
      // Success!
      let dataP = JSON.parse(dataProgress.responseText);
      console.log(dataP);
    } else {
      // We reached our target server, but it returned an error
  
    }
    
  };
  dataProgress.send();
  console.log(dataProgress);


let dataGlobal= new XMLHttpRequest();
dataGlobal.open("GET", "/data/cohorts.json")
dataGlobal.onload = function() {
    if (dataGlobal.status >= 200 && dataGlobal.status < 400) {
      // Success!
      let dataG = JSON.parse(dataGlobal.responseText);
      console.log(dataG);
    } else {
      // We reached our target server, but it returned an error
  
    }
    
  };
  dataGlobal.send();
  console.log(dataGlobal);