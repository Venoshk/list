const connection = require('./connection');

//esse função vai retorna todas as tasks que estão os dados do banco de dados
const getAll = async () =>{
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

//essa função vai insirir novos dadoo dentro da banco de dados
const createTask = async (tasks) =>{
    const { title } = tasks;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at) value (?, ?, ?)';

    const [createTask] = await connection.execute(query,[title,'pendente',dateUTC ]);

    return {insertId: createTask.insertId};
};

//essa função vai deletar os dados dentro da banco de dados
const deleteTasks = async (id) =>{
    const query = 'DELETE FROM tasks WHERE id = ?'
    const [remoteTasks] = await connection.execute(query,[id]);
    return remoteTasks;
};

//essa função vai atualizar os dados dentro da banco de dados 
const updateTasks = async (id, task) =>{
    const {title, status} = task

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ? '

    const [updateTasks] = await connection.execute(query,[title, status, id]);
    return updateTasks;
}

//esxportando todas as funções para usar no arquivo ==router==
module.exports = {
    getAll,
    createTask,
    deleteTasks,
    updateTasks,
};