const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false; //one card or no card

//Flip  cards
function flipcard() {
    

    if(lockBoard) return;

    this.classList.add("flip");

    // for first click
    //***it will work when false***
    if(!hasFlippedCard) { 
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    // for second click
    //***it will work when true***
    if(this === firstCard) return;

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();

}

//Check for match
const checkForMatch = () => {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unFlipCards();
}

let count = 0;
//Disable cards
const disableCards = () => {
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);
    count++;
    if(count === (cards.length/2)) {
        setTimeout(restart, 1000);
    }
}

//UnFlip cards
const unFlipCards = () => {
    lockBoard = true;
    setTimeout(function() {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
}

//Reset board
const resetBoard = () => {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

//Shuffle the cards
(function shuffleAtBeginning() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

//Iterating the cards and adding event listeners
for(let card of cards) {
    card.addEventListener("click", flipcard);
}

const shuffleTheCards = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

const restart = () => {
    cards.forEach(card => {
        card.classList.remove("flip");
    });
    shuffleTheCards();
    resetBoard();
    for(let card of cards) {
        card.addEventListener("click", flipcard);
    };
    count = 0;
}
