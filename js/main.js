/* initialize an array of choices */
let choices = ["rock", "paper", "scissors"];
let gestures = ["hand-back-fist", "hand", "hand-scissors"];

const _rock = 0; //constant index reference for rock
const _paper = 1; //constant index reference for paper
const _scissors = 2; //constant index reference for scissors

/* initialize an array of scores */
let scores = [0, 0];
const _human = 0; //constant index reference for human
const _robot = 1; //constant index reference for robot

/* load scores from local storage if a string representation of the array exists */
if(localStorage.getItem("scores")!=null) {
    scores = localStorage.getItem("scores").split(",");
    document.querySelector("#human").innerText = scores[_human].toString();
    document.querySelector("#robot").innerText = scores[_robot].toString();
}

/* add event listeners to all BUTTONS with rps class */
document.querySelectorAll(".rps").forEach(function(rps) {
    if(rps.nodeName == "BUTTON") { //ensure that listener is added only to BUTTON elements
        rps.addEventListener("click", function(event) {
            let human;
            if(event.target.nodeName == "SPAN") { //if event came from SPAN element (fontawesome) inside a button, step up to the parent BUTTON element
                human = Number(event.target.parentNode.id.slice(4,5));
            } else { //if event came from BUTTON element directly
                human = Number(event.target.id.slice(4,5));
            }
            let robot = Number(Math.round(Math.random()*2));
            animateRobotGesture(robot); //call the animated robot's selection
            let message = `You picked ${choices[human]}; Robot picked ${choices[robot]}; `;
            if(human == robot) { //if both picked the same gesture
                message += "<h1>It's a tie!</h1>";
            } else { //if not the same
                switch(human) {
                    case _rock:
                        if(robot==_paper) { //rock vs paper
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        } else { //rock vs scissors
                            scores[_human]++; message += "<h1>You win!</h1>";
                        } //there is no rock since we exclude the tie from comparison
                        break;
                    case _paper:
                        if(robot==_rock) { //paper vs rock
                            scores[_human]++; message += "<h1>You win!</h1>";
                        } else { //paper vs scissors
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        } //there is no paper since we exclude the tie from comparison
                        break;
                    case _scissors:
                        if(robot==_rock) { //scissors vs rock
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        } else { //scissors vs paper
                            scores[_human]++; message += "<h1>You win!</h1>";
                        } //there is no scissors since we exclude the tie from comparison
                        break;
                }
            }
            document.querySelector("#message").innerHTML = message;  //display the message
            document.querySelector("#human").innerText = scores[_human].toString(); //display human's score
            document.querySelector("#robot").innerText = scores[_robot].toString(); //display robot's score
            let option = document.createElement("option"); //create an option element
            let now = (new Date()).toLocaleTimeString(); //get the current local time string
            option.text = `${now}: ` + message.replaceAll(" picked ", ":").replace("<h1>", "").replace("</h1>", ""); //make an option text
            document.querySelector("#match").add(option); //add option to the html select object
            localStorage.setItem("scores", scores.toString()); //persist the scores to the localstorage
        });
    }
});

document.querySelector("#resetscore").addEventListener("click", function() {
    if(confirm("You are about to clear all recorded scores.")) { //ask user to continue or not during the removal of scores
        localStorage.removeItem("scores"); //remove scores from persistent local storage
        document.querySelector("#human").innerText = 0; //make it zero
        document.querySelector("#robot").innerText = 0; //make it zero
        while(document.querySelector("#match").options.length>0) { //remove all the options from the html select object
            document.querySelector("#match").options.remove(document.querySelector("#match").options.length-1);
        }
        document.querySelector("#message").innerHTML = "Scores reset successfuly!"; //notify successful reset
    }
});

function animateRobotGesture(robot) {
    document.querySelector("#modal-shakehands").style.display = "flex"; //display flex
    setTimeout(function() {
        document.querySelector("#content").innerHTML = `<span class="fa-solid fa-${gestures[robot]}" style="font-size: 36pt"></span><br>Computer selected ${choices[robot]}.`; //change the icon and text based on the robot's selection
        setTimeout(function() {
            document.querySelector("#content").innerHTML = `<span class="fa-solid fa-handshake" style="font-size: 36pt"></span><br>Computer is thinking...`; //resotore handshake icon and thinking text
            document.querySelector("#modal-shakehands").style.display = "none"; //display none
        }, 400);
    }, 800);
}