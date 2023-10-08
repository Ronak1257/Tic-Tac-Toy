document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const status = document.querySelector("[data-status]");
    const gameContainer = document.querySelector(".container");
    const restartButton = document.querySelector("[restart]");
    const restart = document.querySelector("[data-restart]");
    const resultScreen = document.querySelector(".result-screen");
    const resultMessage = document.querySelector(".result-message");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                return gameBoard[a];
            }
        }
        if (!gameBoard.includes("")) {
            gameActive = false;
            return "Draw";
        }
        return null;
    };

    const handleClick = (cell, index) => {
        if (!gameActive || gameBoard[index] !== "") return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        const winner = checkWinner();
        if (winner) {
            if (winner === "Draw") {
                displayResult("It's a Draw!");
            } else {
                displayResult(`${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        gameActive = true;
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        status.textContent = `${currentPlayer}'s turn`;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("X", "O");
        });
        hideResult();
    };

    const displayResult = (message) => {
        resultMessage.textContent = message;
        resultScreen.style.display = "flex";
    };

    const hideResult = () => {
        resultScreen.style.display = "none";
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleClick(cell, index));
    });

    restartButton.addEventListener("click", restartGame);
    restart.addEventListener("click", restartGame);
    restartGame();
});
