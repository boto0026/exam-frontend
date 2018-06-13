"use strict"

let myObject;

document.addEventListener("DOMContentLoaded", loadScript);

function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

// RELOAD all 3 sec for development, for presentation set to 10 sec
setInterval(function () {
    loadScript();
}, 2000)}
