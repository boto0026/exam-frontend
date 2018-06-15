"use strict";

let myObject;
let storageArray = [];
let nameArray = [];

//Important global variable for counting daily beer sale
let lastIdCount = 0;
let beersServed = 0;

window.addEventListener("DOMContentLoaded", loadScript);

//01 Getting the data
function loadScript() {
    let data = FooBar.getData();
    myObject = JSON.parse(data);

    //02 Project Name and Opening Hours
    document.querySelector(".project-name").textContent = `Welcome to ${myObject.bar.name}`;

    //03 Closing Time
    document.querySelector(".closing-time").textContent = ` ${myObject.bar.closingTime.slice(0, -3)}`;

    //04 Current Time
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    document.querySelector(".current-time").textContent = ` ` + hours + ":" + minutes;


    //05 Call Bartender's Function
    showBartenders();


    //06 Data for the queue - serving
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
                    'transparent',
                    'transparent'
                ],
                borderWidth: 1
            }]
        },
        options: {
            animation: {
                easing: 'easeInCirc'
            },
            responsive: true,
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    display: false
                }]

            },
            legend: {
                labels: {
                    fontColor: '#333',
                    fontFamily: 'Helvetica',
                    fontSize: 15,
                }

            }
        }

    });

    //07 Getting a number of beers served in total
    myObject.serving.forEach(customer => {
        if (customer.id > lastIdCount) {
            beersServed += customer.order.length;
            lastIdCount = customer.id;
        }
        // console.log(beersServed);
    });
    document.querySelector(".sold-number").textContent = beersServed;


    //08 Kegs Storage Section
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
                            fontColor: '#333',
                            fontSize: 14,
                        },
                        display: true,
                        responsive: true,

                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#333',
                            fontSize: 12,

                        },
                        display: true,
                        responsive: true,

                    }]
                },
                legend: {
                    labels: {
                        fontColor: '#333',
                        fontFamily: 'Helvetica'
                    }

                }
            },

        });

    });


    //10 Beers info section
    let beersTemplate = document.querySelector(".beers-temp").content;
    // console.log(beersTemplate);
    document.querySelector(".beerinfo").textContent = '';

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

        document.querySelector(".beerinfo").appendChild(clone);

    });

};


//05 Bartenders name-status-status detail
function showBartenders() {
    //clean the container of bartenders
    document.querySelector(".box4").innerHTML = "";

    let bartenders = myObject.bartenders;

    bartenders.forEach(bartender => {
        //console.log("bartender", bartender.name);

        //Define the bartenders template
        let bartendersTemplate = document.querySelector(".bartendersTemplate").content;

        //Define the bartenders clone 
        let bartendersClone = bartendersTemplate.cloneNode(true);
        //Getting the names of the bartenders
        bartendersClone.querySelector(".bartender_name").textContent = ` ${bartender.name}`;
        //Bartender´s status of work
        if (bartender.status == "WORKING") {
            bartendersClone.querySelector(".bartender_status").textContent = " Working";
            bartendersClone.querySelector(".bartender_status").style.backgroundColor = "#28a745";
        } else {
            bartendersClone.querySelector(".bartender_status").textContent = " Getting Ready";
            bartendersClone.querySelector(".bartender_status").style.backgroundColor = "#ff6a00";
        }

        //Bartender´s Activity
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

        //Append clone in the div
        document.querySelector(".box4").appendChild(bartendersClone);
    })

}

//setting the interval so the date reloads in 10s !!!IMPORTANT to change the time to 10 s before handin
setInterval(function () {
    loadScript();
}, 10000);