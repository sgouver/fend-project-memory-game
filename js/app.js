
//Create a list that holds all of your cards
 let card = document.querySelectorAll(".card");
 let cards = [...card];

 //Create a list that holds all of the rating stars
 let star = document.querySelectorAll(".star");
 let stars = [...star];

 // Store open cards
 let openedCards = [];

 //Listen to browser for card clicks
  for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", cardOpen);
  cards[i].addEventListener("click", display1stCard);
  cards[i].addEventListener("click", moveCounter);
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

 //Move counter functionality
 let moves = 0;
 function moveCounter(){
   moves += 1
   document.querySelector(".moves").innerHTML = moves ;
   rating()
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

 //Add refresh button functionality
 const restart = document.querySelector(".restart");

 restart.addEventListener("click",
 function () {
   let i;
   for (i=0; i<cards.length; i++){
     cards[i].classList.remove("show", "open", "match");
   }
   for (i=1; i<stars.length; i++){
     stars[i].classList.remove("far")
     stars[i].classList.add("fas")
   }
   startGame()
   setInterval()
 }
);

  //Add Star rating system
  function rating(){
    if (moves > 15 && moves < 29) {
      stars[2].classList.remove("fas")
      stars[2].classList.add("far")
    }
    else if (moves > 30) {
      stars[1].classList.remove("fas")
      stars[1].classList.add("far")
    }
  }


  //Set a timer
let time = 0 ;
function timer(){
          setTimeout(function(){
              time++;
              let min = Math.floor(time/100/60);
              let sec = Math.floor(time/100);
              let mSec = time % 100;

              if(min < 10) {
                  min = "0" + min;
              }
              if(sec >= 60) {
                  sec = sec % 60;
              }
              if(sec < 10) {
                  sec = "0" + sec;
              }

              document.querySelector("#timer").innerHTML = min + ":" + sec;
              timer();
          }, 10);
    }
    timer();

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
    moves = 0;
    time = 0;
    document.querySelector("#timer").innerHTML = '00:00:00';
    document.querySelector(".moves").innerHTML = moves
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
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
