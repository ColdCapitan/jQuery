const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = $('#todo-list');
const itemCountSpan = $('#item-count');
const uncheckedCountSpan = $('#unchecked-count');
let i = 0;

function newTodo() {
  openWindow();
}

function openWindow() {
  let overlay = $('<div></div>').addClass('modal-overlay');
  let form = $('<form></form>').addClass('todo-form modal');
  let inputName = $('<input type="text" name="taskName" placeholder="Назва справи">').addClass('todo-input');
  let buttonSubmit = $('<button></button>').text('Додати').addClass('todo-submit');

  form.append(inputName, buttonSubmit);
  $('.todo-form, .modal-overlay').remove();
  $('body').append(overlay, form);

  form.submit(function (event) {
    event.preventDefault();
    let taskName = inputName.val().trim();  
    if (taskName) {
      addTodo(taskName);
      form.remove();
      overlay.remove();
    }
  });

  overlay.click(function () {
    form.remove();
    overlay.remove();
  });
}

function addTodo(taskName) {
  let newToDo = $('<li></li>').addClass(classNames.TODO_ITEM);
  let checkbox = $('<input type="checkbox">').addClass(classNames.TODO_CHECKBOX);
  let todoText = $('<span></span>').addClass(classNames.TODO_TEXT).text(taskName);
  let delButton = $('<button></button>').addClass(classNames.TODO_DELETE).text('Видалити');

  newToDo.append(checkbox, todoText, delButton);
  list.append(newToDo);
  i++;
  updateCounts();

  delButton.click(function () {
    deleteToDo(newToDo);
  });

  checkbox.change(function () {
    updateCounts();
  });
}

function deleteToDo(toDo) {
  toDo.remove();
  i--;
  updateCounts();
}

function updateCounts() {
  itemCountSpan.text(i);
  let uncheckedCount = $('.' + classNames.TODO_CHECKBOX + ':not(:checked)').length;
  uncheckedCountSpan.text(uncheckedCount);
}