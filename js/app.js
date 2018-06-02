
//Create a list that holds all of your cards
 let card = document.querySelectorAll(".card");
 let cards = [...card];

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
let matchCounter = 0 ;

 function cardOpen() {
     openedCards.push(this);
     let cardsLength = openedCards.length;
     if(cardsLength === 2){
         if(openedCards[0].type === openedCards[1].type){
            match()
            matchCounter++ ;
         } else {
            unmatch()
         }
     }
     openModal()
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

 function restartMoves(){
   moves = 0;
   document.querySelector(".moves").innerHTML = moves
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
let restart = document.querySelectorAll(".restart");

let z;
for (z=0; z < restart.length; z++){
 restart[z].addEventListener("click", function () {
      matchCounter = 0;
      time = 0;
       let i;
       for (i=0; i<cards.length; i++){
         cards[i].classList.remove("show", "open", "match", "disabled");
       }
       for (i=1; i<stars.length; i++){
         stars[i].classList.remove("far")
         stars[i].classList.add("fas")
       }
       shuffleFunction()
       restartMoves()
       }
    )
  }

  //Create a list that holds all of the rating stars
  let star = document.querySelectorAll(".star");
  let stars = [...star];

  //Add Star rating system
  function rating(){
    if (moves > 15 && moves < 29) {
      stars[2].classList.remove("fas")
      stars[2].classList.add("far")
      stars[5].classList.remove("fas")
      stars[5].classList.add("far")
    }
    else if (moves > 30) {
      stars[1].classList.remove("fas")
      stars[1].classList.add("far")
      stars[4].classList.remove("fas")
      stars[4].classList.add("far")
    }
  }


  //Set a timer
  let time = 0 ;
  function timer(){
          if (status == 1) {
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
                    document.querySelector("#timerModal").innerHTML = min + ":" + sec;
                    timer();
              }, 10);
          }
      }

  function startTimer(){
        status = 1;
        timer();
  }

  function stopTimer(){
        status = 0
  }

   function resetTimer(){
        status = 0;
        time = 0;
        document.querySelector("#timer").innerHTML = '00:00';
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
    matchCounter = 0;
    startTimer();
    shuffleFunction();
    restartMoves();
  }

  function shuffleFunction(){
     let shuffledCards = shuffle(cards);
     for (let i= 0; i < shuffledCards.length; i++){
        [].forEach.call(shuffledCards, function(item){
           deckShuffle.appendChild(item);
        });
     }
  }

  //start the game with browser refresh
  window.onload = startGame();

  // The end of shuffle function

  // Open Modal window
  let modal = document.querySelector(".modal");

  function openModal() {
    if (matchCounter === 2){
    modal.style.display = "block";
    stopTimer()
    }
  }

  // close the modal - click "x"
  closeModal = document.querySelector(".close")
  closeModal.addEventListener("click", function() {
      modal.style.display = "none";
  });

  // close modal after hitting refresh
  closeModal = document.querySelector("#closeModal")
  closeModal.addEventListener("click", function() {
      modal.style.display = "none";
  });

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }



/*
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
