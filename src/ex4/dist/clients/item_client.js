// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

// const axios = require('axios').default;

class ItemClient {
    constructor() {
        this.API_BASE = 'http://localhost:8080/task';
    }

    async getTasks(){
        const tasks = await axios.get(this.API_BASE);
        return tasks;
    }

    async addTask(task, date){
        await axios({
            method: 'post',
            url: this.API_BASE,
            data: {
                "task": task,
                "date": date
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async deleteTask(task, date) {
        await axios({
            method: 'delete',
            url: this.API_BASE,
            data: {
                "task": task,
                "date": date
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}