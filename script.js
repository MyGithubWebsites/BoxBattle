document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const playerScoreElement = document.getElementById('playerScore');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerScore = 0;
    
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    };

    const checkDraw = () => {
        return !board.includes('') && !checkWinner();
    };

    const handleClick = (index) => {
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            message.textContent = `${winner} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O' && gameActive) {
                setTimeout(computerMove, 500); // Introduce a delay for the computer move
            }
        }
    };

    const computerMove = () => {
        const emptyCells = board.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerChoice = emptyCells[randomIndex];

        handleClick(computerChoice);
    };

    const handleCellClick = (event) => {
        const index = event.target.dataset.index;
        handleClick(index);
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        message.textContent = '';
        currentPlayer = 'X';
        gameActive = true;
    };

    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
    });

    resetBtn.addEventListener('click', resetGame);
});
