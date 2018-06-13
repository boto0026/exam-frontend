"use strict";

let myObject;
//const tapsTemplate = document.querySelector("#tapsTemplate").content;


window.addEventListener("DOMContentLoaded", loadScript);

//getting the data from the script
function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);

    //01 Project Name and Opening Hours
    document.querySelector(".project-name").textContent = `${myObject.bar.name}`;
    // Closing Time
    document.querySelector(".closing-time").textContent = ` ${myObject.bar.closingTime}`;
    // Current Time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    document.querySelector(".current-time").textContent = ` ` + hours + ":" + minutes;

    //02 Call Bartender's Function
    //call functions
    showBartenders();

    //03 Number of people served

    //04 Getting a number of beers served in total

    //05. Getting a number of people served now


};


//02 Bartenders name, status and status detail
function showBartenders() {
    //console.log("bartenders", myObject.bartenders);
    //clean the container of bartenders
    document.querySelector(".box4").innerHTML = "";

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender => {
        //console.log("bartender", bartender.name);

        //define the bartenders template
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;

        //define the bartenders clone 
        let bartendersClone = bartendersTemplate.cloneNode(true);
        //getting the names of the bartenders
        bartendersClone.querySelector(".bartender_name").textContent = ` ${bartender.name}`;
        //bartender´s status of work
        if (bartender.status == "WORKING") {
            bartendersClone.querySelector(".bartender_status").textContent = " Working";
            bartendersClone.querySelector(".bartender_status").style.backgroundColor = "green";
        } else {
            bartendersClone.querySelector(".bartender_status").textContent = " Getting Ready";
            bartendersClone.querySelector(".bartender_status").style.backgroundColor = "orange";
        }

        //bartender´s precise activity
        if (bartender.statusDetail == "pourBeer") {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Pours Beer`;
        } else if (bartender.statusDetail == "startServing") {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Starts Serving`;
        } else if (bartender.statusDetail == "receivePayment") {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Receives Payment`;
        } else if (bartender.statusDetail == "releaseTap") {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Releases Tap`;
        } else if (bartender.statusDetail == "reserveTap") {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Reserves Tap`;
        } else {
            bartendersClone.querySelector(".bartender_activity").textContent = ` Is waiting`;
        }

        //append clone in the div .bartenders
        document.querySelector(".box4").appendChild(bartendersClone);
    })

}

//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 3000);