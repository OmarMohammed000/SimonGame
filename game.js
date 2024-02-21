let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let state = "inactive";
let level = 0;
function animateGamePattern(gamePattern) {
  const delay = 550; 

  for (let i = 0; i < gamePattern.length; i++) {
    animateItem(gamePattern[i], i * delay);
  }
}

function animateItem(item, delay) {
  setTimeout(() => {
    $(`#${item}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(item);
  }, delay);
}

function nextSequence() {
  let randomNumber = Math.round(Math.random() * 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  animateGamePattern(gamePattern);
  playSound(randomChosenColor)
  state = "active";
  $("h1").text(`Level ${level + 1}`);
  level++;
}
function playSound(name) {
  let audio = new Audio(`/sounds/${name}.mp3`);
  audio.play();
}
function animatePress(currentColour) {
  $(`.${currentColour}`).addClass("pressed");
}
$(".btn").on("click", function () {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  setTimeout(() => {
    this.classList.remove("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    let fail = new Audio("/sounds/wrong.mp3");
    fail.play();
    $("body").addClass("game-over")
    setTimeout(()=>{
        $("body").removeClass("game-over")
    },200)
    $("h1").text('Game Over, Press Any Key to Restart')
    startOver()
  }
}
function startOver(){
    level=0;
    gamePattern = [];
    state = "inactive";
    userClickedPattern = [];
}

$(document).keypress(function (e) {
  if (state === "inactive") {
    nextSequence();
  } 
});
