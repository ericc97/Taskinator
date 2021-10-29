var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) {
    event.preventDefault();

    // get info from the dom regarding the html ex. task-name and task-type
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
   
    }

    formEl.reset();

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name= 'task-type']").selectedIndex = 0;

    //package data as an object
    var taskDataObject = {
        name: taskNameInput,
        type: taskTypeInput,
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObject);

};


var createTaskEl = function (taskDataObject) {

    // create list item stored in dom
    var listItemEl = document.createElement("li");
    // give li a class name
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div")
    // give div a class name
    listItemEl.class = "task-info"
    //add html content to div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObject.name + "</h3><span class='task-type'>" + taskDataObject.type + "</span>";
    // create a div first and then add li as a child inside of the div
    listItemEl.appendChild(taskInfoEl);

    console.dir(listItemEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

};

formEl.addEventListener("submit", taskFormHandler);
