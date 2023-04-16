const button = document.getElementById('criar-tarefa');
const list = document.getElementById('lista-tarefas');
const btnClearAll = document.getElementById('apaga-tudo');
const btnClearFinished = document.getElementById('remover-finalizados');
const tasks = document.getElementsByTagName('li');
const btnSave = document.getElementById('salvar-tarefas');
const btnUpMove = document.getElementById('mover-cima');
const btnDownMove = document.getElementById('mover-baixo');
const btnClearSelected = document.getElementById('remover-selecionado');

const scrollModify = () => {
  if (list.clientHeight >= 208) {
    list.style.overflowY = 'scroll';
  } else {
    list.style.overflowY = 'visible';
  }
};

const createTask = () => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.getElementById('texto-tarefa');
    if (input.value) {
      const li = document.createElement('li');
      li.innerHTML = input.value;
      li.classList.add('list-group-item');
      list.appendChild(li);
      scrollModify();
      input.value = '';
      input.focus();
    }
  });
};

const selectTask = (element) => {
  const oldSelected = document.querySelector('.selected');
  if (oldSelected && oldSelected.classList.contains('selected')) {
    oldSelected.classList.remove('selected');
  }
  element.classList.add('selected');
};

const completeTask = (el) => {
  const element = el;
  if (element.classList.contains('completed')) {
    element.classList.remove('completed');
  } else {
    element.classList.add('completed');
  }
};

const clickComplete = () => {
  document.addEventListener('dblclick', (event) => {
    const element = event.target;
    if (element.tagName === 'LI') completeTask(element);
  });
};

const clickSelected = () => {
  document.addEventListener('click', (event) => {
    const element = event.target;
    if (element.tagName === 'LI') selectTask(element);
  });
};

const clearAll = () => {
  btnClearAll.addEventListener('click', () => {
    list.innerHTML = '';
    scrollModify();
  });
};

const clearFinished = () => {
  btnClearFinished.addEventListener('click', () => {
    let existCompleted = true;
    while (existCompleted) {
      const removeTask = document.querySelector('.completed');
      if (removeTask) {
        removeTask.remove();
        scrollModify();
      } else {
        existCompleted = false;
      }
    }
  });
};

const store = () => {
  btnSave.addEventListener('click', () => {
    const arrayTasks = [];
    for (let index = 0; index < tasks.length; index += 1) {
      const objTask = {
        className: '',
        value: '',
      };
      objTask.className = tasks[index].className;
      objTask.value = tasks[index].innerText;
      arrayTasks.push(objTask);
    }
    localStorage.setItem('tasks', JSON.stringify(arrayTasks));
  });
};

const createRestoreLi = (arrayTasks) => {
  for (let index = 0; index < arrayTasks.length; index += 1) {
    const li = document.createElement('li');
    li.innerHTML = arrayTasks[index].value;
    if (arrayTasks[index].className) li.classList = arrayTasks[index].className;
    list.appendChild(li);
    scrollModify();
  }
};

const restoreTasks = () => {
  const arrayTasks = JSON.parse(localStorage.getItem('tasks'));
  if (arrayTasks) {
    createRestoreLi(arrayTasks);
  }
};

const upMoveTask = (taskMove) => {
  const element = taskMove;
  const taskParent = taskMove.parentElement;
  console.log(Array.prototype.indexOf.call(taskParent.children, element));
  if (Array.prototype.indexOf.call(taskParent.children, element) !== 0) {
    const previousElement = element.previousElementSibling;
    const tempTask = previousElement.innerHTML;
    previousElement.innerHTML = element.innerHTML;
    element.innerHTML = tempTask;
    element.classList.remove('selected');
    previousElement.classList.add('selected');
  }
};

const downMoveTask = (taskMove) => {
  const element = taskMove;
  const taskParent = taskMove.parentElement;
  console.log(Array.prototype.indexOf.call(taskParent.children, element));
  if (Array.prototype.indexOf.call(taskParent.children, element) !== tasks.length - 1) {
    const nextElement = element.nextElementSibling;
    const tempTask = nextElement.innerHTML;
    nextElement.innerHTML = element.innerHTML;
    element.innerHTML = tempTask;
    element.classList.remove('selected');
    nextElement.classList.add('selected');
  }
};

const moveTask = () => {
  btnUpMove.addEventListener('click', () => {
    const taskMove = document.querySelector('.selected');
    if (taskMove) upMoveTask(taskMove);
  });
  btnDownMove.addEventListener('click', () => {
    const taskMove = document.querySelector('.selected');
    if (taskMove) downMoveTask(taskMove);
  });
};

const clearSelected = () => {
  btnClearSelected.addEventListener('click', () => {
    const selectedTask = document.querySelector('.selected');
    if (selectedTask) {
      selectedTask.remove();
      scrollModify();
    }
  });
};

window.onload = () => {
  restoreTasks();
  createTask();
  clickComplete();
  clickSelected();
  clearAll();
  clearFinished();
  store();
  moveTask();
  clearSelected();
};
