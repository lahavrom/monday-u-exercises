
import { ItemManager } from "./ItemManager.js";

class Main {
    constructor() {
        // to make each task unique -> so can have multiple tasks with same name
        this.countID = 1;
        // when sort button is clicked it sorts the tasks ascending/descending
        this.asc_AZ = true;
        this.asc_time = false;
        this.itemManager = new ItemManager();
    };

    createTask(value){
        const task_text = document.createElement("p");
        task_text.innerText = value;
        const task_elem = document.createElement("div");
        task_elem.className = "tasks";
        task_elem.onclick = () => alert("Task: \n" + task_text.innerText);
        task_elem.appendChild(task_text);
        task_elem.appendChild(this.taskTime());
        return task_elem;
    };

    createDeleteBtn(task_section){
        const delete_btn = document.createElement("button");
        delete_btn.className = "deleteBtn";
        delete_btn.onclick = () => {
            task_section.classList.add("removed");
            setTimeout(() => {
                task_section.remove();
                this.itemManager.removeTask(task_section.id);
            }, 800);
            return;
        }
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o";
        delete_btn.appendChild(deleteIcon);
        return delete_btn;
    };

    add1Task(task, pokemon) { 
        // add to itemManager
        const result = this.itemManager.addTask(task, this.countID, pokemon);
        if (!result){
            alert("You already entered this task:\n" + task);
            return;
        }
        // create div for task + delete button
        const task_section = document.createElement("div");
        task_section.className = "taskSection";
        task_section.id = String(task) + this.countID;
        this.countID++;
        document.body.querySelector("div.taskList").appendChild(task_section);
        // create the task    
        document.getElementById(task_section.id).appendChild(this.createTask(task));
        // create delete button
        document.getElementById(task_section.id).appendChild(this.createDeleteBtn(task_section));  
    }

    async addTask(task){
        // check if entered empty task
        if (task.value === ''){
            alert("You forgot to type the task!");
            return;
        }
        if (task.value){
            const [taskSplit, pokemon] = await this.itemManager.handleTask(task.value);
            for (let t of taskSplit){
                this.add1Task(t, pokemon);
            }
            // delete input
            task.value = ''; 
        }
    };

    // returns the element that shows the date & time the task created
    taskTime(){
        const today = new Date();
        const p = document.createElement("p");
        let minutes = String(today.getMinutes());
        if (minutes.length === 1){
            minutes = "0" + minutes;
        }
        p.innerHTML = today.getDate() + "/" + 
                    (today.getMonth()+1) + "/" + 
                    today.getFullYear() + "<br/>" + 
                    today.getHours() + ":" + 
                    minutes;
        p.className = "time";
        p.id = today;
        p.style.fontSize = '10px';
        return p;
    };

    // clear all tasks
    clearAll(){
        const taskSection = document.body.querySelectorAll("div.taskSection");
        taskSection.forEach(elem => {
            elem.classList.add("removed");
            setTimeout(()=> {
                elem.remove();
                this.itemManager.removeTask(elem.id);
            }, 800);
        });
    };

    // sort tasks by date they created
    sortTime(){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        let ts_array = [].map.call(taskSections, function(elem){return elem;});
        ts_array.sort((a,b) => {
            a = a.querySelector("div.tasks").querySelector("p.time").id;
            b = b.querySelector("div.tasks").querySelector("p.time").id;
            if (this.asc_time){
                return new Date(a) - new Date(b);
            }
            return new Date(b) - new Date(a);
        });
        this.asc_time = !this.asc_time;
        for (let i=0; i < ts_array.length; i++){
            taskSections[i].parentNode.appendChild(ts_array[i]);
        }
    };

    // sort tasks by name
    sortAZ(){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        let ts_array = [].map.call(taskSections, function(elem){return elem;});
        ts_array.sort((a,b) => {
            a = a.querySelector("div.tasks").querySelector("p").innerText;
            b = b.querySelector("div.tasks").querySelector("p").innerText;
            if (this.asc_AZ){
                return a.localeCompare(b);
            }
            return b.localeCompare(a);
        });
        this.asc_AZ = !this.asc_AZ;
        for (let i=0; i < ts_array.length; i++){
            taskSections[i].parentNode.appendChild(ts_array[i]);
        }
    };

    // adding the event listeners for buttons functions
    init(){
        const addBtn = document.getElementById("addBtn");
        addBtn.addEventListener("click", () => {
            this.addTask(document.getElementById("newTask"));
        });
        const input = document.getElementById("newTask");
        // can add tasks using the Enter key
        input.addEventListener("keypress", (event) => {
            if (event.key === "Enter"){
                this.addTask(input);
            }
        });
        const clearAllBtn = document.getElementById("clearAll");
        clearAllBtn.addEventListener("click", () => {
            this.clearAll();
        });
        const dateSort = document.getElementById("sortDate");
        dateSort.addEventListener("click", () => {
            this.sortTime();
        });
        const nameSort = document.getElementById("sortName");
        nameSort.addEventListener("click", () => {
            this.sortAZ();
        });
    };

}


const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});


