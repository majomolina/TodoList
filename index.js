const typed = new Typed('.typed', {
	strings: [
		'<i class="todo">ToDo List</i>'
	],

	typeSpeed: 75, 
	startDelay: 300, 
	backSpeed: 75, 
	smartBackspace: true, 
	shuffle: false, 
	backDelay: 1500, 
	loop: true, 
	loopCount: false, 
	showCursor: true, 
	cursorChar: '|', 
	contentType: 'html', 
});

const messageEdit = document.getElementById('editText');

const addBtn = document.querySelector('#add-btn');
const newTaskInput = document.querySelector('#wrapper input');
//console.log('valor de newTaskInput:', newTaskInput);
const taskContainer = document.querySelector('#tasks');
//console.log('valor de taskContainer:', taskContainer);
const error = document.getElementById('error');
// const editMessage = document.getElementById('editMessage');
const countValue = document.querySelector('.count-value');
//console.log('valor de countValue:', countValue);
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();
  error.style.display = 'none';
  if (!taskName) {
    setTimeout(() => {
      error.style.display = 'block';
    }, 200);
    return;
  }
 const task = `<div class="task">
 <input type="checkbox" class="task-check" >
 <span class="taskName">${taskName}</span>
 <button class="edit">Edit</button>
 <button class="delete">Delete</button>
 </div>`;

 taskContainer.insertAdjacentHTML('beforeend', task);
 //display message item added or updated
 messageEdit.style.display = 'block';
 setTimeout(() => {
  messageEdit.style.display = 'none';
}, 2000);

 const deleteButtons = document.querySelectorAll('.delete');
 deleteButtons.forEach((button) => {
  button.onclick = () => {
    button.parentNode.remove();
    taskCount -= 1;
    displayCount(taskCount);
  };
});

const editButtons = document.querySelectorAll('.edit');
editButtons.forEach((editBtn) => {
    editBtn.onclick = (e) => {
        let targetElement = e.target;
        if (!(e.target.className == "edit")){
            targetElement = e.target.parentElement;
           // console.log('Entra a ! target edit')
        }

        newTaskInput.value = targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();
        taskCount -= 1;
        displayCount ((taskCount));
        
    };
});

const tasksCheck = document.querySelectorAll('.task-check');
tasksCheck.forEach((checkBox) => {
    checkBox.onChange = () => {
        checkBox.nextElementSibling.classList.toggle('completed');
        if (checkBox.checked) {
            taskCount -= 1;
        } else {
            taskCount += 1;
        }
        displayCount(taskCount);
    };
});

taskCount += 1;
displayCount(taskCount);
newTaskInput.value = "";
};

 addBtn.addEventListener('click', addTask);
 

