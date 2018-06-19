"use strict"

let myObject;
let storageArray = [];
let nameArray = [];

//Important global variable for counting daily beer sale
let lastIdCount = 0;
let beersServed = 0;


window.addEventListener("DOMContentLoaded", loadScript);

//Getting the data
function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);
    console.log(myObject);

    //01 Project Name and Opening Time SECTION
    document.querySelector(".project-name").textContent = `Welcome to ${myObject.bar.name}`;

    //ClosingTime
    let closing = myObject.bar.closingTime.slice(0, -3);
    // console.log(closing);

    //Current Time
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let time = ` ` + hours + ":" + minutes;
    //console.log(time);

    // Opening Status
    if (closing >= time) {
        document.querySelector(".opening-status").textContent = ` OPEN`;
        document.querySelector(".opening-status").setAttribute(
            "style", "color: #28a745; background-color: #fff; border-radius: 0.2em; padding: 0.2em 0.5em");
        document.querySelector(".closing-status").textContent = ` ${closing} pm`;
        document.querySelector(".closing-status").setAttribute(
            "style", "color: black");

    } else {
        document.querySelector(".opening-status").textContent = ` CLOSED`;
        document.querySelector(".opening-status").setAttribute(
            "style", "color: red; background-color: #fff; border-radius: 0.2em");
        document.querySelector(".indication").textContent = `We are opening soon again.`;
    }

    //02 Kegs Storage SECTION
    let BeerStorage = document.querySelector(".storage-temp").content;
    //Creating Array to use the data
    storageArray = [];
    nameArray = [];

    myObject.storage.forEach((ns) => {
        storageArray.push(ns.amount);
        // console.log(ns.amount);
        nameArray.push(ns.name);
        // console.log(ns.name);
        let StorageCanvas = document.getElementById("BeerStorageChart").getContext("2d");
        let GradientBg = StorageCanvas.createLinearGradient(300, 0, 100, 0);
        GradientBg.addColorStop(0, "#28a745");
        GradientBg.addColorStop(1, "#ff6a00");

        let StorageChart = new Chart(StorageCanvas, {
            type: 'horizontalBar',
            data: {
                labels: nameArray,
                datasets: [{
                    label: "Kegs in Storage",
                    data: storageArray,
                    borderColor: GradientBg,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    borderWidth: 5,
                    backgroundColor: GradientBg,
                }]
            },
            options: {
                animation: false,
                scales: {

                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            beginAtZero: true,
                            fontColor: '#777',
                            fontSize: 13,
                        },
                        display: true,
                        responsive: true,

                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#777',
                            fontSize: 12,

                        },
                        display: true,
                        responsive: true,

                    }]
                },
                legend: {
                    labels: {
                        fontColor: '#777',
                        fontFamily: 'Roboto'
                    }

                }
            },

        });

    });


    // 03 Data for the queue - serving - SECTION
    let queue = myObject.queue.length;
    //data serving
    let serving = myObject.serving.length;
    let ChartCanva = document.getElementById("queueChart");
    //creating a chart with chart.js
    let myChart = new Chart(ChartCanva, {
        type: 'doughnut',
        data: {
            labels: ["Standing in the queue: " + myObject.queue.length, "Being served: " + myObject.serving.length],
            datasets: [{
                data: [queue, serving],
                backgroundColor: [
                    '#ff6a00',
                    '#28a745',
                ],
                borderColor: [
                    'trasnparent',
                    'trasnparent'
                ],
                borderWidth: 0
            }]
        },
        options: {
            animation: {
                easing: 'easeInCirc'
            },
            legend: {
                labels: {
                    fontColor: '#777',
                    fontFamily: 'Roboto',
                    fontSize: 13,
                    margin: 10,
                }
            }
        }
    });

    //04 Getting a number of beers served in total - SECTION
    myObject.serving.forEach(customer => {
        if (customer.id > lastIdCount) {
            beersServed += customer.order.length;
            lastIdCount = customer.id;
        }
        // console.log(beersServed);
    });
    document.querySelector(".sold-number").textContent = beersServed;
    document.querySelector(".sold-number").setAttribute(
        "style", "color: #ee0979; font-size: 2em");


    //05 Call Bartender's Function
    showBartenders();

} //Main End

//05 Bartenders name-status-status detail
function showBartenders() {
    //clean the container of bartenders
    document.querySelector(".bartender-container").innerHTML = "";

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender => {
        //console.log("bartender", bartender.name);

        //Define the bartenders template
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;

        //Define the bartenders clone 
        let bartendersClone = bartendersTemplate.cloneNode(true);
        //Getting the names of the bartenders
        bartendersClone.querySelector(".bartender_name").textContent = `${bartender.name}`;
        //Bartender´s status of work
        if (bartender.status == "WORKING") {
            bartendersClone.querySelector(".bartender_status").textContent = "Working";
            bartendersClone.querySelector(".bartender_status").setAttribute(
                "style", "color: #fff; background-color: #28a745; border-radius: 0.2em; padding: 0.2em 0.5em");
        } else {
            bartendersClone.querySelector(".bartender_status").textContent = "Getting Ready";
            bartendersClone.querySelector(".bartender_status").setAttribute(
                "style", "color: #fff; background-color: #ff6a00; border-radius: 0.2em; padding: 0.2em 0.5em");
        }

        //Bartender´s Activity
        if (bartender.statusDetail == "pourBeer") {
            bartendersClone.querySelector(".bartender_activity").textContent = `Pours Beer`;
        } else if (bartender.statusDetail == "startServing") {
            bartendersClone.querySelector(".bartender_activity").textContent = `Starts Serving`;
        } else if (bartender.statusDetail == "receivePayment") {
            bartendersClone.querySelector(".bartender_activity").textContent = `Receives Payment`;
        } else if (bartender.statusDetail == "releaseTap") {
            bartendersClone.querySelector(".bartender_activity").textContent = `Releases Tap`;
        } else if (bartender.statusDetail == "reserveTap") {
            bartendersClone.querySelector(".bartender_activity").textContent = `Reserves Tap`;
        } else {
            bartendersClone.querySelector(".bartender_activity").textContent = `Is waiting`;
        }

        //Bartender's Picture
        if (bartender.name == "Peter") {
            bartendersClone.querySelector("#peter").style.display = "flex";
        }
        if (bartender.name == "Jonas") {
            bartendersClone.querySelector("#jonas").style.display = "flex";
        }
        if (bartender.name == "Martin") {
            bartendersClone.querySelector("#martin").style.display = "flex";
        }

        //Append clone in the div
        document.querySelector(".bartender-container").appendChild(bartendersClone);
    });

    //10 Beers info section
    let beersTemplate = document.querySelector(".beersTemplate").content;
    // console.log(beersTemplate);
    document.querySelector(".beers-container").textContent = '';

    myObject.taps.forEach((tap) => {
        // console.log(myObject.taps);

        let clone = beersTemplate.cloneNode(true);
        clone.querySelector(".beername").textContent = tap.beer;

        //Perc value
        let levperc = (tap.level / tap.capacity) * 100;
        clone.querySelector(".levvalue").textContent = ` ${levperc}`;
        // Alc Value
        myObject.beertypes.forEach((beertype) => {

            if (tap.beer == beertype.name) {
                clone.querySelector(".alcvalue").textContent = ` ${beertype.alc + "%"}`;
                clone.querySelector(".beergraphic").src = "labelimage/" + beertype.label;
            }

        });

        document.querySelector(".beers-container").appendChild(clone);

    });


}

//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 4000);