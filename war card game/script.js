
let gameDatabase = {
    "player": {'score-message': '#player-result', 'box': '#player-box', 'score': 0},
    "computer": {'score-message': '#computer-result', 'box': '#computer-box', 'score': 0},
    "cards" : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '10', '10', '2', '2', '2', '2', '2', '2', '2', '2', '10', '10', '10', '5'],
    "points" : {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14},
    "stopMode": false,
    "turnPassedMode": false,
    "warMode": false,
    "wins": 0,
    "losses": 0,
    "wars": 0,
}

let CARDS = gameDatabase['cards'];
let airplaneSound = new Audio('./sounds/airplanes.mp3');
let playSound = new Audio('./sounds/swish.m4a');

const PLAYER = gameDatabase['player'];
const COMPUTER = gameDatabase['computer']

document.querySelector('#play').addEventListener('click', optionPlay);
document.querySelector('#deal').addEventListener('click', optionDissapearTransition);


function optionPlay() {
    if (gameDatabase['stopMode'] === false) {
        let card = document.createElement('img');
        card.style.width = '75px';
        card.style.opacity = '0';
        card.setAttribute('id', 'user-card');
        card.setAttribute('class', 'player-card');
        let frontCard = randomCard();
        card.src = `./images/${frontCard}.png`;
        document.querySelector('#player-box').appendChild(card);
        playSound.play();
        setTimeout('slowAppearCardTransitionPlayer()', 100);
        cardScore(frontCard, PLAYER);
        gameDatabase['stopMode'] = true;
        gameDatabase['warMode'] = false;
        setTimeout("optionStand()", 600);

    } else if (gameDatabase['warMode'] === true) {
        let flipedCard = document.createElement('img');
        flipedCard.setAttribute('id', 'player-fliped-card');
        flipedCard.setAttribute('class', 'player-back-card');
        flipedCard.src = './images/flipedCard.png';
        flipedCard.style.width = '75px';
        flipedCard.style.opacity = '0';
        document.querySelector('#player-box').appendChild(flipedCard);
        setTimeout('slowAppearCardTransitionPlayer()', 90)
        gameDatabase['warMode'] = true;
        gameDatabase['turnPassedMode'] = true;
        gameDatabase['stopMode'] = false;
        setTimeout("optionStand()", 400);
    }

}

function randomCard() {
    let cardIndex = Math.floor(Math.random() * CARDS.length);
    return gameDatabase['cards'][cardIndex];
}

function optionStand() {
    if (gameDatabase['turnPassedMode'] === false) {
        gameDatabase['stopMode'] = true;
        let card = document.createElement('img');
        card.style.width = '75px';
        card.style.opacity = '0';
        card.setAttribute('id', 'computer-card');
        card.setAttribute('class', 'computer-card');
        let frontCard = randomCard();
        card.src = `./images/${frontCard}.png`;
        document.querySelector('#bot-box').appendChild(card);
        setTimeout('slowAppearCardTransitionBot()', 80);
        cardScore(frontCard, COMPUTER);
        setTimeout('chooseWinner()', 600);
        let endedWar = document.querySelector('#bot-box').querySelectorAll('img');


        if (endedWar.length >= 3) {
            if (PLAYER['score'] > COMPUTER['score']) {
                document.querySelector('#after-card-result').textContent = 'You won the war!';
                document.querySelector('#after-card-result').style.color = 'blue';
               // gameDatabase["wins"]++;
                document.querySelector('#wins').textContent = gameDatabase["wins"];
            } else if (PLAYER['score'] < COMPUTER['score']) {
                document.querySelector('#after-card-result').textContent = 'You lost the war!';
                document.querySelector('#after-card-result').style.color = 'yellow';
              //  gameDatabase['losses']++;
                document.querySelector('#losses').textContent = gameDatabase['losses'];
            }
        }


        gameDatabase['turnPassedMode'] = true;
        gameDatabase['warMode'] = false;

    } else {
        let flipedCard = document.createElement('img');
        flipedCard.setAttribute('id', 'bot-fliped-card');
        flipedCard.setAttribute('class', 'bot-back-card');
        flipedCard.src = './images/flipedCard.png';
        flipedCard.style.width = '75px';
        flipedCard.style.opacity = '0';
        document.querySelector('#bot-box').appendChild(flipedCard);
        gameDatabase['warNow'] = false;
        setTimeout('slowAppearCardTransitionBot()', 600)
        gameDatabase['turnPassedMode'] = false;
        document.querySelector('#tip').textContent = 'Click play to end the war';
    }   
}

function optionDeal() {
    if (gameDatabase['stopMode'] === true ) {
        const playerCards = document.querySelector('#player-box').querySelectorAll("img");

        for (i=0; i < playerCards.length; i++) {
            playerCards[i].remove();
        }
        
        const botCards = document.querySelector('#bot-box').querySelectorAll("img");

        for (i=0; i < botCards.length; i++) {
            botCards[i].remove();
        }

        PLAYER['score'] = 0;
        COMPUTER['score'] = 0;

        document.querySelector('#after-card-result').textContent = 'Click play to put a card';
        document.querySelector('#after-card-result').style.color = 'white';
        document.querySelector('#tip').textContent = '';

        document.querySelector('#body').style = 'background: url(https://img.freepik.com/free-vector/poker-table-background-green-color_47243-1094.jpg?size=626&ext=jpg); background-repeat: no-repeat;background-size: cover; background-position: center;'

        document.querySelector('#game-area').style = 'background: none;'


        gameDatabase['stopMode'] = false;
        gameDatabase['turnPassedMode'] = false;
    }
}

