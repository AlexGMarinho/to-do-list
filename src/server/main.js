const express = require('express');
const path = require('path');

const checkListRouter = require('../routes/checklist.js');
const taskRouter = require('../routes/task');
const rootRouter = require('../routes');
const methodOverride = require('method-override');

require('../../config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(path.join(__dirname, '../../public')));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDepedent);
app.use('/tasks', taskRouter.simple);

app.listen(3000, () => {
    console.log(`Servidor esta ouvindo na porta 8080`);
});
