/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, roundscore, gamePlaying;
init();

function init() {
scores = [0,0];
activePlayer = 0;
roundscore = 0;
gamePlaying = true;

//document.querySelector('.dice').style.display = 'none';

// document.getElementById('score-0').textContent = 0;
// document.getElementById('current-0').textContent = 0;
// document.getElementById('score-1').textContent = 0;
// document.getElementById('current-1').textContent = 0;
// document.getElementById('name-0').textContent = 'Player 1';
// document.getElementById('name-1').textContent = 'Player 2';
// document.querySelector('.player-0-panel').classList.remove('active');
// document.querySelector('.player-1-panel').classList.remove('active');
// document.querySelector('.player-0-panel').classList.remove('winner');
// document.querySelector('.player-1-panel').classList.remove('winner');
// document.querySelector('.player-0-panel').classList.add('active');
$("#dice-1").css("display", "block");
$("#dice-2").css("display", "block");

$("#score-0").text(0);
$("#current-0").text(0);
$("#score-1").text(0);
$("#current-1").text(0);
$("#name-0").text('Player 1');
$("#name-1").text('Player 2');

$(".player-0-panel, .player-1-panel").removeClass("active winner");
$(".player-0-panel").addClass("active");

}

$(".btn-roll").on("click" , function() {
if(gamePlaying) {
    var dice1, dice2;
    //Random value
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
 
    //Display dice
    // var diceDOM = document.querySelector('.dice');
    // diceDOM.style.display = 'block';
    // diceDOM.src = 'dice/dice-' + dice1 + '.png';
    $("#dice-1").css("display","block");
    $("#dice-1").attr("src",`dice/dice-${dice1}.png`);
    $("#dice-2").css("display","block");
    $("#dice-2").attr("src",`dice/dice-${dice2}.png`);
    

    //Display result and check for dice value if = 1
    if (dice1 == 1 || dice2 == 1) {
        roundscore = 0;
        $("#current-" + activePlayer).text(roundscore);
        nextPlayer();
    }else if (dice1 == 1 && dice2 == 1) {
        scores[activePlayer] = 0;
        $("#score-" + activePlayer).text(scores[activePlayer]);
        nextPlayer();
    }
    else {
        dice = dice1 + dice2;
        roundscore += dice;
        $("#current-" + activePlayer).text(roundscore);
    }   
} 
})

$(".btn-hold").on("click" , function() {
if (gamePlaying) {
    scores[activePlayer] += roundscore;

    //update UI
    $("#score-" + activePlayer).text(scores[activePlayer]);
    
    //Check for winner
    if (scores[activePlayer] >= 100) {
        $("#name-" + activePlayer).text('Winner!!');
        $(".player-" + activePlayer + "-panel").addClass("winner");
        $(".player-" + activePlayer + "-panel").removeClass("active");
        $("#dice-1").css("display", "none");
        $("#dice-2").css("display", "none");
        $("#current-0").text(0);
        $("#current-1").text(0);
        //end game by making state variable false
        gamePlaying = false;
    }else {
        nextPlayer();
    }
}
})

function nextPlayer() {
     //Toggle player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundscore = 0;

     $("#current-0").text(0);
     $("#current-1").text(0);

     $(".player-0-panel").toggleClass("active");
     $(".player-1-panel").toggleClass("active");
     $("#dice-1").css("display", "none");
     $("#dice-2").css("display", "none");
 
}

$(".btn-new").on("click", init);














