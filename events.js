let addButton = document.querySelector(".add-button");
let tasksSpace = document.querySelector(".Tasks-space");
let taskText = document.querySelector("section form input");
let remove = document.querySelector(".remove");
let clearAll = document.querySelector(".clear");
let tasksItems = [];
let tasksInputs = [];
let data = window.localStorage.getItem("tasks");
let storedTasks = JSON.parse(data);

if(localStorage.getItem("tasks")) {
    tasksItems = JSON.parse(localStorage.getItem("tasks"));
};
getStoredTasks();

function addTask (storedTasks, i) {
    let taskInput = document.createElement("div");
    let taskP = document.createElement("p");
    let checkIcon = document.createElement("i");
    let impIcon = document.createElement("i");
    let circleIcon = document.createElement("i");
    let solidStar = document.createElement("i");

    let taskSpace = document.querySelector(".Tasks-space");
    let textValue = taskText.value;
    let text = document.createTextNode(textValue);
    taskP.appendChild(text);
    taskSpace.appendChild(taskInput);
    taskInput.appendChild(taskP);
    taskInput.appendChild(checkIcon);
    taskInput.appendChild(impIcon);
    taskInput.appendChild(circleIcon);
    taskInput.appendChild(solidStar);

    taskInput.classList.add("task-input");
    checkIcon.classList.add("fa-sharp");
    checkIcon.classList.add("fa-solid");
    checkIcon.classList.add("fa-check");
    solidStar.classList.add("fa-solid");
    solidStar.classList.add("fa-star");
    impIcon.classList.add("fa-regular");
    impIcon.classList.add("fa-star");
    circleIcon.classList.add("fa-regular");
    circleIcon.classList.add("fa-circle");

    let line = document.createElement("s");
    console.l
    if(storedTasks[i].completed === true || checkIcon.parentElement.classList.contains("done")){
        checkIcon.style.color = "#fff";
        circleIcon.style.backgroundColor = "#888";;
        taskP.appendChild(line);
        line.appendChild(text);
        checkIcon.parentElement.classList.add("done");
    };
    if(storedTasks[i].impState === true || checkIcon.parentElement.classList.contains("important")){
        impIcon.style.color = "transparent";
        solidStar.style.color = "#888";
        solidStar.parentElement.classList.add("important");
    };
    addId(storedTasks[i].id);
    fCheckIcon(checkIcon, circleIcon, taskP, text, taskInput);
    fImpIcon(impIcon, solidStar);
    let clearAllTasks =  document.querySelectorAll("section .Tasks-space .task-input");
    fClear(clearAllTasks);
};
function addTaskInput(taskInput) {
    tasksInputs.push(taskInput);
}
function arrayItems (taskValue) {
    const item = {
        id: Date.now(),
        title: taskValue,
        completed: false,
        impState: false
    }
    tasksItems.push(item);
    storeItems(tasksItems);
};
function storeItems(tasksItems) {
    window.localStorage.setItem("tasks", JSON.stringify(tasksItems));
}
function addId(idValue) {
    let taskInput = document.querySelector(".Tasks-space");
    let targeted = taskInput.lastChild;
    targeted.setAttribute("id", idValue);
}
function getStoredTasks() {
    if(data){
        for(let i = 0; i < storedTasks.length; i++) {
            let stitle = storedTasks[i].title;
            let ntitle = document.createTextNode(stitle);
            taskText.value = stitle;
            addTask(storedTasks, i);
            let idValue = storedTasks[i].id;
            addId(idValue);
            taskText.value = "";
        }
    };
};
addButton.onclick = function(){
    if(document.querySelector("section form input").value !== ""){
        let textValue = taskText.value;
        arrayItems(textValue);
        console.log(tasksItems);
        let i = tasksItems.length - 1;
        addTask(tasksItems, i);
        taskText.value = "";
    };
};
function fCheckIcon(checkIcon, circleIcon, taskP, text){
    checkIcon.addEventListener("click", function (e) {
        let line = document.createElement("s")
        if(!e.target.parentElement.classList.contains("done")) {
            checkIcon.style.color = "#fff";
            circleIcon.style.backgroundColor = "#888";;
            taskP.appendChild(line);
            line.appendChild(text);
            let audio = new Audio(
                "media/mixkit-positive-notification-951.mp3"
            );
            audio.play();
            e.target.parentElement.classList.add("done");
        }else{
            e.target.parentElement.classList.remove("done");
            checkIcon.style.color = "transparent";
            circleIcon.style.backgroundColor = "transparent";
            taskP.appendChild(text);
            line.style.display = "none";
        }
        let id = e.target.parentElement.getAttribute("id")
        togleState(id);
    });
};
function fImpIcon(impIcon, solidStar) {
    solidStar.addEventListener("click", function (e) {
        if(!e.target.parentElement.classList.contains("important")){
            impIcon.style.color = "transparent";
            solidStar.style.color = "#888";
            e.target.parentElement.classList.add("important");
        }else{
            impIcon.style.color = "#888";
            solidStar.style.color = "transparent";
            e.target.parentElement.classList.remove("important");
        }
        let id = e.target.parentElement.getAttribute("id");
        imPtogleState(id);
    });
};
let deletBar = document.querySelector(".fa-ellipsis");
deletBar.onclick = function() {
    let choices = document.querySelector(".choices");
    if(choices.classList.contains("none")){
        choices.style.display = "block";
        choices.classList.remove("none");
    }else{
        choices.style.display = "none"
        choices.classList.add("none");
    };
};
function fClear(clearAllTasks) {
    clearAll.addEventListener("click", function(){
        for(let i = 0; i < clearAllTasks.length; i++){
            clearAllTasks[i].style.display = "none";
        };
        document.querySelector(".Tasks-space").innerHTML.remove
        tasksItems = [];
        window.localStorage.clear();
    });
};
function togleState(id) {
    for(let i = 0; i < tasksItems.length; i++){
        if(tasksItems[i].id == id){
            tasksItems[i].completed == false ? (tasksItems[i].completed = true) : (tasksItems[i].completed = false);
        };
    };
    storeItems(tasksItems);
};
function imPtogleState(id) {
    for(let i = 0; i < tasksItems.length; i++){
        if(tasksItems[i].id == id){
            tasksItems[i].impState == false ? (tasksItems[i].impState = true) : (tasksItems[i].impState = false);
        }
    };
    storeItems(tasksItems);
};