const express = require('express');

/*EXPORTANDO OS ARQUIVOS DA PASTA TASKSCONTROLLER */
const tasksController = require('./controllers/tasksController');

/*EXPORTANDO OS ARQUIVOS DA PASTA TASKSMIDDLEWARE */
const tasksMiddleware = require('./middleware/tasksMiddleware');

const router = express.Router();

/*BUSCAR UM/MAIS DADOS */
router.get('/tasks', tasksController.getAll);

/*INSERIR UM DADO */
router.post('/tasks', tasksMiddleware.validateTitle, tasksController.createTask);

/*DELETA UM DADO*/
router.delete('/tasks/:id', tasksController.deleteTasks);

/*atualizar um dado*/
router.put('/tasks/:id', tasksMiddleware.validateTitle, tasksMiddleware.validateStatus, tasksController.updateTasks);

module.exports = router