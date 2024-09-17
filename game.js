var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

var soundMap = {
    "red": new Audio('./sounds/red.mp3'),
    "blue": new Audio('./sounds/blue.mp3'),
    "green": new Audio('./sounds/green.mp3'),
    "yellow": new Audio('./sounds/yellow.mp3'),
    "wrong": new Audio('./sounds/wrong.mp3')
};

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playAudio(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-display").text("Level " + level);
}

function playAudio(chosenColour) {
    if (soundMap[chosenColour]) {
        soundMap[chosenColour].play();
    }
}

$(".btn").on("click touchstart", function() {
    if (!started) return;
    var clickedButton = $(this);
    var userChosenColour = clickedButton.attr('id');
    playAudio(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1500);
        }
    } else {
        //game over
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-display").text("Level 0");
        level = 0;
        gamePattern = [];
        started = false;
    }
}

$(document).on('keypress touchstart', function() {
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Simon Game");
    }
});
