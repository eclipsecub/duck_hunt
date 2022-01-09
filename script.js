// SCORE RELATED
// - (Second Variation) Apply some sort of lessening multiplier on the overall score if the user misses a click
// - (Advanced Variation) Apply a beneficial multiplier when the user is able to click on the duck in under a certain
// cont. small time frame. When this happens, some sort of BONUS epic thing will happen. Perhaps a tinge of gold background
// cont. fade in and out. Or potentially a pokemon explosion.

// JACOB
// X Add black bar that keep track of score, time and also includes the restart button
// X Game over screen has to be created
// X When timer drops below 10s the time text color changes to red
// - Add has text danger to the class list when the score is below a certain thresh hold (has-text-danger)
// X Play GIF at duck death location upon click


// JAMES
// X MAKE FUNCTION TO Randomly generate x,y values for the duck placement, this excludes the lower portion of the screen
// X Trigger the duck placement adjustment upon clicking, using an event listener
// - Gunshot sound when the user clicks (potentially hit marker noise as well, when the duck is hit)
// - Keep score : (Initial Variation) increments by one on each click, with a timer of 30s
// - Game starts when the first duck is clicked (also allowing functionality for the 'play again' button to work)


//DOM related variables
const duck = document.querySelector('.duck');
const gameOver = document.querySelector('.gameOver');
const background = document.querySelector('.background');
const buttonPlayAgain = document.querySelector('.buttonPlayAgain');
const modal = document.querySelector('.endingScreen');
const playerScore = document.querySelector('.playerScore');
const yourScore = document.querySelector('.yourScore');
const timeRemaining = document.querySelector('.timeRemaining');
const ducksMurdered = document.querySelector('.ducksMurdered');
const gameOverText = document.querySelector('.gameOver');

//Declaring game music audio's
const mainAudio = new Audio('../audio/mainAudio.mp3');
mainAudio.volume = 0.15;
const gameOverAudio = new Audio('../audio/gameOverAudio.mp3');
gameOverAudio.volume = 0.15;

//Game settings related variables
const timeLimit = 30;
const dogOdds = 100;
const asianGuyOdds = 500;

//declaring time interval variable
let timerInterval;
let timer = timeLimit, seconds;

//boolean, if a duck has been clicked
let duckClicked = false;

let duckClickedAmount = 0;

//Creating function that randomizes the duck's position
duck.style.position = "absolute";

//Creating universal LEFT and BOTTOM positional variables for the duck
let left = `${Math.trunc(Math.random() * 91) + 1}%`;

let bottom = `${Math.trunc(30 + Math.random() * 57) + 1}%`;


//Setting an initial random duck position
duck.style.left = left;
duck.style.bottom = bottom

//End the game
function endGame() {
    //stopping main audio and starting game over audio
    mainAudio.pause();
    mainAudio.currentTime = 0;
    gameOverAudio.play();
    //stopping the timer
    stopTimer();
    //Adds the total amount of ducks that got fucking eviscerated
    ducksMurdered.textContent = duckClickedAmount;
    //Bringing up the ending screen
    modal.classList.add('is-active');
    modal.classList.add('is-active');
}

//Starts the game
function startGame() {
    //stopping game over audio and starting main audio
    gameOverAudio.pause();
    gameOverAudio.currentTime = 0;
    mainAudio.play();
    //starts Timer
    startTimer();
    //reset timer text color
    timeRemaining.style.color = 'white';
    //removes game over screen
    modal.classList.remove('is-active');
    // Remove all invisible bloodsplat elements LETS GOOOOOOOO
    document.querySelectorAll('.explosionGif').forEach(e => e.remove());
    //TBI - resets score

    //resets amount of ducks clicked
    duckClickedAmount = 0;

}


//Timer interval for countdown
function startTimer() {

    timerInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeRemaining.textContent = seconds;
        if (timeRemaining.textContent == '10') {
            //Change the text color to red when the countdown is at 10
            timeRemaining.style.color = 'red';
        }
        if (timeRemaining.textContent == '00') {
            endGame();
        }

        if (--timer < 0) {
            timer = timeLimit;

        }

    }, 1000);

}

//Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}


//Event listener function for the duck 'click'
function duckClick() {
    //Playing the blood explosion gif when the duck is clicked
    bloodExplosionGif();

    //Setting the coordinates of the duck using the GLOBAL left and bottom variables
    left = `${Math.trunc(Math.random() * 91) + 1}%`;
    duck.style.left = left;
    bottom = `${Math.trunc(30 + Math.random() * 57) + 1}%`;
    duck.style.bottom = bottom;

    // Records the amount of ducks clicked
    duckClickedAmount += 1;

    //Gunshot noise variable
    let gunshotNoise = new Audio('../audio/hitMarker.mp3');

    //Lowering the volume of the gunshot noise
    gunshotNoise.volume = 0.15;

    //Play gun shot noise
    gunshotNoise.play();

    //odds functions
    possibleAsianGuy();
    possibleDog();
    //If the duck has not been clicked yet, start the timer on click
    if (!duckClicked) {
        startTimer();
        mainAudio.play();
        duckClicked = true;
    }

}

//The duck 'click' event listener
duck.addEventListener("click", duckClick)


//Implementing the Play again button functionality
buttonPlayAgain.addEventListener('click', (e) => {
    startGame();
})

//Implementing the blood explosion gif upon duck being shot
function bloodExplosionGif() {
    let explosionGif = document.createElement('img');
    explosionGif.src = '../images/bloodSplash.gif?' + Math.random();
    explosionGif.style.position = 'absolute';
    explosionGif.style.pointerEvents = 'none';
    explosionGif.style.left = left;
    explosionGif.style.bottom = bottom;
    explosionGif.style.height = '150px';
    explosionGif.classList.add('explosionGif');
    document.body.appendChild(explosionGif);
}

//Function to animate the dog walking across the screen. Also, adds the event listener for the dog
  function dogAnimate() {
    const dogSniffing = document.createElement('img');
    dogSniffing.src = '../images/dogSniffing.gif?' + Math.random();
    dogSniffing.style.right = '15%';
    dogSniffing.style.bottom = '9%';
    dogSniffing.style.position = 'absolute';
    dogSniffing.classList.add('dog');
    dogSniffing.draggable = false;
    document.body.appendChild(dogSniffing);
    dogSniffing.addEventListener('click',function(){

    })
    dogSniffing.style.animationTimingFunction = 'linear';
    dogSniffing.style.animation = 'dogMove 15s 1';
    setTimeout(() =>{
        document.querySelectorAll('.dog').forEach(e => e.remove())
    }, 14900);

}


function asianAnimate(){
    const asianGuy = document.createElement('img');
    asianGuy.src = '../images/ChineseDude.png';
    asianGuy.style.position = 'absolute';
    asianGuy.style.right = "105%";
    asianGuy.style.bottom ='85%';
    asianGuy.style.height = '10%';
    asianGuy.classList.add('asianGuy');
    asianGuy.style.transform = 'rotate(90deg)'
    asianGuy.draggable = false;
    background.appendChild(asianGuy);
    asianGuy.style.animationTimingFunction = 'linear';
    asianGuy.style.animation = 'chineseMove 12s 1';
    const asianGuyAudio = new Audio('../audio/ChineseDudeTalking.mp3');
    asianGuyAudio.volume = 0.2;
    asianGuyAudio.play();
    setTimeout(function(){
        asianGuyAudio.pause();
        asianGuyAudio.currentTime = 0;
        document.querySelectorAll('.asianGuy').forEach(e => e.remove())
    }, 12000)
}


//Creating the possibly spawn a dog function, it will run at the beginning of each game
function possibleDog() {
    let odds = Math.trunc(Math.random() * dogOdds) + 1;
    if (odds == 2) {
        dogAnimate();
    }
}

//Same as above just for asian guy sprite
function possibleAsianGuy(){
    let odds = Math.trunc(Math.random() * asianGuyOdds) + 1;
    if (odds == 2) {
        asianAnimate()
    }
}





