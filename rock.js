

//Assigning HTML Elements
const playerRockButton = document.getElementById('playerRock');
const playerPaperButton = document.getElementById('playerPaper');
const playerScissorsButton = document.getElementById('playerScissors');
const playerLizardButton = document.getElementById('playerLizard');
const playerSpockButton = document.getElementById('playerSpock');
const playerScoreCounter = document.getElementById('playerScore');

const computerRockButton = document.getElementById('computerRock');
const computerPaperButton = document.getElementById('computerPaper');
const computerScissorsButton = document.getElementById('computerScissors');
const computerLizardButton = document.getElementById('computerLizard');
const computerSpockButton = document.getElementById('computerSpock');
const computerScoreCounter = document.getElementById('computerScore');

const roundCounter = document.getElementById('roundCounter');
const commentary = document.getElementById('commentary');

const computerControls = document.getElementById('computerControls')

//Defining Button lists
const playerButtons = [playerRockButton,playerPaperButton,playerScissorsButton,playerLizardButton,playerSpockButton];
const computerButtons = [computerRockButton,computerPaperButton,computerScissorsButton,computerLizardButton,computerSpockButton];

class outcome{
    constructor(choice,beats,actions)
    {
        this.choice = choice;
        this.beats = beats;
        this.actions = actions;
    }
}

var outcomes = [
    new outcome('Rock',['scissors','lizard'], ['crushes','crushes']),
    new outcome('Paper',['rock','spock'],['covers','disproves']),
    new outcome('Scissors',['paper','lizard'],['cuts','decapitates']),
    new outcome('Lizard',['paper','spock'],['eats','poisons']),
    new outcome('Spock',['rock','scissors'],['vaporizes','smashes']),
]

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


//otherwise the PC wins (save for ties) 
function playRound(player,computer)
{
    var playerChoice 
    var computerChoice 
    
    
    for(let i = 0; i < outcomes.length; i++)
    {
        
        if(outcomes[i].choice.toLowerCase() == player.textContent.toLowerCase().trim().replace('\n','')) { playerChoice=outcomes[i] }
        
        if(outcomes[i].choice.toLowerCase() == computer.textContent.toLowerCase().trim().replace('\n','')) { computerChoice=outcomes[i] }    
    }
    

    //checks for ties
    if(playerChoice.choice == computerChoice.choice){  
        setTimeout(()=>{
            commentary.textContent = 'Tie!'
        },gameSpeed) 
        
        
    }

    else if(playerChoice.beats.includes(computerChoice.choice.toLowerCase())){  
        
        playerScore++;
        playerScoreCounter.textContent=`Player Score: ${playerScore}`;
        computer.classList.replace('chosen','lose');
        chooseButton(playerButtons,player);
        setTimeout(()=>{
            commentary.textContent = (playerChoice.choice + " " + playerChoice.actions[playerChoice.beats.indexOf(computerChoice.choice.toLowerCase())]) + " " + computerChoice.choice + "!";
        },gameSpeed) 
        
    }
    //Defaults to the PC winning
    else{
        
        computerScore++;
        computerScoreCounter.textContent = `PC Score: ${computerScore}`;
        player.classList.replace('chosen','lose');
        chooseButton(computerButtons,computer);
        setTimeout(()=>{
            commentary.textContent = (computerChoice.choice + " " + computerChoice.actions[computerChoice.beats.indexOf(playerChoice.choice.toLowerCase())]) + " " + playerChoice.choice + "!";
        },gameSpeed) 
        
    }



}

//Gets the PC's choice from a random number
function computerPlay()
{
    let computerChoiceCase = Math.floor((Math.random()*5)) + 1;
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
        case 4:
            chooseButton(computerButtons, computerLizardButton);
            return 'lizard';
        case 5:
            chooseButton(computerButtons, computerSpockButton);
            return 'spock';
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

