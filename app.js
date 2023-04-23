//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".todo__input_type_text");//Add a new task.
console.log(taskInput)
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".todo__list_incomplete");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".todo__list_complete");//completed-tasks
console.log('1', incompleteTaskHolder.children.length)

//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image
    listItem.classList = 'todo__list-item';

    label.innerText=taskString;
    label.className='todo__label todo__label_title';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="todo__input_type_checkbox";
    editInput.type="text";
    editInput.className="todo__input todo__input_type_text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="todo__button todo__button_type_edit";

    deleteButton.className="todo__button todo__button_type_delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className ="todo__delete-img";
    deleteButtonImg.alt = "delete-button"
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #todo-new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    console.log('1', listItem)
    //Append listItem to incompleteTaskHolder
    console.log('2', incompleteTaskHolder)
    incompleteTaskHolder.append(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;
    var editInput=listItem.querySelector('.todo__input_type_text');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".todo__button_type_edit");
    var containsClass=listItem.classList.contains("todo__list-item_active");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("todo__list-item_active");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.append(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".todo__input_type_checkbox");
    var editButton=taskListItem.querySelector("button.todo__button_type_edit");
    var deleteButton=taskListItem.querySelector("button.todo__button_type_delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    // editButton.addEventListener('click', editTask)
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
console.log(incompleteTaskHolder.children.length)
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.