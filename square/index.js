const container = document.getElementById("container");
const addButton = document.getElementById("addButton");

const colors = [
    "#FFC857",
    "#E9724C",
    "#C5283D",
    "#481D24",
    "#255F85"
];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function addSquare() {
    const square = document.createElement("div");
    square.className = "square";
    square.style.backgroundColor = getRandomColor();
    square.textContent = "Your Text";
    
    // Insert the square as the first child of the container
    container.insertBefore(square, container.firstChild);
    resizeSquares();
}

function resizeSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.flexBasis = `calc(${100 / Math.floor(container.clientWidth / square.clientHeight)}% - 1px)`;
    });
}

window.addEventListener('resize', resizeSquares);
addButton.addEventListener("click", addSquare);

