class ItemClient {
    constructor() {
        this.API_BASE = 'http://localhost:8080/task';
    }

    async getTasks(){
        try{
            const tasks = await axios.get(this.API_BASE);
            return tasks;
        } catch(error) {
            alert("Something went wrong, please try again later");
        }
    }

    async addTask(task, date){
        const data = {
            "task": task,
            "date": date
        };
        const headers = { 'Content-Type': 'application/json' };
        try{
            await axios.post(this.API_BASE, data, { headers });
        } catch(error){
            throw new Error(error.response.data);
        }
    }

    async deleteTask(taskId) {
        try{
            await axios.delete(this.API_BASE, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "taskId": taskId
                }
            });
        } catch(error){
            alert("Something went wrong, please try again later");
        }
    }

    async changeTaskStatus(taskId, status) {
        try {
            await axios.post(`${this.API_BASE}/status`, 
                {
                    "taskId": taskId,
                    "status": status
                }, 
                { 
                    headers: {
                        'Content-Type': 'application/json'
                    } 
                }
            );
        } catch(error) {
            throw new Error();
        }
    }

}