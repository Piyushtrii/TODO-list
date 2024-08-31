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
   
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.id = task.id; 
    
   
    const content = document.createElement('div');
    content.className = 'tile-content';
    content.textContent = task.title;
    tile.appendChild(content);

    
    const leftArrow = document.createElement('button');
    leftArrow.className = 'left-arrow';
    leftArrow.innerHTML = '←';
    leftArrow.addEventListener('click', () => handleButtonClick(task, 'left'));

    
    const rightArrow = document.createElement('button');
    rightArrow.className = 'right-arrow';
    rightArrow.innerHTML = '→';
    rightArrow.addEventListener('click', () => handleButtonClick(task, 'right'));

    
    if (tile.id === 'done') {
        rightArrow.disabled = true;
        rightArrow.classList.add('disabled');
    }

    if (tile.id === 'backlog') {
        leftArrow.disabled = true;
        leftArrow.classList.add('disabled');
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(leftArrow);
    buttonContainer.appendChild(rightArrow);

    
    tile.appendChild(buttonContainer);

    return tile;
}



const backlogBox = document.getElementById('backlog');
const ongoingBox = document.getElementById('ongoing');
const todoBox = document.getElementById('todo');
const doneBox = document.getElementById('done');


function handleButtonClick(task, direction) {
    if (direction === 'left') {
        console.log(`Moving task "${task.title}" to the left.`);
        
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

document.addEventListener('DOMContentLoaded', updateBoxContents);
