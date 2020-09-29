//challenge one your age in Days

let button = document.getElementById("action");
button.addEventListener("click", function () {
  let birthYear = prompt("what year were you born...Good friend?");
  let ageInDays = (2020 - birthYear) * 365;
  let h1 = document.createElement("h1");
  let textAnswer = document.createTextNode("You are " + ageInDays + "days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
  console.log(ageInDays);
});
//challenge 2 Cat Generator
const button2 = document.getElementById("Reset");
button2.addEventListener("click", function () {
  const result = document.getElementById("flex-box-result");
  const child = result.childNodes[0];
  if (child) result.removeChild(child);
});

const button3 = document.getElementById("cat-generator");
button3.addEventListener("click", function () {
  let image = document.createElement("img");
  let div = document.getElementById("flex-cat-gen");
  image.src = "https://placekitten.com/g/200/300";
  div.appendChild(image);
});

//challenge 3 rock, paper, scissors

function rpsGame(yourChoice) {
  console.log(yourChoice);

  let humanChoice, botChoice;
  humanChoice = yourChoice.id;

  botChoice = numberToChoice(randToRpsInt());
  console.log("Computer choice", botChoice);

  results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
  console.log(results);

  message = finalMessage(results); // {'message', '(You won)!', 'color: 'green'}
  console.log(message);
  rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
  return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
  return ["rock", "paper", "scissors"][number];
}

function decideWinner(yourChoice, computerChoice) {
  let rpsDatabase = {
    rock: { scissors: 1, rock: 0.5, paper: 0 },
    paper: { rock: 1, paper: 0.5, scissors: 0 },
    scissors: { paper: 1, scissors: 0.5, rock: 0 },
  };

  let yourScore = rpsDatabase[yourChoice][computerChoice];
  let computerScore = rpsDatabase[computerChoice][yourChoice];

  return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
  if (yourScore === 0) {
    return { message: "You lost", color: "red" };
  } else if (yourScore === 0.5) {
    return { message: "You tied", color: "yellow" };
  } else {
    return { message: "You won!", color: "green" };
  }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
  let imageDatabase = {
    rock: document.getElementById("rock").src,
    paper: document.getElementById("paper").src,
    scissors: document.getElementById("scissors").src,
  };
  //Removes all the images
  document.getElementById("rock").remove();
  document.getElementById("paper").remove();
  document.getElementById("scissors").remove();

  let humanDiv = document.createElement("div");
  let botDiv = document.createElement("div");
  let messageDiv = document.createElement("div");

  humanDiv.innerHTML =
    "<img src='" +
    imageDatabase[humanImageChoice] +
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
  botDiv.innerHTML =
    "<img src='" +
    imageDatabase[botImageChoice] +
    "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
  messageDiv.innerHTML =
    "<h1 style='color; " +
    finalMessage["color"] +
    "; font-size: 60px; padding:30px;'>" +
    finalMessage["message"] +
    "</h1>";

  document.getElementById("flex-box-rps-div").appendChild(humanDiv);
  document.getElementById("flex-box-rps-div").appendChild(messageDiv);
  document.getElementById("flex-box-rps-div").appendChild(botDiv);
}

//part 4 of project: Change the color of buttons

let all_buttons = document.getElementsByTagName("button");
console.log(all_buttons);

let copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
  copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy) {
  if (buttonThingy.value === "red") {
    buttonsRed();
  } else if (buttonThingy.value === "green") {
    buttonsGreen();
  } else if (buttonThingy.value === "reset") {
    buttonsColorReset();
  } else if (buttonThingy.value === "random") {
    randomColors();
  }
}

function buttonsRed() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-danger");
  }
}

function buttonsGreen() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add("btn-success");
  }
}

function buttonsColorReset() {
  for (let i = 0; i < all_buttons.length; i++) {
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);
  }
}

function randomColors() {
  let choices = ["btn-primary", "btn-danger", "btn-success", "btn-warning"];

  for (let i = 0; i < all_buttons.length; i++) {
    let randomNumber = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNumber]);
  }
}

//challenge 5 Black Jack

let blackjackGame = {
  'you': { 'scoreSpan': "#your-blackjack-result", 'div': "#your-box", 'score': 0 },
  'dealer': {'scoreSpan': "#dealer-blackjack-result",'div': "#dealer-box",'score': 0},
  'cards': ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  'cardsMap': {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "K": 10, "J": 10, "Q": 10, "A": [1, 11]},
  'wins': 0,
  'losses': 0,
  'draws': 0,
  'isStand': false,
  'turnsOver': false,
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const winSound = new Audio("blackjacksounds/cash.mp3");
const hitSound = new Audio("blackjacksounds/swish.m4a");
const lossSound = new Audio("blackjacksounds/aww.mp3");


document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);


document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);

function blackjackHit() {
  if (blackjackGame['isStand'] === false) {
    let card = randomCard();
    
  
  showCard(card, YOU);
  updateScore(card, YOU);
  console.log(YOU["score"]);
  showScore(YOU);
  console.log(YOU["score"]);
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjackGame["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <=21 ) {
  let cardImage = document.createElement("img");
  cardImage.src = `Card images/${card}.png`;
  document.querySelector(activePlayer["div"]).appendChild(cardImage);
  hitSound.play();
}
}

function blackjackDeal() {
  if (blackjackGame['turnsOver'] === true) {

    blackjackGame['isStand'] = false;
    
    let yourImages = document.querySelector("#your-box").querySelectorAll("img");
    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");

    for (i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
    }

    for (i = 0; i < dealerImages.length; i++) {
      dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

    document.querySelector('#blackjack-result').textContent = "Let's play";
    document.querySelector('#blackjack-result').style.color = 'black';

    blackjackGame['turnsOver'] = true;
  }
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjackGame["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackjackGame["cardsMap"][card][0];
    }
  } else {

  activePlayer["score"] += blackjackGame["cardsMap"][card];
  }
}

function showScore(activePlayer) {
  if (activePlayer['score'] >21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

  } else {
  document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer['score'];
    
  }
}

function dealerLogic() {
  blackjackGame['isStand'] = true;
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);

  if (DEALER['score'] > 15) {
    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver']);
  }
}

//compute winner and return who just won
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {

    if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
      blackjackGame['wins']++;
      winner = YOU;
  
    } else if (YOU['score'] < DEALER['score']) {
    blackjackGame['losses']++;
    winner = DEALER;

  } else if (YOU['score'] === DEALER['score']) {
    blackjackGame['draws']++;
  }

  // condition: when user busts but dealer doesn't
  } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
    blackjackGame['losses']++;

    winner = DEALER;
  

    //condition: when you AND the dealer busts
  } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
    blackjackGame['draws']++;

    console.log('You drew');
  }
  console.log(blackjackGame);
  
  return winner;
}

function showResult(winner) {
let message, messageColor;

if (blackjackGame['turnsOver'] === true) {



if (winner === YOU) {
    document.querySelector('#wins').textContent = blackjackGame['wins'];
      message = 'You won!';
      messageColor = 'green';
      winSound.play();
    
    } else if (winner === DEALER) {
      document.querySelector('#losses').textContent = blackjackGame['losses'];

      message = 'You Lost!';
      messageColor = 'red';
      lossSound.play();
    
    } else {
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor = 'black';
    }
    
    
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
