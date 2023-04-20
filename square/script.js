const container = document.getElementById("container");
const addButton = document.getElementById("addButton");

const colors = [
    "#2E6171",
    "#556F7A",
    "#798086",
    "#B79FAD",
    "#D4AFCD",
    "#4ECDC4",
    "#6C464F",
    "#CBC5EA",
    "#8E9DCC",
    "#D9DBF1",
    "#B2ABF2",
    "#977390",
    "#A6B1E1"

];

function getRandomColor() {
    const chosen = colors[Math.floor(Math.random() * (colors.length-2))];
    const color = colors.shift();
    colors.push(color);
    console.log(colors);
    return chosen
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

