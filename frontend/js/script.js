const tbody = document.querySelector('tbody');

/*Capturando formulario*/
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');


/*Função que vai busca nossas tasks */
const fetchTasks = async () =>{
    const reponse = await fetch('http://localhost:4004/tasks');
    const tasks = await reponse.json()
    return tasks;
}

/*FUNÇÃO PARA ADICIONAR UMA TAREFA */
const addTask = async (event) =>{
    event. preventDefault();
    const task = { title: inputTask.value };

    await fetch('http://localhost:4004/tasks', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task),
    });
    loadTasks();
    inputTask.value = ''
}

addForm.addEventListener('submit', addTask);

const deleteTask = async (id) =>{
   await fetch(`http://localhost:4004/tasks/${id}`, {method: 'delete'});
   alert('TAREFA DELETADA');

   loadTasks();
}

const updateTask = async ({ id,title, created_at, status}) =>{
    await fetch(`http://localhost:4004/tasks/${id}`, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, status})
    });

    loadTasks();
}


const formatDate = (dataUTC) =>{
    const opitions = { dataStyle: 'long', timeStyle: 'short' }
    const date = new Date(dataUTC).toLocaleString('pt-br', '', opitions);

    return date;
}

const createElement = (tag, innerText = '', innerHTML = '') =>{
    const element = document.createElement(tag);
    
    if(innerText){
        element.innerText = innerText
    }

    if(innerHTML){
        element.innerHTML = innerHTML
    }

    return element; 
}


const createSelect = (value) =>{
    const opitions = `
    <option value="pendente">pendente</option>
    <option value="em andamento">em andamento</option>
    <option value="concluida">concluida</option>`;

    const select = createElement('select', '', opitions);

    select.value = value;

    return select;
}




const createRow = (task) =>{
    const { id,title, created_at, status} = task;

    const tr = createElement('tr')
    const tdTitle = createElement('td',title)
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');
    const select = createSelect(status)

    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value }))

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit_note</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete_sweep</span>');
    
    tdStatus.appendChild(select);


    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title

    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        updateTask({id, title:editInput.value, status});
        alert('Tarefa modificada!');
        
        event.preventDefault();
    })

    editButton.addEventListener('click', () => {
        tdTitle.innerHTML = '';
        tdTitle.appendChild(editForm);
    })
     
    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => deleteTask(id));

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    return tr;
}


const loadTasks = async () =>{
    const tasks = await fetchTasks();

    tbody.innerHTML = ''

    tasks.forEach((task) =>{
        const tr = createRow(task);
        
        tbody.appendChild(tr);
    })
};



loadTasks();




