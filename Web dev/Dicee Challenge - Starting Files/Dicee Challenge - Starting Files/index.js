var rand1 = getRoll();
var rand2 = getRoll();

document.querySelector(".img1").setAttribute("src", "images/dice" + rand1 + ".png");
document.querySelector(".img2").setAttribute("src", "images/dice" + rand2 + ".png");
declareWinner();

function getRoll(){
  return Math.floor(Math.random()*6)+1;
}
function declareWinner(){
  if(rand1 > rand2) document.querySelector("h1").innerHTML ="Player 1 wins!";
  else if(rand1 < rand2) document.querySelector("h1").innerHTML ="Player 2 wins!";
  else document.querySelector("h1").innerHTML ="Draw!";
}
