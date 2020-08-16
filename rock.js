

//Assigning HTML Elements
const playerRockButton = document.getElementById('playerRock');
const playerPaperButton = document.getElementById('playerPaper');
const playerScissorsButton = document.getElementById('playerScissors');
const playerScoreCounter = document.getElementById('playerScore');

const computerRockButton = document.getElementById('computerRock');
const computerPaperButton = document.getElementById('computerPaper');
const computerScissorsButton = document.getElementById('computerScissors');
const computerScoreCounter = document.getElementById('computerScore');

const roundCounter = document.getElementById('roundCounter');
const commentary = document.getElementById('commentary');

const computerControls = document.getElementById('computerControls')

//Defining Button lists
const playerButtons = [playerRockButton,playerPaperButton,playerScissorsButton];
const computerButtons = [computerRockButton,computerPaperButton,computerScissorsButton];




//Maps winning outcomes 
const outcomes = new Map();
outcomes.set('rock', 'scissors');
outcomes.set('paper','rock');
outcomes.set('scissors', 'paper');

var round = 1;
var playerScore = 0;
var computerScore = 0;
var gameSpeed = 500; //sets speed of game by controlling pauses between actions


playerButtons.forEach(function(button){

    button.addEventListener('click', () =>{
        chooseButton(playerButtons,button);
        
        game()


    })
});

function game()
{
    
    setTimeout(()=>{
        computerControls.classList.remove('inactive'); //ungreys computer controls
        computerPlay();
                    }, gameSpeed);
    setTimeout(()=>{
        playRound(getChoice(playerButtons),getChoice(computerButtons))
        round++
        roundCounter.textContent = `Round: ${round}`
        if(round === 5)
        {
            roundCounter.textContent = `Last Round!`
        }
        if(round > 5)
        {
            roundCounter.textContent = `End!`
            tallyScore()
            reset()
            
        }
    },gameSpeed);
    
}

//checks buttons for the presence of 'chosen' class and returns the textcontent from the html element
//takes in button list as a parameter
function getChoice(player)
{
    var chosenButton;
    player.forEach(function(choice){
        if(choice.classList.contains('chosen'))
        {
            chosenButton = choice;
            return;
        }
    })

    return chosenButton;
}

//This ensures no two buttons can be chosen at once
function chooseButton(sideButtons,button)  
{
    sideButtons.forEach((button)=>{   //unselects all buttons before adding class to the chosen button
        button.classList.remove('chosen');
        button.classList.remove('lose');
        button.offsetWidth = button.offsetWidth; //not sure what this does but it lets the animation restart
    })
    button.classList.add('chosen');


}

//Checks outcome map for the specific combination of player and PC choice
// if the key corresponding to the player's choice has a value of the PC's choice, the player wins
//otherwise the PC wins (save for ties) 
function playRound(player,computer)
{
    
    //removes the whitespace and \n from the HTML textcontent
    var playerChoice = player.textContent.trim().toLowerCase().replace('\n','')  
    var computerChoice = computer.textContent.toLowerCase().trim().replace('\n','')

    //checks for ties
    if(playerChoice == computerChoice){  
        commentary.textContent = 'Tie!'
        
    }
    //gets the value of the player's choice key in the outcomes map, and checks if the PC chose the option that loses
    else if(outcomes.get(playerChoice) == computerChoice){  
        commentary.textContent = 'You Win!';
        playerScore++;
        playerScoreCounter.textContent=`Player Score: ${playerScore}`;
        computer.classList.replace('chosen','lose');
        chooseButton(playerButtons,player);
        
    }
    //Defaults to the PC winning
    else{
        commentary.textContent = 'You Lose!';
        computerScore++;
        computerScoreCounter.textContent = `PC Score: ${computerScore}`;
        player.classList.replace('chosen','lose');
        chooseButton(computerButtons,computer);
        
    }



}

//Gets the PC's choice from a random number
function computerPlay()
{
    let computerChoiceCase = Math.floor((Math.random()*3)) + 1;
    switch(computerChoiceCase)
    {
        case 1:
            chooseButton(computerButtons,computerRockButton);
            return 'rock';
        case 2:
            chooseButton(computerButtons,computerPaperButton);
            return 'paper';
        case 3:
            chooseButton(computerButtons,computerScissorsButton);
            return 'scissors';
    }
}

function tallyScore()
{
    if(playerScore === computerScore)
    {
        alert("It's a tie!")
    }
    else if(playerScore > computerScore)
    {
        alert("You Win!")
    }
    else
    {
        alert("Computer beat you!")
    }

}

function reset()
{
    playerScore = 0
    playerScoreCounter.textContent=`Player Score: ${playerScore}`;
    computerScore = 0
    computerScoreCounter.textContent = `PC Score: ${computerScore}`;
    round = 1
    roundCounter.textContent = `Round: ${round}`
    commentary.textContent = "Pick an option to start"
    playerButtons.forEach(function(button){
        button.classList.remove('chosen')
        button.classList.remove('lose')

    })
    computerButtons.forEach(function(button){
        button.classList.remove('chosen')
        button.classList.remove('lose')

    })
}
