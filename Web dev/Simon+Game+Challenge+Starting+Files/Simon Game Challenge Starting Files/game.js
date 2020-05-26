//Game colors
var btnColors = ['red', 'blue', 'green', 'yellow'];
var randColor;

//Game start
var started = false;
var level = 0;
var gamePattern = [];


$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Use click actions
var userClickPattern = [];
var userColor;

$(".btn").click(function() {
  userColor = $(this).attr("id");
  userClickPattern.push(userColor);

  playSound(userColor);
  animatePress(userColor);

  checkAnswer(userClickPattern.length - 1);
});

//Chosing random color
function nextSequence() {
  userClickPattern = [];
  level++;
  $("h1").text("Level " + level);

  var ranNum = Math.floor(Math.random() * 4);
  //Game pattern
  gamePattern.push(btnColors[ranNum]);

  //Animate and sound
  $('#' + btnColors[ranNum]).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(gamePattern[level - 1]);
}


//Selects sound
function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(curColor) {
  $('#' + curColor).addClass("pressed").delay(100).queue(function() {
    $(this).removeClass("pressed").dequeue();
  });
}


function checkAnswer(curLevel) {

  if (userClickPattern[curLevel] === gamePattern[curLevel]) {
    console.log("Correct!");

    //checks to see if a new round can start
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }
  else {
    console.log(gamePattern);
    playSound("wrong");
    $('body').addClass("game-over").delay(200).queue(function() {
      $(this).removeClass("game-over").dequeue();
    });
    $("h1").text("Game over! Press any key to restart");
    startOver();
  }

}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
