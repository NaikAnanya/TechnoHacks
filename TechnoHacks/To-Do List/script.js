let taskCount = 0;

function addTask() {
  const taskInput = document.getElementById('task-input');
  const deadlineInput = document.getElementById('task-deadline');
  const priority = document.getElementById('priority').value;
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (!taskText) return;

  // ✅ Check for duplicate task
  const taskList = document.getElementById('task-list');
  const existingTasks = taskList.querySelectorAll('.task-info');
  for (let task of existingTasks) {
    if (task.textContent.includes(taskText)) {
      alert("Task already exists!");
      return;
    }
  }

  taskCount++;

  const li = document.createElement('li');
  li.classList.add(`priority-${priority}`);

  const taskInfo = document.createElement('div');
  taskInfo.className = 'task-info';
  taskInfo.innerHTML = `<strong>${taskCount}.</strong> ${taskText}`;

  if (deadline) {
    const countdown = document.createElement('div');
    countdown.className = 'countdown';
    updateCountdown(countdown, deadline);
    setInterval(() => updateCountdown(countdown, deadline), 1000);
    taskInfo.appendChild(countdown);
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '✔ Complete';
  toggleBtn.classList.add('complete-btn');
  toggleBtn.onclick = () => {
    li.classList.toggle('completed');
    toggleBtn.textContent = li.classList.contains('completed') ? '✘ Undo' : '✔ Complete';
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt">🗑️</i>';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => {
    li.remove();
    renumberTasks();
  };

  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(actions);
  taskList.appendChild(li);

  taskInput.value = '';
  deadlineInput.value = '';
}

document.getElementById('priority').addEventListener('change', function () {
  const selected = this.value;
  if (selected === 'high') {
    this.style.color = 'red';
  } else if (selected === 'normal') {
    this.style.color = '#2196F3';
  } else if (selected === 'low') {
    this.style.color = 'gray';
  }
});


function updateCountdown(element, deadline) {
  const endTime = new Date(deadline);
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    element.textContent = '⏰ Time is up!';
    element.style.color = 'red';
    return;
  }

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  element.textContent = `⏳ Time left: ${hours}h ${minutes}m ${seconds}s`;
}

function renumberTasks() {
  const tasks = document.querySelectorAll('#task-list li');
  taskCount = 0;
  tasks.forEach((task, index) => {
    taskCount = index + 1;
    const taskText = task.querySelector('.task-info strong');
    taskText.textContent = `${taskCount}.`;
  });
}
