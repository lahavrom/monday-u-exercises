class Main {
    constructor() {
        // when sort button is clicked it sorts the tasks ascending/descending
        this.ascAZ = true;
        this.ascTime = false;
        this.itemClient = new ItemClient();
    };

    createTask(value, date, taskId, status){
        const taskText = document.createElement("p");
        taskText.innerText = value;
        const taskElem = document.createElement("div");
        taskElem.className = "tasks";
        taskElem.appendChild(this.createCheckBox(taskId, status));
        taskElem.appendChild(taskText);
        taskElem.appendChild(this.taskTime(date));
        return taskElem;
    };

    createDeleteBtn(taskSection){
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.onclick = () => {
            taskSection.classList.add("removed");
            setTimeout(() => {
                taskSection.remove();
                this.itemClient.deleteTask(taskSection.id);
            }, 800);
            return;
        }
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o";
        deleteBtn.appendChild(deleteIcon);
        return deleteBtn;
    };

    /**
     * clear tasks, then creates the task div and delete button elements
     */
    async renderTasks(){
        document.body.querySelector("div.taskList").innerHTML = '';        
        const tasks = await this.itemClient.getTasks();
        tasks.data.forEach(item => {
            const taskSection = document.createElement("div");
            taskSection.className = "taskSection";
            taskSection.id = item.taskId;
            document.body.querySelector("div.taskList").appendChild(taskSection);
            taskSection.appendChild(this.createTask(item.task, item.date, item.taskId, item.status));
            taskSection.appendChild(this.createDeleteBtn(taskSection));
        });
    };

    async addTask(task) {
        if (task.value === ''){
            task.setCustomValidity("You forgot to type the task!");
            task.reportValidity();
            return;
        }
        const loader = document.getElementsByClassName("loader")[0];
        loader.style.display = 'block';
        if (task.value) {
            try{
                await this.itemClient.addTask(task.value, new Date());
            } catch(error) {
                loader.style.display = 'none';
                task.setCustomValidity(error.message);
                task.reportValidity();
                return;
            }
        }
        loader.style.display = 'none';
        await this.renderTasks();
        task.value = '';
    }

    createCheckBox(taskId, status){
        const checkBox = document.createElement("input");
        checkBox.className = "checkBox";
        checkBox.type = "checkBox";
        checkBox.onclick = async () => {
            try {
                await this.itemClient.changeTaskStatus(taskId);
            } catch(error) {
                checkBox.setCustomValidity("Something went wrong, try again later");
                checkBox.reportValidity();
            }
        }
        status ? checkBox.checked = true : checkBox.checked = false;
        return checkBox;
    }

    // returns the element that shows the date & time the task created
    taskTime(dateString){
        let date = new Date(dateString);
        const p = document.createElement("p");
        let minutes = String(date.getMinutes());
        if (minutes.length === 1){
            minutes = "0" + minutes;
        }
        p.innerHTML = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` + "<br/>" + `${date.getHours()}:${minutes}`;
        p.className = "time";
        p.id = dateString;
        return p;
    };

    // clear all tasks
    clearAll(){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        taskSections.forEach(elem => {
            elem.classList.add("removed");
            setTimeout(async () => {
                elem.remove();
                await this.itemClient.deleteTask(elem.id);
            }, 800);
        });
    };

    // sort tasks by date they created
    sortTime (){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        let tmpTaskSections = [...taskSections];
        tmpTaskSections.sort((a,b) => {
            a = a.querySelector("div.tasks").querySelector("p.time").id;
            b = b.querySelector("div.tasks").querySelector("p.time").id;
            if (this.ascTime){
                return new Date(a) - new Date(b);
            }
            return new Date(b) - new Date(a);
        });
        this.ascTime = !this.ascTime;
        for (let i=0; i < tmpTaskSections.length; i++){
            taskSections[i].parentNode.appendChild(tmpTaskSections[i]);
        }
    };

    // sort tasks by name
    sortAZ(){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        let tmpTaskSections = [...taskSections];
        tmpTaskSections.sort((a,b) => {
            a = a.querySelector("div.tasks").querySelector("p").innerText;
            b = b.querySelector("div.tasks").querySelector("p").innerText;
            if (this.ascAZ){
                return a.localeCompare(b);
            }
            return b.localeCompare(a);
        });
        this.ascAZ = !this.ascAZ;
        for (let i=0; i < tmpTaskSections.length; i++){
            taskSections[i].parentNode.appendChild(tmpTaskSections[i]);
        }
    };
    
    // adding the event listeners for buttons functions
    async init(){
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
        clearAllBtn.addEventListener("click", () => this.clearAll());
        const dateSort = document.getElementById("sortDate");
        dateSort.addEventListener("click", () => this.sortTime());
        const nameSort = document.getElementById("sortName");
        nameSort.addEventListener("click", () => this.sortAZ());

        await this.renderTasks();
    };

}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});
