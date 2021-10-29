var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  event.preventDefault();
  
  // get info from the dom regarding the html ex. task-name and task-type
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

  // create list item stored in dom
  var listItemEl = document.createElement("li");
  // give li a class name
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div")
  // give div a class name
  listItemEl.class = "task-info"
  //add html content to div 
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  // create a div first and then add li as a child inside of the div
  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  
  
};

formEl.addEventListener("submit", createTaskHandler);

