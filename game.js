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

// Start the game when a key is pressed or screen is touched
$(document).on('keydown', function () {
    if (!started) {
        startGame();
    }
});

$(document).on('touchstart', function () {
    if (!started) {
        startGame();
    }
});

function startGame() {
    nextSequence();
    started = true;
    $("#level-title").text("Simon Game");
}

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

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


$(".btn").on("click touchstart", function (e) {
    e.preventDefault(); 
    e.stopPropagation(); 

    if (!started) return; 

    var clickedButton = $(this);
    var userChosenColour = clickedButton.attr('id');
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1500);
        }
    } else {
        // Game over
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#level-display").text("Level 0");
        level = 0;
        gamePattern = [];
        started = false;
    }
}
