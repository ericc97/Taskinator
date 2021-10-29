var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// create array to hold tasks for saving
var tasks = [];


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


    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name= 'task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");
    
    //has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else{
    //package data as an object
        var taskDataObject = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        // send it as an argument to createTaskEl
        createTaskEl(taskDataObject);
    }

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

    switch (taskDataObject.status) {
        case "to do":
            taskActionsEl.querySelector("select[name='status-change']"). 
            selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "in progress":
            taskActionsEl.querySelector("select[name='status-change']").
            selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        case "completed":
            listItemEl.querySelector("select[name='status-change']").
            selectedIndex = 0;
            tasksToDoEl.append(listItemEl);
            break;
        default:
            console.log("Something went wrong!")
    }
    taskDataObject.id = taskIdCounter;

    tasks.push(taskDataObject);

    saveTasks();

     // add entire list item to list
    // tasksToDoEl.appendChild(listItemEl);

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
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
    // create status options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through the tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");

    formEl.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
}

var taskButtonHandler = function (event) {
    //get target element from event
    var targetEl = event.target;

    //edit button was clicked
    if (targetEl.matches(".edit-btn")){
        console.log("edit", targetEl);        
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

var trackStatusChangeHandler = function (event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedEl.appendChild(taskSelected);
    }

    // update task's in tasks array
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)); {
            tasks[i].status = statusValue;
        }
    }

    saveTasks();
    
};

var editTask = function(taskId) {
    console.log(taskId);    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    // write values of task name and taskType to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value= taskType;
    
    //set data attribute to the form with a value of the task's id so it knows which one is being edited
    formEl.setAttribute("data-task-id", taskId);
    //update form's button to reflect editing of the task
    document.querySelector("#save-task").textContent = "Save Task";
}
var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    //create a new array to hold updates list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++){
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function () {
    var savedTasks = localStorage.getItem("tasks");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!savedTasks){
        return false;
    }
    console.log("saved tasks found!");
    // else load up saved tasks
    
    //parse into array of object
    savedTasks = JSON.parse(savedTasks);

    // loop through savedTasks array
    for (var i = 0; i < savedTasks.length; i++){
        // pass each task object into the 'createTaskEl()' function
        createTaskEl(savedTasks[taskIdCounter]);
       
    }
};

// create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

// for changing the status
pageContentEl.addEventListener("change", trackStatusChangeHandler);

loadTasks();

