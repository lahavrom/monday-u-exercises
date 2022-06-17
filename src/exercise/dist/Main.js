
class Main {
    constructor() {
        // when sort button is clicked it sorts the tasks ascending/descending
        this.asc_AZ = true;
        this.asc_time = false;
        this.itemClient = new ItemClient();
    };


    createTask(value, date){
        const task_text = document.createElement("p");
        task_text.innerText = value;
        const task_elem = document.createElement("div");
        task_elem.className = "tasks";
        task_elem.onclick = () => alert("Task: \n" + task_text.innerText);
        task_elem.appendChild(task_text);
        task_elem.appendChild(this.taskTime(date));
        return task_elem;
    };

    createDeleteBtn(task_section){
        const delete_btn = document.createElement("button");
        delete_btn.className = "deleteBtn";
        delete_btn.onclick = () => {
            task_section.classList.add("removed");
            setTimeout(() => {
                task_section.remove();
                const task_date = task_section.querySelectorAll('p');
                this.itemClient.deleteTask(task_date[0].innerText, task_date[1].id);
            }, 800);
            return;
        }
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash-o";
        delete_btn.appendChild(deleteIcon);
        return delete_btn;
    };


    async renderTasks(){
        // clear all tasks
        document.body.querySelector("div.taskList").innerHTML = '';        
        // render tasks
        const tasks = await this.itemClient.getTasks();
        tasks.data.forEach(item => {
            // create div for task + delete button
            const task_section = document.createElement("div");
            task_section.className = "taskSection";
            document.body.querySelector("div.taskList").appendChild(task_section);
            // create the task    
            task_section.appendChild(this.createTask(item.task, item.date));
            // create delete button
            task_section.appendChild(this.createDeleteBtn(task_section));
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

    // returns the element that shows the date & time the task created
    taskTime(dateString){
        let date = new Date(dateString);
        const p = document.createElement("p");
        let minutes = String(date.getMinutes());
        if (minutes.length === 1){
            minutes = "0" + minutes;
        }
        p.innerHTML = date.getDate() + "/" + 
                      (date.getMonth()+1) + "/" + 
                      date.getFullYear() + "<br/>" + 
                      date.getHours() + ":" + 
                      minutes;
        p.className = "time";
        p.id = dateString;
        p.style.fontSize = '10px';
        return p;
    };


    // clear all tasks
    clearAll(){
        const taskSection = document.body.querySelectorAll("div.taskSection");
        taskSection.forEach(elem => {
            elem.classList.add("removed");
            setTimeout(async () => {
                elem.remove();
                const task_date = elem.querySelectorAll('p');
                await this.itemClient.deleteTask(task_date[0].innerText, task_date[1].id);
            }, 800);
        });
    };


    // sort tasks by date they created
    sortTime (){
        const taskSections = document.body.querySelectorAll("div.taskSection");
        let ts_array = [].map.call(taskSections, (elem) => {return elem;});
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
        let ts_array = [].map.call(taskSections, (elem) => {return elem;});
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