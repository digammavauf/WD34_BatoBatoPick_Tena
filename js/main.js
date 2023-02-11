/* initialize an array of choices */
let choices = ["rock", "paper", "scissors"];
const _rock = 0; //constant index reference for rock
const _paper = 1; //constant index reference for paper
const _scissors = 2; //constant index reference for scissors

/* initialize an array of scores */
let scores = [0, 0];
const _human = 0; //constant index reference for human
const _robot = 1; //constant index reference for robot

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
            let now = (new Date()).toLocaleTimeString();
            let message = `${now}: You picked ${choices[human]}; Robot picked ${choices[robot]}; `;
            if(human == robot) { //if both picked the same gesture
                message += "<h1>It's a tie!</h1>";
            } else { //if not the same
                switch(human) {
                    case _rock:
                        if(robot==_paper) {
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        } else {
                            scores[_human]++; message += "<h1>You win!</h1>";
                        }
                        break;
                    case _paper:
                        if(robot==_rock) {
                            scores[_human]++; message += "<h1>You win!</h1>";
                        } else {
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        }
                        break;
                    case _scissors:
                        if(robot==_rock) {
                            scores[_robot]++; message += "<h1>Robot wins!</h1>";
                        } else {
                            scores[_human]++; message += "<h1>You win!</h1>";
                        }
                        break;
                }
            }
            document.querySelector("#human").innerText = scores[_human].toString();
            document.querySelector("#robot").innerText = scores[_robot].toString();
            document.querySelector("#message").innerHTML = message;
            let option = document.createElement("option");
            option.text = message.replace("<h1>", "").replace("</h1>", "");
            document.querySelector("#match").add(option);
        });
    }
});
