let newTaskInput = document.getElementById("new-task-input");
let addTaskBtn = document.getElementById("addTask-btn");
appendList();

if(taskObj.length > 0) {
    console.log("Working on Click")
    let newTask = document.getElementById("new-task");
    newTask.classList.add("gvspace")
}

// Add Item On Click Add Button
addTaskBtn.addEventListener("click", function(){
    let newTaskInputVal = newTaskInput.value;
    if(newTaskInputVal.trim()!=0) {
        let taskMemory = localStorage.getItem("localTask");
        if(taskMemory == null){
            taskObj = [];
            // console.log("Clear");
        }else {
            taskObj = JSON.parse(taskMemory);
            // console.log("done");
        }
        taskObj.push(newTaskInputVal);
        localStorage.setItem("localTask", JSON.stringify(taskObj));
    }
    newTaskInput.value = "";
    appendList();
    if(taskObj.length > 0) {
        console.log("Working on Click")
        let newTask = document.getElementById("new-task");
        newTask.classList.add("gvspace")
    }
});

// Add Item On Press Enter
newTaskInput.addEventListener("keypress", function(e){
        if (e.keyCode === 13) {
            // console.log("ddd");
            let newTaskInputVal = newTaskInput.value;
            // console.log(newTaskInputVal)
            // if(newTaskInputVal.trim()!=0) {
            if(document.getElementById("savebtn").style.display !== "block" && newTaskInputVal.trim()!=0) {
                let taskMemory = localStorage.getItem("localTask");
                if(taskMemory == null){
                    taskObj = [];
                    // console.log("Clear");
                }else {
                    taskObj = JSON.parse(taskMemory);
                    // console.log("done");
                }
                taskObj.push(newTaskInputVal);
                localStorage.setItem("localTask", JSON.stringify(taskObj));
            }
            
            if(document.getElementById("savebtn").style.display === "block") {
                // console.log('adfasdfasdfsa')
                saveEventHandler();   
            }
            newTaskInput.value = "";
            appendList();
            if(document.getElementById("savebtn").style.display !== "block" && taskObj.length > 0) {
                console.log("Working on KeyPress")
                let newTask = document.getElementById("new-task");
                newTask.classList.add("gvspace")
            }

        }
});

// Create New Item List
function appendList() {
    let taskMemory = localStorage.getItem("localTask");
    if(taskMemory == null){
        taskObj = [];
        // console.log("Clear");
    }else {
        taskObj = JSON.parse(taskMemory);
        // console.log("done");
    }
    let html = "";
    let toDoLists = document.getElementById("toDoLists");
    taskObj.forEach((item, index) => {
        // console.log("check Index " + index)
        html += `<li class="toDoList-item flex-items">
        <div class="item-contains-lhs item-container flex-items">
            <p class="item-index">${index+1}.</p>
            <p class="item-title">${item}</p>
        </div>
        <div class="item-contains-rhs item-container flex-items">
            <div onclick="editItem(${index})" class="list-icon edit-item flex-items">
                <svg xmlns="http://www.w3.org/2000/svg" width="26.88" height="26.88" viewBox="0 0 26.88 26.88">
                    <path class="icon edit-icon" id="edit-icon icon" d="M13.44,0A13.44,13.44,0,1,1,0,13.44,13.441,13.441,0,0,1,13.44,0ZM11.5,18.375c-.4.133-.805.256-1.2.387s-.8.265-1.2.4c-.949.306-1.468.479-1.582.51s-.042-.407.195-1.326l.755-2.885,5.69-5.915,3.03,2.916L11.5,18.375ZM17.168,7.4a.656.656,0,0,0-.49-.195.635.635,0,0,0-.479.214L15.118,8.544l3.03,2.927,1.092-1.142a.667.667,0,0,0,.184-.49.651.651,0,0,0-.2-.479L17.168,7.4Z" fill-rule="evenodd"/>
                </svg>                              
                <p>Edit</p>
            </div>
            <div onclick="deleteItem(${index})" class="list-icon delete-item flex-items">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                    <g id="delete-icon" transform="translate(-1004 -396)">
                      <path class="icon circle" id="circle icon" d="M13.5,0A13.5,13.5,0,1,1,0,13.5,13.5,13.5,0,0,1,13.5,0Z" transform="translate(1004 396)"/>
                      <g id="Lines">
                        <path id="Path_2" data-name="Path 2" d="M973.477,404.781l8.375,8.374" transform="translate(40.012 1.012)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <path id="Path_3" data-name="Path 3" d="M973.477,404.781l8.375,8.374" transform="translate(1426.644 -567.685) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                      </g>
                    </g>
                </svg>                              
                <p>Delete</p>
            </div>
        </div>
    </li>`
    });
    toDoLists.innerHTML = html;
    // console.log(index);
}

// Edit Item Name
function editItem(index) {
    // console.log(index)
    let saveindex = document.getElementById("saveindex");
    saveindex.value = index
    let saveBtn = document.getElementById("savebtn");
    let addTaskBtn = document.getElementById("addTask-btn");
    let taskMemory = localStorage.getItem("localTask");
    let taskObj = JSON.parse(taskMemory);
    // console.log(taskObj)
    newTaskInput.value = taskObj[index];
    saveBtn.style.display="block";
    addTaskBtn.style.display="none";
}

// save Edited Task
let saveBtn = document.getElementById("savebtn");
saveBtn.addEventListener("click", function(){
    saveEventHandler();
});


function saveEventHandler() {
    let taskMemory = localStorage.getItem("localTask");
    let taskObj = JSON.parse(taskMemory);
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex] = newTaskInput.value;
    // console.log(newTaskInput.value)
    saveBtn.style.display="none";
    addTaskBtn.style.display="block";
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    newTaskInput.value = "";
    appendList();
}


// Reset List
function deleteStoredItems() {
    localStorage.clear();
    window.location.reload();
}

// Delete Items
function deleteItem(index){
    console.log(index);
    let taskMemory = localStorage.getItem("localTask");
    taskObj = JSON.parse(taskMemory);
    taskObj.splice(index, 1);
    localStorage.setItem("localTask", JSON.stringify(taskObj));
    appendList();
    if(taskObj.length <= 0) {
        console.log("Working on Delete")
        let newTask = document.getElementById("new-task");
        newTask.classList.remove("gvspace")
    }
}