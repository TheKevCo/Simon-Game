    $(document).ready(function () {

        var availableButtons = ["r", "b", "y", "g"]
        var patternChoices = [];
        var userClickedPattern = [];
        var level = 0;
        var patternSequence = 0;
        let gameStart = false;

        $("button").on("click", function(){
            var userChosenColor = this.innerText;
            playSound(userChosenColor);
            animationPress(userChosenColor);
            userClickedPattern.push(userChosenColor);
            console.log(userClickedPattern);
            console.log(patternChoices);
            if(patternChoices.length === userClickedPattern.length){
                if(JSON.stringify(patternChoices) === JSON.stringify(userClickedPattern)){
                    userClickedPattern = [];
                    setTimeout(function(){
                        patternSequence++;
                        sequence();
                    },1000)
                } else {
                    playSound("wrong");
                    $("body").addClass("gameEnd");
                    setTimeout(function(){
                        $("body").removeClass("gameEnd");
                    }, 100)
                    $("h1").text("You lose! Click any key to play again.")
                    gameStart = false;
                    level = 0;
                    patternSequence = 0;
                    patternChoices = [];
                    userClickedPattern = [];
                }
            }
        })

        function playSound (name) {
            var audio = new Audio("./sounds/" + name + ".mp3");
            audio.play();
        }

        function animationPress (currentColor) {
            var buttonPressed = $("." + currentColor);
                buttonPressed.addClass("pressed");
                setTimeout(function(){
                    buttonPressed.removeClass("pressed");
                }, 100)
        }

        function sequence(){
            level++;
            $("h1").text("Level "+ level);
            // store button choice
            var randomChoice = Math.floor((Math.random() * 4));
            console.log(randomChoice);
            var button = availableButtons[randomChoice];
            patternChoices.push(button);
            // play sound and blink item
            playSound(button);
            $("."+ patternChoices[patternSequence]).fadeOut(100).fadeIn(100);
        }
        
        $(document).keydown(function() { 
            if(!gameStart){
                sequence();
                gameStart = true;
            }    
        });
    });