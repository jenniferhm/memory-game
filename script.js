const cards = document.querySelectorAll(".memory-card");

var moveCounter = document.querySelector("#moveCounter");
var moves = 0;

var matchedCard = document.getElementsByClassName("match");

var modal = document.getElementById("popup-win");

var close = document.querySelector(".close"); 

var lockBoard = false;

var flippedCards = [];

function countMoves() {
    moves++;
    moveCounter.innerHTML = moves; 
}

function flipCard() {
    if(lockBoard) return;

    if(this === flippedCards[0]) return;

    this.classList.toggle("flip");
    this.classList.toggle("disable");

    flippedCards.push(this);

    let length = flippedCards.length;
    
    if(length === 2) {
        countMoves();
        let compareCards = flippedCards[0].dataset.name === flippedCards[1].dataset.name;
        compareCards ? matched() : unmatched();
    }
}

function matched() {
    flippedCards[0].classList.add("match", "disable");
    flippedCards[0].removeEventListener("click",flipCard);
    flippedCards[1].classList.add("match", "disable");
    flippedCards[0].removeEventListener("click",flipCard);
    // flippedCards[0].classList.remove("flip");
    // flippedCards[1].classList.remove("flip");
    flippedCards = [];
}

function unmatched() {
    lockBoard = true;

    flippedCards[0].classList.add("unmatched", "disable");
    flippedCards[1].classList.add("unmatched", "disable");

    setTimeout(() => {
        flippedCards[0].classList.remove("flip","unmatched","disable");
        flippedCards[1].classList.remove("flip","unmatched","disable");

        lockBoard = false;
        flippedCards = [];
    },1200);
}

function resetGame() {
    location.reload();
}

(function shuffleCards() {
    cards.forEach(card => {
        var randomPlace = Math.floor(Math.random() * 16);
        card.style.order = randomPlace;
    });
})();

cards.forEach(card => {
    card.addEventListener("click",flipCard);
});