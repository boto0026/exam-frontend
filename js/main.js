"use strict"

let myObject;

document.addEventListener("DOMContentLoaded", loadScript);

function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

    //01 Project Name and Opening Hours
    // Closing Time
    // Current Time

    //02 Call Bartender's Function

    //03 Number of people served

    // RELOAD all 3 sec for development, for presentation set to 10 sec
    setInterval(function () {
        loadScript();
    }, 2000)
}