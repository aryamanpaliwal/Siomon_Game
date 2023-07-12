var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if(started === false)
    {
        started = true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        // console.log("wrong");
        var wrong_audio = new Audio("sounds/wrong.mp3");
        wrong_audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var curr = $("#" + randomChosenColour);
    curr.fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    // setTimeout(() => {$("."+currentColor).removeClass("pressed");}, 100);
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    },100);
}