function cardScore(frontCard, activePlayer) {
    activePlayer['score'] += gameDatabase['points'][frontCard];
}


function chooseWinner() {
    if (PLAYER['score'] === COMPUTER['score']) {
        let warBackground = document.querySelector('#body');
        warBackground.style.background = 'url(https://www.tapeciarnia.pl/tapety/normalne/tapeta-moro.jpg)';
        let cardBackground = document.querySelector('#game-area');
        cardBackground.style.background = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEVDRkuSi37YAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=)';
        document.querySelector('#after-card-result').textContent = 'WAR!!!';
        document.querySelector('#after-card-result').style.color = 'red';
        airplaneSound.play();
        gameDatabase['wars']++;
        gameDatabase['stopMode'] = true;
        gameDatabase['warMode'] = true;
        optionPlay();

            if (PLAYER['score'] > COMPUTER['score']) {
                document.querySelector('#after-card-result').textContent = 'You won!';
                document.querySelector('#after-card-result').style.color = 'blue';
                gameDatabase["wins"]++;
                document.querySelector('#wins').textContent = gameDatabase["wins"];
            } else if (PLAYER['score'] < COMPUTER['score']) {
                document.querySelector('#after-card-result').textContent = 'You lost!';
                document.querySelector('#after-card-result').style.color = 'yellow';
                gameDatabase['losses']++;
                document.querySelector('#losses').textContent = gameDatabase['losses'];
            }
    

    } else if (PLAYER['score'] > COMPUTER['score']) {
        document.querySelector('#after-card-result').textContent = 'You won!';
        document.querySelector('#after-card-result').style.color = 'blue';
        gameDatabase["wins"]++;
        document.querySelector('#wins').textContent = gameDatabase['wins'];

        if (gameDatabase['wins'] === 5) {
            document.querySelector('#score-box').style = 'display: initial;'
            document.querySelector('#container-hide').style = 'display: none;';
            document.querySelector('#greetings').textContent = 'CONGRATULATIONS!';
            document.querySelector('#greetings').style.color = 'blue';
            document.querySelector('#information').textContent = 'You have won the game!'
            document.querySelector('#information').style.color = 'blue';
            document.querySelector('#number-of-wars').textContent = gameDatabase["wars"];
            document.querySelector('#number-of-wars').style.color = 'orange';
        } 

    } else if (PLAYER['score'] < COMPUTER['score']) {
        document.querySelector('#after-card-result').textContent = 'You lost!';
        document.querySelector('#after-card-result').style.color = 'yellow';
        gameDatabase['losses']++;
        document.querySelector('#losses').textContent = gameDatabase['losses'];

        if (gameDatabase['losses'] === 5) {
            document.querySelector('#score-box').style = 'display: initial;'
            document.querySelector('#container-hide').style = 'display: none;';
            document.querySelector('#greetings').textContent = 'NOT THIS TIME!';
            document.querySelector('#greetings').style.color = 'red';
            document.querySelector('#information').textContent = 'You have lost the game, try again'
            document.querySelector('#information').style.color = 'red';
            document.querySelector('#number-of-wars').textContent = gameDatabase["wars"];
            document.querySelector('#number-of-wars').style.color = 'orange';
        }
    }
}

document.querySelector('#try-again').addEventListener('click', playAgain);

function playAgain() {
    window.location.reload();
}

// Transitions 

function slowAppearCardTransitionPlayer() {
    
    let gameAppear = document.querySelector('#game-area').querySelectorAll('img');
    const playerCardAppear = document.getElementById('user-card');

    if (gameAppear.length >= 3) {
        for (i=0; i < gameAppear.length; i++) {
            gameAppear[i].style.opacity = '1';
        }
    } else {
        for (i=0; i < gameAppear.length; i++) {
            playerCardAppear.style.opacity = '1';
        }
    }
}

function slowAppearCardTransitionBot() {
    const botCardAppear = document.getElementById('computer-card');
    let gameAppear = document.querySelector('#game-area').querySelectorAll('img');

    if (gameAppear.length >= 3) {
        for (i=0; i < gameAppear.length; i++) {
            gameAppear[i].style.opacity = '1';
        }
    } else {
        for (i=0; i < gameAppear.length; i++) {
            botCardAppear.style.opacity = '1';
        }
    }
}

function optionDissapearTransition() {
    if (PLAYER['score'] > COMPUTER['score']) {
        slowDissapearCardTransition()
        setTimeout('optionDeal()', 1000);
    } else if (PLAYER['score'] < COMPUTER['score']) {
        slowDissapearCardTransition();
        setTimeout('optionDeal()', 1000);
    }
}

function slowDissapearCardTransition() {
    const playerCardDissapear = document.getElementById('user-card');

    const computerCardDissapear = document.getElementById('computer-card');
    let afterWar = document.querySelector('#game-area').querySelectorAll('img');

    if (afterWar.length >= 3) {
        for (i=0; i < afterWar.length; i++) {
            afterWar[i].style.opacity = '0';
        }
            
    } else {
        playerCardDissapear.style.opacity = '0';
        computerCardDissapear.style.opacity = '0';
    }
    
    setTimeout('optionDeal()', 1000);
} 