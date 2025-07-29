const taskInput = document.getElementById("taskInput");
// const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) {
    alert("Task cannot be empty.");
    return;
  }

  const taskItem = createTaskElement(taskText);
  pendingList.appendChild(taskItem);
  taskInput.value = "";
}

function createTaskElement(text, isCompleted = false, addedTime = new Date(), completedTime = null) {
  const li = document.createElement("li");
  li.className = "task";

  const span = document.createElement("span");
  span.className = "text";
  span.innerText = text;

  const time = document.createElement("span");
  time.className = "timestamp";
  time.innerText = `Added: ${addedTime.toLocaleString()}`;
  if (isCompleted && completedTime) {
    time.innerText += ` | Completed: ${completedTime.toLocaleString()}`;
  }

  const actions = document.createElement("div");
  actions.className = "actions";

if (!isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.innerText = "✓";
    completeBtn.className = "complete";
    completeBtn.onclick = () => {
        const newTask = createTaskElement(text, true, addedTime ? new Date() : null);
        completedList.appendChild(newTask);
        li.remove();
    };
    actions.appendChild(completeBtn);
}

const editBtn = document.createElement("button");
editBtn.innerText = "✎";
editBtn.className = "edit";
editBtn.onclick = () => {
    const newText = prompt("edit task:", text);
    if (newText) {
        span.innerText = newText;
    }
};
actions.appendChild(editBtn);

const deleteBtn = document.createElement("button");
deleteBtn.innerText = "✗";
deleteBtn.className = "delete";
deleteBtn.onclick = () => {
    li.remove();
};
actions.appendChild(deleteBtn);

li.appendChild(span);
li.appendChild(time);
li.appendChild(actions);

return li;
}