const choices = ['rock', 'paper', 'scissors'];

document.querySelectorAll('.choice').forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        const result = determineWinner(playerChoice, computerChoice);
        displayResult(playerChoice, computerChoice, result);
        highlightChoices(playerChoice, computerChoice);
    });
});

document.getElementById('playAgain').addEventListener('click', () => {
    document.getElementById('resultText').innerText = '';
    document.getElementById('playerChoice').innerText = '';
    document.getElementById('computerChoice').innerText = '';
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'It\'s a tie!';
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'You lose!';
    }
}

function displayResult(player, computer, result) {
    document.getElementById('resultText').innerText = result;
    document.getElementById('playerChoice').innerText = `You chose: ${player}`;
    document.getElementById('computerChoice').innerText = `Computer chose: ${computer}`;
}

function highlightChoices(player, computer) {
    document.getElementById(player).classList.add('highlight');
    setTimeout(() => {
        document.getElementById(player).classList.remove('highlight');
    }, 500);

    document.getElementById(computer).classList.add('highlight');
    setTimeout(() => {
        document.getElementById(computer).classList.remove('highlight');
    }, 500);
}