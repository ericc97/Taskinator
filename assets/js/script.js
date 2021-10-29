var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

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
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give div a class name
    listItemEl.class = "task-info";
    //add html content to div 
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObject.name + "</h3><span class='task-type'>" + taskDataObject.type + "</span>";

    // create a div first and then add li as a child inside of the div
    listItemEl.appendChild(taskInfoEl);

    console.dir(listItemEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    
    //add select option to new li
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //increase task counter fo next unique id
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //create edit button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //create change status dropdown
    var statusSelectEl = document.createElement("select")
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    // create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }




    return actionContainerEl;
}


var taskButtonHandler = function (event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")){
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button was clicked
    else if (targetEl.matches(".delete-btn")){
        console.log("edit", targetEl);
        // get element's task id 
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value= taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
