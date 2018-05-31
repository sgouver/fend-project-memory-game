
//Create a list that holds all of your cards
 let card = document.querySelectorAll(".card");
 let cards = [...card];

 // Store open cards
 let openedCards = [];

 //Listen to browser for card clicks
  for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", cardOpen);
  cards[i].addEventListener("click", display1stCard);
 }

//Allow cards to be clicked
 function display1stCard() {
      this.classList.toggle("show");
      this.classList.toggle("open");
      this.classList.toggle("disabled");
}

//Open card mechanism
 function cardOpen() {
     openedCards.push(this);
     let cardsLength = openedCards.length;
     if(cardsLength === 2){
         if(openedCards[0].type === openedCards[1].type){
            match()
         } else {
            unmatch()
         }
     }
 }

//What happen when they match
 function match(){
     openedCards[0].classList.add("match");
     openedCards[1].classList.add("match");
     openedCards[0].classList.remove("show", "open");
     openedCards[1].classList.remove("show", "open");
     openedCards = [];
 }

//What happens if they do not match
 function unmatch(){
      disable();
     openedCards[0].classList.add("unmatched");
     openedCards[1].classList.add("unmatched");
     setTimeout(function(){
         openedCards[0].classList.remove("show", "open", "unmatched");
         openedCards[1].classList.remove("show", "open", "unmatched");
         enable()
         openedCards = [];
     },1200);
 }

 //Disable clicking cards when two cards are open
 function disable(){
   let i;
   for (i=0; i<cards.length; i++){
     cards[i].classList.add("disabled");
   }
 }

 //Enable clicking cards after two unmatched cards are closed
 function enable(){
   let i;
   for (i=0; i<cards.length; i++){
     cards[i].classList.remove("disabled");
   }
 }


  //Shuffle function
  const deckShuffle = document.querySelector(".deck");

  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

  function startGame(){
     var shuffledCards = shuffle(cards);
     for (var i= 0; i < shuffledCards.length; i++){
        [].forEach.call(shuffledCards, function(item){
           deckShuffle.appendChild(item);
        });
     }
  }

  //start the game with browser refresh
  window.onload = startGame();
// The end of shuffle function

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
