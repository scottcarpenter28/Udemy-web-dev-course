for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    makeSound(this.innerHTML);
    btnAnimation(this.innerHTML);
  });
}

document.addEventListener("keydown", function(e) {
  makeSound(e.key);
  btnAnimation(e.key);
});

function makeSound(key) {
  switch (key) {
    case key = 'w':
      var audio = new Audio('sounds/crash.mp3')
      break;
    case key = 'a':
      var audio = new Audio('sounds/kick-bass.mp3')
      break;
    case key = 's':
      var audio = new Audio('sounds/snare.mp3')
      break;
    case key = 'd':
      var audio = new Audio('sounds/tom-1.mp3')
      break;
    case key = 'j':
      var audio = new Audio('sounds/tom-2.mp3')
      break;
    case key = 'k':
      var audio = new Audio('sounds/tom-3.mp3')
      break;
    case key = 'l':
      var audio = new Audio('sounds/tom-4.mp3')
      break;
    default:
      console.log(key);
  }

  audio.play();
}

function btnAnimation(key){
  var btn=document.querySelector("."+key);
  btn.classList.add("pressed");
  setTimeout(function(){
    btn.classList.remove("pressed");
  }, 75);
}
