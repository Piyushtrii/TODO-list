const tasks = [
    { title: "Design new feature", category: "Backlog" },
    { title: "Implement login system", category: "Ongoing" },
    { title: "Write documentation", category: "Todo" },
    { title: "Fix navigation bug", category: "Done" },
    { title: "Brainstorm marketing ideas", category: "Backlog" },
    { title: "Refactor database schema", category: "Ongoing" },
    { title: "Create user survey", category: "Todo" },
    { title: "Deploy version 1.2", category: "Done" },
    { title: "Research products", category: "Backlog" },
    { title: "Optimize image loading", category: "Ongoing" },
    { title: "Set up CI/CD pipeline", category: "Todo" },
    { title: "Update privacy policy", category: "Done" }
];

function createTile(task) {
    // Create the main tile div
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.id = task.id; // Assume task has an id property that corresponds to 'done', 'backlog', etc.
    
    // Create a container for the text and buttons
    const content = document.createElement('div');
    content.className = 'tile-content';
    content.textContent = task.title;
    tile.appendChild(content);

    // Create the left arrow button
    const leftArrow = document.createElement('button');
    leftArrow.className = 'left-arrow';
    leftArrow.innerHTML = '←';
    leftArrow.addEventListener('click', () => handleButtonClick(task, 'left'));

    // Create the right arrow button
    const rightArrow = document.createElement('button');
    rightArrow.className = 'right-arrow';
    rightArrow.innerHTML = '→';
    rightArrow.addEventListener('click', () => handleButtonClick(task, 'right'));

    // Disable buttons based on the parent div's id
    if (tile.id === 'done') {
        rightArrow.disabled = true;
        rightArrow.classList.add('disabled');
    }

    if (tile.id === 'backlog') {
        leftArrow.disabled = true;
        leftArrow.classList.add('disabled');
    }

    // Create a container for the buttons and append them
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(leftArrow);
    buttonContainer.appendChild(rightArrow);

    // Append the button container to the tile
    tile.appendChild(buttonContainer);

    return tile;
}


// Get the container elements for the boxes
const backlogBox = document.getElementById('backlog');
const ongoingBox = document.getElementById('ongoing');
const todoBox = document.getElementById('todo');
const doneBox = document.getElementById('done');

// Event handler function for button clicks
function handleButtonClick(task, direction) {
    if (direction === 'left') {
        console.log(`Moving task "${task.title}" to the left.`);
        // Move the task to the left box
        if (task.category === 'Ongoing') {
            ongoingBox.removeChild(document.getElementById(task.id));
            task.category = 'Backlog';
            backlogBox.appendChild(createTile(task));
        } else if (task.category === 'Todo') {
            todoBox.removeChild(document.getElementById(task.id));
            task.category = 'Ongoing';
            ongoingBox.appendChild(createTile(task));
        } else if (task.category === 'Done') {
            doneBox.removeChild(document.getElementById(task.id));
            task.category = 'Todo';
            todoBox.appendChild(createTile(task));
        }
    } else if (direction === 'right') {
        console.log(`Moving task "${task.title}" to the right.`);
        // Move the task to the right box
        if (task.category === 'Backlog') {
            backlogBox.removeChild(document.getElementById(task.id));
            task.category = 'Ongoing';
            ongoingBox.appendChild(createTile(task));
        } else if (task.category === 'Ongoing') {
            ongoingBox.removeChild(document.getElementById(task.id));
            task.category = 'Todo';
            todoBox.appendChild(createTile(task));
        } else if (task.category === 'Todo') {
            todoBox.removeChild(document.getElementById(task.id));
            task.category = 'Done';
            doneBox.appendChild(createTile(task));
        }
    }
}


// Function to update box contents
function updateBoxContents() {
    const boxes = ['backlog', 'ongoing', 'todo', 'done'];
    
    boxes.forEach(boxId => {
        const box = document.getElementById(boxId);
        const tasksForBox = tasks.filter(task => task.category.toLowerCase() === boxId);
        
        tasksForBox.forEach(task => {
            const tile = createTile(task);
            box.appendChild(tile);
        });
    });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateBoxContents);