"use strict"

let myObject;

document.addEventListener("DOMContentLoaded", loadScript);

function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

    //01 Project Name and Opening Hours
    // Closing Time
    document.querySelector(".project-name").textContent = `${myObject.bar.name}`;
    // Current Time

    //02 Call Bartender's Function

    //03 Number of people served

    //04 Getting a number of beers served in total

    //05. Getting a number of people served now

    // RELOAD all 3 sec for development, for presentation set to 10 sec
    setInterval(function () {
        loadScript();
    }, 2000)
}