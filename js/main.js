"use strict"

let myObject;
let beersServed = 0;
let lastIdCounted = 0;


document.addEventListener("DOMContentLoaded", loadScript);

function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

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
    showBartenders();

    // //03 Number of people served
    // document.querySelector(".waiting").textContent = `People in line ${myObject.queue.length}`;

    // //04 Getting a number of beers served in total
    // myObject.serving.forEach(customer => {
    //     if (customer.id > lastIdCounted) {
    //         beersServed += customer.order.length;
    //         lastIdCounted = customer.id;
    //     }
    // });
    // document.querySelector(".beers-served").textContent = `Served beers: ${beersServed}`;

    // //05. Getting a number of people served now
    // //console.log(myObject.serving);
    // document.querySelector(".people-served").textContent = `People getting served: ${myObject.serving.length}`;

}



//02 Create Bartenders Function
function showBartenders() {

    //cleaning the the place of the clone
    document.querySelector(".bartenders").innerHTML = "";

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender => {

        //define the bartenders template
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;

        //define the bartendersClone
        let bartendersClone = bartendersTemplate.cloneNode(true);

        //getting the names of the bartenders
        bartendersClone.querySelector(".bartender_name").textContent = `Bartender\'s name: ${bartender.name}`;

        //bartender's status of work
        if (bartender.status == "WORKING") {
            bartendersClone.querySelector(".bartender_status").textContent = "Working";
            bartendersClone.querySelector(".bartender_status").style.color = "green";
        } else {
            bartendersClone.querySelector(".bartender_status").textContent = "Getting ready";
            bartendersClone.querySelector(".bartender_status").style.color = "red";
        }

        //bartender´s status detail
        if (bartender.statusDetail == "pourBeer") {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Pours Beer`;
        } else if (bartender.statusDetail == "startServing") {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Starts Serving`;
        } else if (bartender.statusDetail == "receivePayment") {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Receives Payment`;
        } else if (bartender.statusDetail == "releaseTap") {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Releases Tap`;
        } else if (bartender.statusDetail == "reserveTap") {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Reserves Tap`;
        } else {
            bartendersClone.querySelector(".bartender_status_detail").textContent = `This bartender: Is waiting`;
        }

        //append clone in the div .bartenders
        document.querySelector(".bartenders").appendChild(bartendersClone);

    })
}; //Bartenders function end


// RELOAD all 3 sec for development, for presentation set to 10 sec
setInterval(function () {
    loadScript();
}, 2000);